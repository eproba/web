import { PatrolCard } from "@/components/team/management/patrol-card";
import { UserCreateDialog } from "@/components/team/management/user-create-dialog";
import { Button } from "@/components/ui/button";
import { ApiError } from "@/lib/api";
import { useApi } from "@/lib/api-client";
import { patrolSerializer } from "@/lib/serializers/team";
import { ApiUserResponse, userSerializer } from "@/lib/serializers/user";
import { ToastMsg } from "@/lib/toast-msg";
import { setCurrentUserAtom, useCurrentUser } from "@/state/user";
import { Organization, Patrol, Team } from "@/types/team";
import { User } from "@/types/user";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useSetAtom } from "jotai";
import { LoaderCircleIcon } from "lucide-react";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

import { InactiveUsersCard } from "./inactive-users-card";
import { PatrolCreateDialog } from "./patrol-create-dialog";

interface PatrolsListProps {
  team: Team;
  users: User[];
  allowEditForLowerFunction: boolean;
  setAllowEditForLowerFunction: React.Dispatch<React.SetStateAction<boolean>>;
}

export function PatrolsList({
  team,
  users: initialUsers,
  allowEditForLowerFunction,
  setAllowEditForLowerFunction,
}: PatrolsListProps) {
  const currentUser = useCurrentUser();
  const setCurrentUser = useSetAtom(setCurrentUserAtom);
  const [patrols, setPatrols] = useState<Patrol[]>(
    team.patrols?.sort((a, b) => a.name.localeCompare(b.name)) ?? [],
  );
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [updatingUserIds, setUpdatingUserIds] = useState<string[]>([]);
  const { apiClient } = useApi();

  const handleUserUpdate = useCallback(
    async (userId: string, updatedUser: Partial<ApiUserResponse>) => {
      setUpdatingUserIds((prev) => [...prev, userId]);
      try {
        const response = await apiClient(`/users/${userId}/`, {
          method: "PATCH",
          body: JSON.stringify(updatedUser),
        });
        const updated = userSerializer(await response.json());
        setUsers((prevUsers) =>
          prevUsers
            .map((user) =>
              user.id === userId ? { ...user, ...updated } : user,
            )
            .filter((user) => user.team === team.id),
        );
        if (updated.id === currentUser?.id) {
          setCurrentUser(updated);
        }
        if (updated.function.numberValue >= 4) {
          setAllowEditForLowerFunction(false);
        } else {
          setAllowEditForLowerFunction(
            users.filter(
              (user) =>
                user.function.numberValue >= 4 &&
                user.isActive &&
                user.id !== updated.id,
            ).length === 0,
          );
        }
        return true;
      } catch (error) {
        toast.error(
          ToastMsg({
            data: {
              title: "Nie udało się zaktualizować użytkownika",
              description: error as Error,
            },
          }),
        );
        console.error("Error updating user:", error);
        return false;
      } finally {
        setUpdatingUserIds((prev) => prev.filter((id) => id !== userId));
      }
    },
    [
      apiClient,
      currentUser?.id,
      setAllowEditForLowerFunction,
      setCurrentUser,
      team.id,
      users,
    ],
  );

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) {
          return;
        }
        const sourceData = source.data;
        const destData = destination.data;

        if (
          sourceData.type === "user" &&
          destData.patrolId &&
          typeof sourceData.userId === "string" &&
          typeof destData.patrolId === "string"
        ) {
          const userToMove = users.find(
            (user) => user.id === sourceData.userId,
          );
          if (userToMove && userToMove.patrol !== destData.patrolId) {
            handleUserUpdate(sourceData.userId, { patrol: destData.patrolId });
          }
        }
      },
    });
  }, [handleUserUpdate, users]);

  const handlePatrolUpdate = async (patrolId: string, name: string) => {
    try {
      const response = await apiClient(`/patrols/${patrolId}/`, {
        method: "PATCH",
        body: JSON.stringify({ name }),
      });
      const updatedPatrol = patrolSerializer(await response.json());
      setPatrols((prevPatrols) =>
        prevPatrols.map((p) => (p.id === patrolId ? updatedPatrol : p)),
      );
      return true;
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się zaktualizować zastępu",
            description: error as Error,
          },
        }),
      );
      console.error("Error updating patrol:", error);
      return false;
    }
  };

  const handleCreatePatrol = async (name: string) => {
    try {
      const response = await apiClient(`/patrols/`, {
        method: "POST",
        body: JSON.stringify({
          name,
          team: team.id,
        }),
      });
      const newPatrol = patrolSerializer(await response.json());
      setPatrols((prevPatrols) => {
        const index = prevPatrols.findIndex(
          (p) => newPatrol.name.localeCompare(p.name) < 0,
        );
        if (index === -1) {
          return [...prevPatrols, newPatrol];
        }
        return [
          ...prevPatrols.slice(0, index),
          newPatrol,
          ...prevPatrols.slice(index),
        ];
      });
      return true;
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się dodać zastępu",
            description: error as Error,
          },
        }),
      );
      console.error("Error creating patrol:", error);
      return false;
    }
  };

  const handleDeletePatrol = async (patrolId: string) => {
    try {
      await apiClient(`/patrols/${patrolId}/`, {
        method: "DELETE",
      });
      setPatrols((prevPatrols) => prevPatrols.filter((p) => p.id !== patrolId));
      return true;
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się usunąć zastępu",
            description: error as Error,
          },
        }),
      );
      console.error("Error deleting patrol:", error);
      return false;
    }
  };

  const handleCreateUser = async (userData: Partial<ApiUserResponse>) => {
    try {
      const response = await apiClient(`/users/`, {
        method: "POST",
        body: JSON.stringify({
          ...userData,
        }),
      });
      const data = await response.json();
      const newUser = {
        ...userSerializer(data),
        newPassword: data.new_password ?? "",
      };
      setUsers((prevUsers) => [...prevUsers, newUser]);
      return newUser;
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się dodać użytkownika",
            description: error as Error,
          },
        }),
      );
      console.error("Error creating user:", error);
      if (error instanceof ApiError) {
        return error;
      }
      return error as Error;
    }
  };

  const inactiveUsers = users.filter((user) => !user.isActive);
  const activeUsers = users.filter((user) => user.isActive);

  return (
    <div>
      <div className="mb-4 flex items-center justify-between px-2 sm:px-0">
        <h2 className="flex items-center gap-2 text-2xl font-semibold">
          Zastępy
          {updatingUserIds.length > 0 && (
            <LoaderCircleIcon className="mr-2 size-4 animate-spin" />
          )}
        </h2>
        <div className="flex items-center gap-2">
          <UserCreateDialog onUserCreate={handleCreateUser} patrols={patrols}>
            <Button variant="outline">
              <span>
                Załóż konto
                <span className="hidden sm:inline">
                  {" dla "}
                  {currentUser?.organization === Organization.Female
                    ? "harcerki"
                    : "harcerza"}
                </span>
              </span>
            </Button>
          </UserCreateDialog>
          <PatrolCreateDialog onCreate={handleCreatePatrol}>
            <Button>Dodaj zastęp</Button>
          </PatrolCreateDialog>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {patrols.map((patrol) => (
          <PatrolCard
            key={patrol.id}
            patrol={patrol}
            users={activeUsers.filter((user) => user.patrol === patrol.id)}
            allPatrols={patrols}
            onPatrolUpdate={handlePatrolUpdate}
            onUserUpdate={handleUserUpdate}
            onPatrolDelete={handleDeletePatrol}
            updatingUserIds={updatingUserIds}
            allowEditForLowerFunction={allowEditForLowerFunction}
          />
        ))}
        {inactiveUsers.length > 0 && (
          <InactiveUsersCard
            users={inactiveUsers}
            allPatrols={patrols}
            onUserUpdate={handleUserUpdate}
            updatingUserIds={updatingUserIds}
            allowEditForLowerFunction={allowEditForLowerFunction}
          />
        )}
      </div>
    </div>
  );
}

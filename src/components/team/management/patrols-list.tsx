import { PatrolCard } from "@/components/team/management/patrol-card";
import { Button } from "@/components/ui/button";
import { Patrol, Team } from "@/types/team";
import { User } from "@/types/user";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import React, { useCallback, useEffect, useState } from "react";
import { PatrolCreateDialog } from "./patrol-create-dialog";
import { patrolSerializer } from "@/lib/serializers/team";
import { toast } from "react-toastify";
import { ToastMsg } from "@/lib/toast-msg";
import { useApi } from "@/lib/api-client";
import { ApiUserResponse, userSerializer } from "@/lib/serializers/user";
import { LoaderCircleIcon } from "lucide-react";
import { InactiveUsersCard } from "./inactive-users-card";

interface PatrolsListProps {
  team: Team;
  users: User[];
  currentUser: User;
  allowEditForLowerFunction: boolean;
  setAllowEditForLowerFunction: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
}

export function PatrolsList({
  team,
  users: initialUsers,
  currentUser,
  allowEditForLowerFunction,
  setAllowEditForLowerFunction,
  setCurrentUser,
}: PatrolsListProps) {
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
        if (updated.id === currentUser.id) {
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
      currentUser.id,
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

  const inactiveUsers = users.filter((user) => !user.isActive);
  const activeUsers = users.filter((user) => user.isActive);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 px-2 sm:px-0">
        <h2 className="text-2xl font-bold flex items-center gap-2">
          Zastępy
          {updatingUserIds.length > 0 && (
            <LoaderCircleIcon className="size-4 mr-2 animate-spin" />
          )}
        </h2>
        <PatrolCreateDialog onCreate={handleCreatePatrol}>
          <Button>Dodaj zastęp</Button>
        </PatrolCreateDialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {patrols.map((patrol) => (
          <PatrolCard
            key={patrol.id}
            patrol={patrol}
            users={activeUsers.filter((user) => user.patrol === patrol.id)}
            allPatrols={patrols}
            onPatrolUpdate={handlePatrolUpdate}
            onUserUpdate={handleUserUpdate}
            onPatrolDelete={handleDeletePatrol}
            currentUser={currentUser}
            updatingUserIds={updatingUserIds}
            allowEditForLowerFunction={allowEditForLowerFunction}
          />
        ))}
        {inactiveUsers.length > 0 && (
          <InactiveUsersCard
            users={inactiveUsers}
            allPatrols={patrols}
            onUserUpdate={handleUserUpdate}
            currentUser={currentUser}
            updatingUserIds={updatingUserIds}
            allowEditForLowerFunction={allowEditForLowerFunction}
          />
        )}
      </div>
    </div>
  );
}

"use client";

import { Team } from "@/types/team";
import { User } from "@/types/user";
import { TeamHeader } from "./team-header";
import { PatrolsList } from "./patrols-list";
import { useState } from "react";
import { useApi } from "@/lib/api-client";
import { teamSerializer } from "@/lib/serializers/team";
import { toast } from "react-toastify";
import { ToastMsg } from "@/lib/toast-msg";

interface TeamManagementClientProps {
  team: Team;
  users: User[];
  currentUser: User;
}

export function TeamManagementClient({
  team: initialTeam,
  users,
  currentUser: initialCurrentUser,
}: TeamManagementClientProps) {
  const [team, setTeam] = useState<Team>(initialTeam);
  const [allowEditForLowerFunction, setAllowEditForLowerFunction] =
    useState<boolean>(
      users.filter((user) => user.function.numberValue >= 4 && user.isActive)
        .length === 0,
    );
  const [currentUser, setCurrentUser] = useState<User>(initialCurrentUser);
  const { apiClient } = useApi();

  const handleTeamUpdate = async (name: string, shortName: string) => {
    try {
      const response = await apiClient(`/teams/${team.id}/`, {
        method: "PATCH",
        body: JSON.stringify({
          name,
          short_name: shortName,
        }),
      });
      setTeam(teamSerializer(await response.json()));
      return true;
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się zaktualizować drużyny",
            description: error as Error,
          },
        }),
      );
      console.error("Error updating team:", error);
      return false;
    }
  };

  return (
    <div className="space-y-6">
      <TeamHeader
        team={team}
        onTeamUpdate={handleTeamUpdate}
        allowEdit={
          currentUser.function.numberValue >= 4 || allowEditForLowerFunction
        }
      />
      <PatrolsList
        team={team}
        users={users}
        currentUser={currentUser}
        allowEditForLowerFunction={allowEditForLowerFunction}
        setAllowEditForLowerFunction={setAllowEditForLowerFunction}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
}

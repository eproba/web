"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/components/ui/toast";
import { useApi } from "@/lib/api-client";
import { RequiredFunctionLevel } from "@/lib/const";
import { teamSerializer } from "@/lib/serializers/team";
import { ToastMsg } from "@/lib/toast-msg";
import { useCurrentUser } from "@/state/user";
import { Team } from "@/types/team";
import { User } from "@/types/user";
import { AlertCircleIcon } from "lucide-react";
import { useState } from "react";

import { PatrolsList } from "./patrols-list";
import { TeamHeader } from "./team-header";

interface TeamManagementClientProps {
  team: Team;
  users: User[];
}

export function TeamManagementClient({
  team: initialTeam,
  users,
}: TeamManagementClientProps) {
  const [team, setTeam] = useState<Team>(initialTeam);
  const [allowEditForLowerFunction, setAllowEditForLowerFunction] =
    useState<boolean>(
      users.filter((user) => user.function.numberValue >= 4 && user.isActive)
        .length === 0,
    );
  const currentUser = useCurrentUser();
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
      toast.add({
        ...ToastMsg({
          data: {
            title: "Nie udało się zaktualizować drużyny",
            description: error as Error,
          },
        }),
        type: "error",
      });
      console.error("Error updating team:", error);
      return false;
    }
  };

  if (
    currentUser &&
    currentUser.function.numberValue < RequiredFunctionLevel.TEAM_MANAGEMENT
  ) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon className="size-4" />
        <AlertTitle>Brak uprawnień</AlertTitle>
        <AlertDescription>
          Nie masz wystarczających uprawnień, aby zarządzać drużyną.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <TeamHeader
        team={team}
        onTeamUpdate={handleTeamUpdate}
        allowEdit={
          (currentUser && currentUser.function.numberValue >= 4) ||
          allowEditForLowerFunction
        }
      />
      <PatrolsList
        team={team}
        users={users}
        allowEditForLowerFunction={allowEditForLowerFunction}
        setAllowEditForLowerFunction={setAllowEditForLowerFunction}
      />
    </div>
  );
}

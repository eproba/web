import {
  fetchCurrentUser,
  fetchUsersByTeamId,
  fetchUserTeam,
} from "@/lib/server-api";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TeamManagementClient } from "@/components/team/management/team-management-client";
import { User } from "@/types/user";
import { RequiredFunctionLevel } from "@/lib/const";
import { AlertCircleIcon } from "lucide-react";

export default async function TeamPage() {
  const { team, error: teamsError } = await fetchUserTeam();
  if (teamsError) {
    return teamsError;
  }

  const { users, error: usersError } = await fetchUsersByTeamId(team!.id);

  if (usersError) {
    return usersError;
  }

  const { user: currentUser, error: currentUserError } =
    await fetchCurrentUser();

  if (currentUserError) {
    return currentUserError;
  }

  if (!team || !users || !currentUser) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Błąd</AlertTitle>
        <AlertDescription>
          Nie udało się załadować danych drużyny.
        </AlertDescription>
      </Alert>
    );
  }

  if (
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
    <TeamManagementClient
      team={team}
      users={users as User[]}
      currentUser={currentUser}
    />
  );
}

import { TeamManagementClient } from "@/components/team/management/team-management-client";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { fetchUserTeam, fetchUsersByTeamId } from "@/lib/server-api";
import type { User } from "@/types/user";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Twoja drużyna",
};

export default async function TeamPage() {
  const { team, error: teamsError } = await fetchUserTeam();
  if (teamsError) {
    return teamsError;
  }

  const { users, error: usersError } = await fetchUsersByTeamId(team!.id);

  if (usersError) {
    return usersError;
  }

  if (!team || !users) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Błąd</AlertTitle>
        <AlertDescription>
          Nie udało się załadować danych drużyny.
        </AlertDescription>
      </Alert>
    );
  }

  return <TeamManagementClient team={team} users={users as User[]} />;
}

import { WorksheetList } from "@/components/worksheets/worksheet-list";
import {
  fetchCurrentUser,
  fetchUserTeams,
  fetchWorksheets,
  getPatrolsFromTeams,
} from "@/lib/server-api";

export default async function ManagedWorksheets() {
  const { worksheets, error: worksheetsError } = await fetchWorksheets();
  if (worksheetsError) {
    return worksheetsError;
  }

  const { teams, error: teamsError } = await fetchUserTeams();
  if (teamsError) {
    return teamsError;
  }

  const { user, error: userError } = await fetchCurrentUser();
  if (userError) {
    return userError;
  }

  const patrols = getPatrolsFromTeams(teams ?? []).sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

  return (
    <div className="">
      <WorksheetList
        orgWorksheets={worksheets!}
        variant="managed"
        showFilters={true}
        patrols={patrols}
        currentUser={user!}
      />
    </div>
  );
}

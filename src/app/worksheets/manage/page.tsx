import { WorksheetList } from "@/components/worksheets/worksheet-list";
import {
  fetchCurrentUser,
  fetchUserTeam,
  fetchWorksheets,
} from "@/lib/server-api";

export default async function ManagedWorksheets() {
  const { worksheets, error: worksheetsError } = await fetchWorksheets();
  if (worksheetsError) {
    return worksheetsError;
  }

  const { team, error: teamError } = await fetchUserTeam();
  if (teamError) {
    return teamError;
  }

  const { user, error: userError } = await fetchCurrentUser();
  if (userError) {
    return userError;
  }

  const patrols =
    team?.patrols?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];

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

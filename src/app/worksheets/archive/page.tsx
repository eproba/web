import { WorksheetList } from "@/components/worksheets/worksheet-list";
import { fetchArchivedWorksheets, fetchUserTeam } from "@/lib/server-api";

export default async function ArchivedWorksheets() {
  const { worksheets, error: worksheetsError } =
    await fetchArchivedWorksheets();
  if (worksheetsError) {
    return worksheetsError;
  }

  const { team, error: teamsError } = await fetchUserTeam();
  if (teamsError) {
    return teamsError;
  }

  const patrols =
    team?.patrols?.sort((a, b) => a.name.localeCompare(b.name)) ?? [];

  return (
    <div className="">
      <WorksheetList
        orgWorksheets={worksheets!}
        variant="archived"
        showFilters={true}
        patrols={patrols}
      />
    </div>
  );
}

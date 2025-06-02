import { WorksheetList } from "@/components/worksheets/worksheet-list";
import { Team } from "@/types/team";
import { fetchArchivedWorksheets, fetchUserTeams } from "@/lib/server-api";

function getPatrolsFromTeams(userTeams: Team[]) {
  switch (userTeams.length) {
    case 0:
      return [];
    case 1:
      return userTeams[0].patrols || [];
    default:
      return userTeams
        .map((team) => {
          if (team.patrols) {
            return team.patrols.map((patrol) => ({
              id: patrol.id,
              name: `${team.shortName} - ${patrol.name}`,
            }));
          }
          return [];
        })
        .flat();
  }
}

export default async function ArchivedWorksheets() {
  const { worksheets, error: worksheetsError } =
    await fetchArchivedWorksheets();
  if (worksheetsError) {
    return worksheetsError;
  }

  const { teams, error: teamsError } = await fetchUserTeams();
  if (teamsError) {
    return teamsError;
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
        variant="archived"
        showFilters={true}
        patrols={patrols}
      />
    </div>
  );
}

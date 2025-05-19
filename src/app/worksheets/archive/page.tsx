import { auth } from "@/auth";
import { API_URL } from "@/lib/api";
import { Worksheet } from "@/types/worksheet";
import { LoginRequired } from "@/components/login-required";
import { worksheetSerializer } from "@/lib/serializers/worksheet";
import { handleError } from "@/lib/error-alert-handler";
import { WorksheetList } from "@/components/worksheet-list";
import { teamSerializer } from "@/lib/serializers/team";
import { Team } from "@/types/team";

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
  const session = await auth();
  if (!session || !session.user) {
    return <LoginRequired />;
  }

  const response = await fetch(`${API_URL}/worksheets/?archived`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!response.ok) {
    return await handleError(response);
  }
  const data = (await response.json()).reduce(
    (acc: Worksheet[], worksheet: Worksheet) => {
      const serializedWorksheet = worksheetSerializer(worksheet);
      if (serializedWorksheet) {
        acc.push(serializedWorksheet);
      }
      return acc;
    },
    [],
  ) as Worksheet[];

  const patrolsResponse = await fetch(`${API_URL}/teams/?user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!patrolsResponse.ok) {
    return await handleError(patrolsResponse);
  }

  const userTeams = (await patrolsResponse.json()).map(
    teamSerializer,
  ) as Team[];

  const patrols = getPatrolsFromTeams(userTeams).sort((a, b) => {
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });
  return (
    <div className="">
      <WorksheetList
        orgWorksheets={data}
        variant="archived"
        showFilters={true}
        patrols={patrols}
      />
    </div>
  );
}

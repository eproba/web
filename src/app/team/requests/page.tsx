import { fetchTeamRequests } from "@/lib/server-api";
import { TeamRequestsClient } from "./team-requests-client";

export default async function TeamRequestsPage() {
  const { data: requests, error } = await fetchTeamRequests();

  if (error) {
    return error;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Zgłoszenia drużyn</h1>
      </div>
      <TeamRequestsClient initialRequests={requests || []} />
    </div>
  );
}

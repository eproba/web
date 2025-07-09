import { getTeamRequests } from "@/lib/server-api";
import { TeamRequestsClient } from "./team-requests-client";

export default async function TeamRequestsPage() {
  const { data: requests, error } = await getTeamRequests();

  if (error) {
    return error;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Zgłoszenia drużyn</h1>
      </div>
      <TeamRequestsClient initialRequests={requests || []} />
    </div>
  );
}

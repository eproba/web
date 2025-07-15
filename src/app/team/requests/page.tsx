import { fetchTeamRequests } from "@/lib/server-api";
import type { Metadata } from "next";

import { TeamRequestsClient } from "./team-requests-client";

export const metadata: Metadata = {
  title: "Zgłoszenia drużyn",
};

export default async function TeamRequestsPage() {
  const { data: requests, error } = await fetchTeamRequests();

  if (error) {
    return error;
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold">Zgłoszenia drużyn</h1>
      </div>
      <TeamRequestsClient initialRequests={requests || []} />
    </div>
  );
}

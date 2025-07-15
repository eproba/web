import { TeamRequestForm } from "@/components/team/statistics/team-request-form";
import { fetchCurrentUser } from "@/lib/server-api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zgłoś drużynę",
};

export default async function TeamRequestPage() {
  const { user, error } = await fetchCurrentUser();

  if (error) {
    return error;
  }

  return (
    <div className="container mx-auto">
      <TeamRequestForm currentUser={user!} />
    </div>
  );
}

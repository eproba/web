import { TeamRequestForm } from "@/components/team/statistics/team-request-form";
import { fetchCurrentUser } from "@/lib/server-api";

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

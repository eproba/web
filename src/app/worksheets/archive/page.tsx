import { WorksheetList } from "@/components/worksheets/worksheet-list";
import {
  fetchArchivedWorksheets,
  fetchCurrentUser,
  fetchUserTeam,
} from "@/lib/server-api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Archiwum prób",
};

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
        variant="archived"
        showFilters={true}
        patrols={patrols}
        currentUser={user!}
      />
    </div>
  );
}

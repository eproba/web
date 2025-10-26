import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WorksheetList } from "@/components/worksheets/worksheet-list";
import { RequiredFunctionLevel } from "@/lib/const";
import {
  fetchCurrentUser,
  fetchUserTeam,
  fetchWorksheets,
} from "@/lib/server-api";
import { AlertCircleIcon } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Zarządzaj próbami",
};

export default async function ManagedWorksheets() {
  const { user, error: userError } = await fetchCurrentUser();
  if (userError) {
    return userError;
  }

  if (user!.function.numberValue < RequiredFunctionLevel.WORKSHEET_MANAGEMENT) {
    return (
      <Alert variant="destructive">
        <AlertCircleIcon className="size-4" />
        <AlertTitle>Nie masz uprawnień do przeglądania tej strony</AlertTitle>
        <AlertDescription>
          Skontaktuj się z twoim przełożonym, jeśli uważasz, że to błąd.
        </AlertDescription>
      </Alert>
    );
  }

  const { worksheets, error: worksheetsError } = await fetchWorksheets();
  if (worksheetsError) {
    return worksheetsError;
  }

  const { team, error: teamError } = await fetchUserTeam();
  if (teamError) {
    return teamError;
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
      />
    </div>
  );
}

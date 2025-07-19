import { WorksheetList } from "@/components/worksheets/worksheet-list";
import { fetchUserWorksheets } from "@/lib/server-api";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Twoje próby",
};

export default async function UserWorksheets() {
  const { worksheets, error } = await fetchUserWorksheets();
  if (error) {
    return error;
  }

  const activeWorksheets = worksheets!.filter(
    (worksheet) => !worksheet.isArchived,
  );
  const archivedWorksheets = worksheets!.filter(
    (worksheet) => worksheet.isArchived,
  );

  return (
    <div className="space-y-4">
      <WorksheetList
        orgWorksheets={activeWorksheets}
        variant="user"
        title="Twoje próby"
      />
      {archivedWorksheets?.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Archiwum</h2>
          <WorksheetList orgWorksheets={archivedWorksheets} variant="shared" />
        </div>
      )}
    </div>
  );
}

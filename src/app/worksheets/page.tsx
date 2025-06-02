import { auth } from "@/auth";
import { LoginRequired } from "@/components/login-required";
import { WorksheetList } from "@/components/worksheets/worksheet-list";
import { fetchUserWorksheets } from "@/lib/server-api";

export default async function UserWorksheets() {
  const session = await auth();
  if (!session || !session.user) {
    return <LoginRequired />;
  }

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
      <WorksheetList orgWorksheets={activeWorksheets} variant="user" />
      {archivedWorksheets?.length > 0 && (
        <div className="space-y-4 mt-8">
          <h2 className="text-2xl font-semibold">Archiwum</h2>
          <WorksheetList orgWorksheets={archivedWorksheets} variant="shared" />
        </div>
      )}
    </div>
  );
}

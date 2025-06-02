import { WorksheetList } from "@/components/worksheets/worksheet-list";
import { fetchCurrentUser, fetchReviewWorksheets } from "@/lib/server-api";

export default async function ReviewWorksheets() {
  const { worksheets, error: worksheetsError } = await fetchReviewWorksheets();
  if (worksheetsError) {
    return worksheetsError;
  }

  const { user, error: userError } = await fetchCurrentUser();
  if (userError) {
    return userError;
  }

  return (
    <div className="">
      <WorksheetList
        orgWorksheets={worksheets!}
        variant="review"
        currentUser={user!}
      />
    </div>
  );
}

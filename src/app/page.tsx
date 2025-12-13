import NewsPage from "@/app/news/page";
import { auth } from "@/lib/auth";
import { WorksheetList } from "@/components/worksheets/worksheet-list";
import { fetchUserWorksheets } from "@/lib/server-api";
import { headers } from "next/headers";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    const { worksheets, error } = await fetchUserWorksheets();
    if (error) {
      return NewsPage(); // If there's an error fetching worksheets, just show the news page
    }

    const activeWorksheets = worksheets!.filter(
      (worksheet) => !worksheet.isArchived,
    );
    if (activeWorksheets.length > 0) {
      return (
        <div className="space-y-6">
          <div className="space-y-4">
            <WorksheetList
              orgWorksheets={activeWorksheets}
              variant="user"
              title="Twoje próby"
            />
          </div>
          <NewsPage />
        </div>
      );
    }
  }
  return NewsPage();
}

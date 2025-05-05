import { auth } from "@/auth";
import Link from "next/link";
import { API_URL } from "@/lib/api";
import { Worksheet } from "@/types/worksheet";
import { LoginRequired } from "@/components/login-required";
import { WorksheetItem } from "@/components/worksheet-item";
import { worksheetSerializer } from "@/lib/serializers/worksheet";

export default async function UserWorksheets() {
  const session = await auth();
  if (!session) {
    return <LoginRequired />;
  }

  const response = await fetch(`${API_URL}/api/worksheets?user`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch worksheets");
  }
  const data = (await response.json()).map(worksheetSerializer) as Worksheet[];

  // if (error)
  //   return (
  //     <div className="p-4 bg-destructive/10 text-destructive rounded-lg">
  //       {error.message}
  //     </div>
  //   );

  return (
    <div className="space-y-4 md:px-16">
      {data?.length === 0 ? (
        <div className="p-4 bg-card rounded-lg">
          No worksheets found.
          <Link href="/worksheets/create" className="text-primary">
            create a new one
          </Link>
        </div>
      ) : (
        data?.map((worksheet) => (
          <WorksheetItem key={worksheet.id} worksheet={worksheet} />
        ))
      )}
    </div>
  );
}

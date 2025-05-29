import { auth } from "@/auth";
import { API_URL } from "@/lib/api";
import { Worksheet } from "@/types/worksheet";
import { LoginRequired } from "@/components/login-required";
import { worksheetSerializer } from "@/lib/serializers/worksheet";
import { handleError } from "@/lib/error-alert-handler";
import { WorksheetList } from "@/components/worksheets/worksheet-list";
import { teamSerializer } from "@/lib/serializers/team";
import { Team } from "@/types/team";

export default async function TemplatesPage() {
  const session = await auth();
  if (!session || !session.user) {
    return <LoginRequired />;
  }

  const response = await fetch(`${API_URL}/templates/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  if (!response.ok) {
    return await handleError(response);
  }

  const data = (await response.json()).reduce(
    (acc: Worksheet[], worksheet: Worksheet) => {
      const serializedWorksheet = worksheet;
      if (serializedWorksheet) {
        acc.push(serializedWorksheet);
      }
      return acc;
    },
    [],
  ) as Worksheet[];

  return (
    <div className="">
      <WorksheetList orgWorksheets={data} variant="managed" />
    </div>
  );
}

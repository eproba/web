import { auth } from "@/auth";
import { API_URL } from "@/lib/api";
import { Worksheet } from "@/types/worksheet";
import { LoginRequired } from "@/components/login-required";
import { worksheetSerializer } from "@/lib/serializers/worksheet";
import { handleError } from "@/lib/error-alert-handler";
import { WorksheetList } from "@/components/worksheet-list";

export default async function ReviewWorksheets() {
  const session = await auth();
  if (!session || !session.user) {
    return <LoginRequired />;
  }

  const response = await fetch(`${API_URL}/worksheets/?review`, {
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
      const serializedWorksheet = worksheetSerializer(worksheet);
      if (serializedWorksheet) {
        acc.push(serializedWorksheet);
      }
      return acc;
    },
    [],
  ) as Worksheet[];

  return (
    <div className="">
      <WorksheetList
        orgWorksheets={data}
        variant="review"
        currentUserId={session.user.id}
      />
    </div>
  );
}

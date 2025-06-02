import React from "react";
import { WorksheetEditor } from "@/components/worksheets/editor/worksheet-editor";
import { fetchCurrentUser, fetchWorksheet } from "@/lib/server-api";

interface WorksheetEditPageProps {
  params: Promise<{
    worksheetId: string;
  }>;
}

const WorksheetEditPage = async ({ params }: WorksheetEditPageProps) => {
  const { worksheetId } = await params;

  const { worksheet, error: worksheetError } =
    await fetchWorksheet(worksheetId);
  if (worksheetError) {
    return worksheetError;
  }

  const { user, error: userError } = await fetchCurrentUser();
  if (userError) {
    return userError;
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold  mb-2">Edycja próby</h1>
      </div>
      <WorksheetEditor
        mode="edit"
        redirectTo={`/worksheets/manage#${worksheetId}`}
        initialData={worksheet}
        currentUser={user!}
      />
    </div>
  );
};

export default WorksheetEditPage;

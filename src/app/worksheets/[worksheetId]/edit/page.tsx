import { WorksheetEditor } from "@/components/worksheets/editor/worksheet-editor";
import { fetchCurrentUser, fetchWorksheet } from "@/lib/server-api";
import type { Metadata } from "next";
import React from "react";

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
        <h1 className="mb-2 text-3xl font-bold">Edycja próby</h1>
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ worksheetId: string }>;
}): Promise<Metadata> {
  const { worksheetId } = await params;

  const { worksheet, error: worksheetError } =
    await fetchWorksheet(worksheetId);
  if (worksheetError) {
    return { title: "Błąd" };
  }

  return {
    title: worksheet?.name
      ? `Edycja ${worksheet.name} - ${worksheet.user.displayName}`
      : "Edycja próby",
  };
}

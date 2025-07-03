import React from "react";
import { fetchWorksheet } from "@/lib/server-api";
import { WorksheetItem } from "@/components/worksheets/worksheet-item";

interface WorksheetEditPageProps {
  params: Promise<{
    worksheetId: string;
  }>;
}

const WorksheetPage = async ({ params }: WorksheetEditPageProps) => {
  const { worksheetId } = await params;

  const { worksheet, error: worksheetError } =
    await fetchWorksheet(worksheetId);
  if (worksheetError) {
    return worksheetError;
  }

  return <WorksheetItem worksheet={worksheet!} variant={"shared"} />;
};

export default WorksheetPage;

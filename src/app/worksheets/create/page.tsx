import React from "react";
import { WorksheetEditor } from "@/components/worksheets/editor/worksheet-editor";
import { WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { auth } from "@/auth";

interface WorksheetCreatePageProps {
  searchParams: Promise<{
    templateId?: string;
  }>;
}

// This is a server component that can process initial data
const WorksheetCreatePage = async ({
  searchParams,
}: WorksheetCreatePageProps) => {
  const session = await auth();
  let initialData: Partial<WorksheetWithTasks> | undefined = undefined;

  const { templateId } = await searchParams;

  if (templateId) {
    console.log(templateId);
  }

  return (
    <WorksheetEditor
      initialData={initialData}
      mode="create"
      redirectTo="/worksheets"
      userId={session?.user?.id}
    />
  );
};

export default WorksheetCreatePage;

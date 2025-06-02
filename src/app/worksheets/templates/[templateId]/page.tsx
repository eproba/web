import React from "react";
import { WorksheetEditor } from "@/components/worksheets/editor/worksheet-editor";
import { fetchCurrentUser, fetchTemplate } from "@/lib/server-api";

interface UseTemplatePageProps {
  params: Promise<{
    templateId: string;
  }>;
}

const UseTemplatePage = async ({ params }: UseTemplatePageProps) => {
  const { templateId } = await params;

  const { template, error: templateError } = await fetchTemplate(templateId);
  if (templateError) {
    return templateError;
  }

  const { user, error: userError } = await fetchCurrentUser();
  if (userError) {
    return userError;
  }

  return (
    <WorksheetEditor
      mode="create"
      redirectTo={`/worksheets/templates#${templateId}`}
      initialData={template}
      currentUser={user!}
    />
  );
};

export default UseTemplatePage;

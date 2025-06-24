import React from "react";
import { fetchCurrentUser, fetchTemplate } from "@/lib/server-api";
import { TemplateEditor } from "@/components/worksheets/editor/template-editor";

interface TemplateEditPageProps {
  params: Promise<{
    templateId: string;
  }>;
}

const TemplateEditPage = async ({ params }: TemplateEditPageProps) => {
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
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold  mb-2">Edycja szablonu</h1>
      </div>
      <TemplateEditor
        mode="edit"
        redirectTo={`/worksheets/templates#${templateId}`}
        initialData={template}
        currentUser={user!}
      />
    </div>
  );
};

export default TemplateEditPage;

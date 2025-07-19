import { TemplateEditor } from "@/components/worksheets/editor/template-editor";
import { fetchCurrentUser, fetchTemplate } from "@/lib/server-api";
import type { Metadata } from "next";
import React from "react";

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
        <h1 className="mb-2 text-2xl font-semibold">Edycja szablonu</h1>
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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ templateId: string }>;
}): Promise<Metadata> {
  const { templateId } = await params;

  const { template, error: templateError } = await fetchTemplate(templateId);
  if (templateError) {
    return { title: "Błąd" };
  }

  return {
    title: template?.name
      ? `Edycja szablonu ${template.name}`
      : "Edycja szablonu",
  };
}

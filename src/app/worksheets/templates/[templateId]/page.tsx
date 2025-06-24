import React from "react";
import { fetchTemplate } from "@/lib/server-api";
import { TemplateItem } from "@/components/worksheets/templates/template-item";

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

  return <TemplateItem template={template!} />;
};

export default UseTemplatePage;

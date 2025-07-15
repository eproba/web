import { TemplateItem } from "@/components/worksheets/templates/template-item";
import { fetchTemplate } from "@/lib/server-api";
import type { Metadata } from "next";
import React from "react";

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
    title: template?.name ? `Szablon ${template.name}` : "Szablon",
    description: template?.description || undefined,
  };
}

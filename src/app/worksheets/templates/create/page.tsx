import { TemplateEditor } from "@/components/worksheets/editor/template-editor";
import { fetchCurrentUser } from "@/lib/server-api";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Utwórz szablon",
};

interface TemplateCreatePageProps {
  searchParams: Promise<{
    redirectTo?: string;
    forOrganization?: boolean;
  }>;
}

const TemplateCreatePage = async ({
  searchParams,
}: TemplateCreatePageProps) => {
  const { redirectTo, forOrganization } = await searchParams;

  const { user, error: userError } = await fetchCurrentUser();
  if (userError) {
    return userError;
  }

  const initialData = {
    scope: forOrganization ? "organization" : "team",
  } as const;

  return (
    <TemplateEditor
      mode="create"
      redirectTo={redirectTo || "/worksheets/templates"}
      currentUser={user!}
      initialData={initialData}
    />
  );
};

export default TemplateCreatePage;

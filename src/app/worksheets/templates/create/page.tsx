import React from "react";
import { fetchCurrentUser } from "@/lib/server-api";
import { TemplateEditor } from "@/components/worksheets/editor/template-editor";

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

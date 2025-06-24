import React from "react";
import { fetchCurrentUser } from "@/lib/server-api";
import { TemplateEditor } from "@/components/worksheets/editor/template-editor";

interface TemplateCreatePageProps {
  searchParams: Promise<{
    redirectTo?: string;
  }>;
}

const TemplateCreatePage = async ({
  searchParams,
}: TemplateCreatePageProps) => {
  const { redirectTo } = await searchParams;

  const { user, error: userError } = await fetchCurrentUser();
  if (userError) {
    return userError;
  }

  return (
    <TemplateEditor
      mode="create"
      redirectTo={redirectTo || "/worksheets/templates"}
      currentUser={user!}
    />
  );
};

export default TemplateCreatePage;

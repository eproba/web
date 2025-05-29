import React from "react";
import { WorksheetEditor } from "@/components/worksheets/editor/worksheet-editor";
import { auth } from "@/auth";
import { LoginRequired } from "@/components/login-required";
import { API_URL } from "@/lib/api";
import { handleError } from "@/lib/error-alert-handler";
import { worksheetSerializer } from "@/lib/serializers/worksheet";

interface WorksheetEditPageProps {
  params: Promise<{
    worksheetId: string;
  }>;
}

// This demonstrates how to use the editor for editing existing worksheets
const WorksheetEditPage = async ({ params }: WorksheetEditPageProps) => {
  const { worksheetId } = await params;
  const session = await auth();
  if (!session || !session.user) {
    return <LoginRequired />;
  }

  const response = await fetch(`${API_URL}/worksheets/${worksheetId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.accessToken}`,
    },
  });

  const worksheet = worksheetSerializer(await response.json());

  if (!response.ok || !worksheet) {
    return await handleError(response);
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold  mb-2">Edycja próby</h1>
      </div>
      <WorksheetEditor
        mode="edit"
        redirectTo={`/worksheets/manage#${worksheetId}`}
        initialData={worksheet}
      />
    </div>
  );
};

export default WorksheetEditPage;

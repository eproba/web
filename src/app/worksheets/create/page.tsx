import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { WorksheetEditor } from "@/components/worksheets/editor/worksheet-editor";
import { fetchCurrentUser, fetchTemplate } from "@/lib/server-api";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import Image from "next/image";
import React from "react";
import { v4 as uuid } from "uuid";


export const metadata: Metadata = {
  title: "Utwórz próbę",
};

interface WorksheetCreatePageProps {
  searchParams: Promise<{
    templateId?: string;
    redirectTo?: string;
  }>;
}

const WorksheetCreatePage = async ({
  searchParams,
}: WorksheetCreatePageProps) => {
  const { templateId, redirectTo } = await searchParams;

  const { user, error: userError } = await fetchCurrentUser();
  if (userError) {
    return userError;
  }

  if (templateId) {
    const { template, error: templateError } = await fetchTemplate(templateId);
    if (templateError) {
      return templateError;
    }

    return (
      <div className="space-y-4">
        <Card className="py-0">
          <div className="flex items-center">
            {template?.image && (
              <Image
                src={template.image}
                alt={template.name}
                width={48}
                height={48}
                className="m-2 size-12 rounded-md object-cover dark:grayscale dark:invert"
              />
            )}
            <div className={cn("my-4", !template?.image && "mx-6")}>
              <CardTitle>{template?.name}</CardTitle>
              <CardDescription>
                <span className="hidden sm:inline">
                  Ten szablon zostanie użyty do stworzenia nowego próby. Możesz
                  ją edytować i dostosować do swoich potrzeb.
                </span>
                <span className="inline sm:hidden">
                  Tworzysz próbę z tego szablonu.
                </span>
              </CardDescription>
            </div>
          </div>
          {/*<CardContent>*/}

          {/*</CardContent>*/}
        </Card>
        <WorksheetEditor
          mode="create"
          redirectTo={redirectTo || `/worksheets/templates#${templateId}`}
          initialData={{ ...template, templateId, tasks: (template?.tasks || []).map((task) => ({ ...task, id: uuid() })) }}
          currentUser={user!}
        />
      </div>
    );
  }

  return (
    <WorksheetEditor
      mode="create"
      redirectTo={redirectTo || "/worksheets"}
      currentUser={user!}
    />
  );
};

export default WorksheetCreatePage;

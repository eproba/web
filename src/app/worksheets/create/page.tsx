import React from "react";
import { WorksheetEditor } from "@/components/worksheets/editor/worksheet-editor";
import { fetchCurrentUser, fetchTemplate } from "@/lib/server-api";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";

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
                className="size-12 rounded-md object-cover m-2 dark:invert dark:grayscale"
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
          initialData={{ ...template, templateId }}
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

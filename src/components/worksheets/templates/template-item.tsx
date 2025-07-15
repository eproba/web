"use client";

import { Button } from "@/components/ui/button";
import { TaskTable } from "@/components/worksheets/task-table";
import { TemplateActions } from "@/components/worksheets/templates/template-actions";
import { TemplateWorksheet } from "@/types/template";
import { PencilRulerIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function TemplateItem({
  template,
  deleteTemplate,
}: {
  template: TemplateWorksheet;
  deleteTemplate?: (worksheetId: string) => void;
}) {
  return (
    <div
      className="bg-card space-y-4 rounded-lg p-6 shadow-md"
      id={template.id}
    >
      <div>
        <div className="mb-2 flex w-full items-center justify-between gap-2">
          <h2 className="flex items-center text-2xl font-semibold">
            {template.image && (
              <Image
                src={template.image}
                alt={template.name}
                className={`mr-2 inline-block size-10 rounded-md object-cover ${
                  template.image.endsWith(".svg")
                    ? "dark:grayscale dark:invert"
                    : ""
                }`}
                width={40}
                height={40}
              />
            )}
            {template.name}
          </h2>

          <TemplateActions
            template={template}
            removeTemplate={deleteTemplate}
          />
        </div>
        {template.description && (
          <p className="text-muted-foreground text-sm whitespace-pre-wrap">
            {template.description}
          </p>
        )}
        {template.updatedAt && (
          <p className="text-muted-foreground text-xs">
            Ostatnia aktualizacja: {template.updatedAt.toLocaleString()}
          </p>
        )}
      </div>

      <TaskTable worksheet={template} variant="template" />

      <Button>
        <PencilRulerIcon />
        <Link href={`/worksheets/create?templateId=${template.id}`}>
          Utwórz próbę z tego szablonu
        </Link>
      </Button>
    </div>
  );
}

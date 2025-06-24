"use client";

import { TaskTable } from "@/components/worksheets/task-table";
import { TemplateActions } from "@/components/worksheets/templates/template-actions";
import { TemplateWorksheet } from "@/types/template";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MessageSquareDashedIcon, PencilRulerIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function TemplateItem({
  template,
  deleteTemplate,
}: {
  template: TemplateWorksheet;
  deleteTemplate?: (worksheetId: string) => void;
}) {
  return (
    <div
      className="bg-card rounded-lg p-6 shadow-md space-y-4"
      id={template.id}
    >
      <div>
        <div className="flex w-full justify-between items-center gap-2 mb-2">
          <h2 className="text-2xl font-semibold flex items-center">
            {template.image && (
              <Image
                src={template.image}
                alt={template.name}
                className="size-10 rounded-md object-cover inline-block mr-2"
                width={40}
                height={40}
              />
            )}
            {template.name}
            {template.templateNotes && (
              <Popover>
                <PopoverTrigger>
                  <MessageSquareDashedIcon className="size-5 text-muted-foreground ml-2" />
                </PopoverTrigger>
                <PopoverContent>
                  <p className="text-sm text-muted-foreground">
                    Notatka - widoczna do momentu utworzenie próby z szablonu:
                  </p>
                  <p className="text-sm">{template.templateNotes}</p>
                </PopoverContent>
              </Popover>
            )}
          </h2>

          <TemplateActions
            template={template}
            removeTemplate={deleteTemplate}
          />
        </div>
        {template.description && (
          <p className="text-sm text-muted-foreground">
            {template.description}
          </p>
        )}
        {template.updatedAt && (
          <p className="text-sm text-muted-foreground">
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

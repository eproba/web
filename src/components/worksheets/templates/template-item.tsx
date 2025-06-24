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
      <div className="flex justify-between items-start mb-2">
        <div>
          <h2 className="text-2xl font-semibold">
            <span className="inline-flex items-center gap-2">
              {template.name}
              {template.image && (
                <Image
                  src={template.image}
                  alt={template.name}
                  className="size-10 rounded-md"
                  width={40}
                  height={40}
                />
              )}
              {template.templateNotes && (
                <Popover>
                  <PopoverTrigger>
                    <MessageSquareDashedIcon className="size-5 text-muted-foreground" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <p className="text-sm text-muted-foreground">
                      Notatka - widoczna do momentu utworzenie próby z szablonu:
                    </p>
                    <p className="text-sm">{template.templateNotes}</p>
                  </PopoverContent>
                </Popover>
              )}
            </span>{" "}
          </h2>
        </div>

        <TemplateActions template={template} removeTemplate={deleteTemplate} />
      </div>
      {template.description && (
        <p className="text-sm text-muted-foreground">{template.description}</p>
      )}

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

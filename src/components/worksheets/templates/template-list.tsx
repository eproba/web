"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TemplateItem } from "@/components/worksheets/templates/template-item";
import { TemplateWorksheet } from "@/types/template";
import { useState } from "react";

export function TemplateList({
  orgTemplates,
}: {
  orgTemplates: TemplateWorksheet[];
}) {
  const [templates, setTemplates] = useState<TemplateWorksheet[]>(orgTemplates);

  function deleteTemplate(worksheetId: string) {
    setTemplates((prevTemplates) =>
      prevTemplates.filter((w) => w.id !== worksheetId),
    );
  }

  return (
    <div className="space-y-4">
      {templates.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>
              Nie znaleziono szablonów pasujących do podanych kryteriów.
            </CardTitle>
          </CardHeader>
          <CardContent>{/*TODO: Add create worksheet button */}</CardContent>
        </Card>
      ) : (
        templates
          .sort(
            (a, b) => new Date(b.name).getTime() - new Date(a.name).getTime(),
          )
          .map((template) => (
            <TemplateItem
              key={template.id}
              template={template}
              deleteTemplate={() => deleteTemplate(template.id)}
            />
          ))
      )}
    </div>
  );
}

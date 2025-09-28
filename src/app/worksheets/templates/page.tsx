import { CreateWorksheetButton } from "@/components/worksheets/create-worksheet-button";
import { TemplateList } from "@/components/worksheets/templates/template-list";
import { RequiredFunctionLevel } from "@/lib/const";
import { fetchCurrentUser, fetchTemplates } from "@/lib/server-api";
import { PlusIcon } from "lucide-react";
import type { Metadata } from "next";
import * as React from "react";

export const metadata: Metadata = {
  title: "Szablony",
};

export default async function TemplatesPage() {
  const { templates, error: templatesError } = await fetchTemplates();
  if (templatesError) {
    return templatesError;
  }

  const { user, error: userError } = await fetchCurrentUser();
  if (userError) {
    return userError;
  }

  const teamTemplates = templates!.filter(
    (worksheet) => worksheet.scope === "team",
  );
  const organizationTemplates = templates!.filter(
    (worksheet) => worksheet.scope === "organization",
  );

  return (
    <div className="space-y-4">
      {teamTemplates.length > 0 && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between">
            <h2 className="text-2xl font-semibold" id="team-templates">
              Szablony twojej drużyny
            </h2>
            {user!.function.numberValue >=
              RequiredFunctionLevel.TEAM_TEMPLATE_MANAGEMENT && (
              <>
                <CreateWorksheetButton
                  variant="outline"
                  itemType="template"
                  parentClassName="hidden sm:flex"
                />
                <CreateWorksheetButton
                  variant="outline"
                  itemType="template"
                  size="icon"
                  parentClassName="sm:hidden"
                />
              </>
            )}
          </div>
          <TemplateList orgTemplates={teamTemplates} />
        </div>
      )}
      {organizationTemplates.length > 0 && (
        <div className="mt-8 space-y-4">
          <div className="flex flex-wrap items-center justify-between">
            <h2 className="text-2xl font-semibold" id="organization-templates">
              Szablony twojej organizacji
            </h2>
            {user?.isStaff && (
              <>
                <CreateWorksheetButton
                  variant="outline"
                  itemType="template"
                  parentClassName="hidden sm:flex"
                  templateForOrganization={true}
                />
                <CreateWorksheetButton
                  variant="outline"
                  itemType="template"
                  size="icon"
                  parentClassName="sm:hidden"
                  templateForOrganization={true}
                />
              </>
            )}
          </div>
          <TemplateList orgTemplates={organizationTemplates} />
        </div>
      )}
      {!teamTemplates.length && !organizationTemplates.length && (
        <div className="mt-8 text-center text-gray-500">
          <p>Brak dostępnych szablonów.</p>
        </div>
      )}
      {user!.function.numberValue >=
        RequiredFunctionLevel.TEAM_TEMPLATE_MANAGEMENT &&
        teamTemplates.length === 0 && (
          <CreateWorksheetButton
            variant="default"
            itemType="template"
            parentClassName="flex justify-center mt-8"
          >
            <PlusIcon className="size-4" />
            Utwórz szablon dla drużyny
          </CreateWorksheetButton>
        )}
    </div>
  );
}

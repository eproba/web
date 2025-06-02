import { TemplateList } from "@/components/worksheets/templates/template-list";
import { fetchTemplates } from "@/lib/server-api";

export default async function TemplatesPage() {
  const { templates, error: templatesError } = await fetchTemplates();
  if (templatesError) {
    return templatesError;
  }

  const teamTemplates = templates!.filter(
    (worksheet) => worksheet.teamId !== null,
  );
  const organizationTemplates = templates!.filter(
    (worksheet) => worksheet.organization !== null,
  );

  return (
    <div className="space-y-4">
      {teamTemplates.length > 0 && (
        <div className="space-y-4 mt-8">
          <h2 className="text-2xl font-semibold">Szablony twojej drużyny</h2>
          <TemplateList orgTemplates={teamTemplates} />
        </div>
      )}
      {organizationTemplates.length > 0 && (
        <div className="space-y-4 mt-8">
          <h2 className="text-2xl font-semibold">
            Szablony twojej organizacji
          </h2>
          <TemplateList orgTemplates={organizationTemplates} />
        </div>
      )}
      {!teamTemplates.length && !organizationTemplates.length && (
        <div className="text-center text-gray-500 mt-8">
          <p>Brak dostępnych szablonów.</p>
        </div>
      )}
    </div>
  );
}

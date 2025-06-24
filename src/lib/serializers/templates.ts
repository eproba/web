import { TemplateTask, TemplateWorksheet } from "@/types/template";
import { Organization } from "@/types/team";

export interface ApiTemplateTaskResponse {
  id: string;
  task: string;
  description: string;
  category: "general" | "individual";
  template_notes: string;
  order?: number;
}

export interface ApiTemplateWorksheetResponse {
  id: string;
  name: string;
  description: string;
  team: string | null;
  organization: Organization | null;
  tasks: ApiTemplateTaskResponse[];
  updated_at: string;
  created_at: string;
  template_notes: string;
  image?: string | null;
}

export function templateSerializer(
  apiResponse: ApiTemplateWorksheetResponse,
): TemplateWorksheet | null {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    description: apiResponse.description,
    teamId: apiResponse.team,
    organization: apiResponse.organization as Organization,
    tasks: apiResponse.tasks.map(templateTaskSerializer),
    updatedAt: new Date(apiResponse.updated_at),
    createdAt: new Date(apiResponse.created_at),
    templateNotes: apiResponse.template_notes,
    image: apiResponse.image || null,
  };
}

export function templateTaskSerializer(
  apiResponse: ApiTemplateTaskResponse,
): TemplateTask {
  return {
    id: apiResponse.id,
    name: apiResponse.task,
    description: apiResponse.description,
    category: apiResponse.category,
    templateNotes: apiResponse.template_notes,
    order: apiResponse.order || 0,
  };
}

import { TemplateTask, TemplateWorksheet } from "@/types/template";

// Helper function to transform image URLs for SVG files
// This is because files that are fetched from the internal server
// aren't accessible from the public URL directly. When it's an SVG,
// we replace the internal URL with the public URL to ensure it can be accessed.
// For non-SVG files, we return the original path as Next.js optimizes this images.
function transformImageUrl(
  imagePath: string | null | undefined,
): string | null {
  if (!imagePath) return null;

  const isSvg = imagePath.endsWith(".svg");
  const publicUrl = process.env.NEXT_PUBLIC_SERVER_URL;
  const internalUrl = process.env.INTERNAL_SERVER_URL;

  // If it's an SVG and starts with internal URL, replace with public URL
  if (isSvg && publicUrl && internalUrl && imagePath.startsWith(internalUrl)) {
    return imagePath.replace(internalUrl, publicUrl);
  }

  return imagePath;
}

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
  scope: "team" | "organization";
  tasks: ApiTemplateTaskResponse[];
  updated_at: string;
  created_at: string;
  template_notes: string;
  image?: string | null;
  priority: number;
}

export function templateMetadataSerializer(
  apiResponse: Pick<
    ApiTemplateWorksheetResponse,
    "id" | "name" | "description" | "image"
  >,
): Pick<TemplateWorksheet, "id" | "name" | "description" | "image"> {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    description: apiResponse.description,
    image: transformImageUrl(apiResponse.image) || null,
  };
}

export function templateSerializer(
  apiResponse: ApiTemplateWorksheetResponse,
): TemplateWorksheet {
  return {
    ...templateMetadataSerializer(apiResponse),
    scope: apiResponse.scope,
    tasks: apiResponse.tasks.map(templateTaskSerializer),
    updatedAt: new Date(apiResponse.updated_at),
    createdAt: new Date(apiResponse.created_at),
    templateNotes: apiResponse.template_notes,
    priority: apiResponse.priority,
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

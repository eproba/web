import { Organization } from "@/types/team";

export interface TemplateTask {
  id: string;
  name: string;
  description: string;
  category: "general" | "individual";
  templateNotes: string;
  order: number;
}

export interface TemplateWorksheet {
  id: string;
  name: string;
  teamId: string | null;
  organization: Organization | null;
  description: string;
  tasks: TemplateTask[];
  updatedAt: Date;
  createdAt: Date;
  templateNotes: string;
}

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
  scope: "team" | "organization";
  description: string;
  tasks: TemplateTask[];
  updatedAt: Date;
  createdAt: Date;
  templateNotes: string;
  image?: string | null;
}

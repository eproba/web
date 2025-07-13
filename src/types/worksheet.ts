import { PublicUser } from "@/types/user";
import { TemplateWorksheet } from "@/types/template";

export enum TaskStatus {
  TODO = 0,
  AWAITING_APPROVAL = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export interface Task {
  id: string;
  name: string;
  description: string;
  status: TaskStatus;
  approver: string | null;
  approverName: string | null;
  approvalDate: Date | null;
  category: "general" | "individual";
  notes: string;
  order: number;
}

export interface Worksheet {
  id: string;
  user: PublicUser;
  userId: string;
  name: string;
  description: string;
  supervisor: string | null;
  supervisorName: string | null;
  tasks: Task[];
  updatedAt: Date;
  createdAt: Date;
  isArchived: boolean;
  isDeleted: boolean;
  notes: string;
  template?: Pick<
    TemplateWorksheet,
    "id" | "name" | "description" | "image"
  > | null;
}

import { Task, Worksheet } from "@/types/worksheet";
import { ApiUserResponse, publicUserSerializer } from "@/lib/serializers/user";

export interface ApiTaskResponse {
  id: string;
  task: string;
  description: string;
  status: number;
  approver: string | null;
  approver_name: string;
  approval_date?: string | null;
  category: "general" | "individual";
  notes: string;
  order?: number;
}

export interface ApiWorksheetResponse {
  id: string;
  user: ApiUserResponse;
  name: string;
  description: string;
  supervisor: string;
  supervisor_name: string;
  tasks: ApiTaskResponse[];
  updated_at: string;
  created_at: string;
  is_archived: boolean;
  is_deleted: boolean;
  notes: string;
  template?: {
    id: string;
    name: string;
    description: string;
    image?: string | null;
  };
}

export function worksheetSerializer(
  apiResponse: ApiWorksheetResponse,
): Worksheet | null {
  if (apiResponse.is_deleted) {
    return null;
  }
  return {
    id: apiResponse.id,
    user: apiResponse.user ? publicUserSerializer(apiResponse.user) : undefined,
    userId: apiResponse.user?.id,
    name: apiResponse.name,
    description: apiResponse.description,
    supervisor: apiResponse.supervisor,
    supervisorName: apiResponse.supervisor_name,
    tasks: apiResponse.tasks.map(taskSerializer),
    updatedAt: new Date(apiResponse.updated_at),
    createdAt: new Date(apiResponse.created_at),
    isArchived: apiResponse.is_archived,
    isDeleted: apiResponse.is_deleted,
    notes: apiResponse.notes,
    template: apiResponse.template,
  };
}

export function taskSerializer(apiResponse: ApiTaskResponse): Task {
  return {
    id: apiResponse.id,
    name: apiResponse.task,
    description: apiResponse.description,
    status: apiResponse.status,
    approver: apiResponse.approver,
    approverName: apiResponse.approver_name,
    approvalDate: apiResponse.approval_date
      ? new Date(apiResponse.approval_date)
      : null,
    category: apiResponse.category,
    notes: apiResponse.notes,
    order: apiResponse.order || 0,
  };
}

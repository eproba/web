import { templateMetadataSerializer } from "@/lib/serializers/templates";
import { ApiUserResponse, publicUserSerializer } from "@/lib/serializers/user";
import { Task, Worksheet } from "@/types/worksheet";

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
  } | null;
  final_challenge: string;
  final_challenge_description: string;
}

export function worksheetSerializer(
  apiResponse: ApiWorksheetResponse,
): Worksheet | null {
  if (apiResponse.is_deleted) {
    return null;
  }
  return {
    id: apiResponse.id,
    user: publicUserSerializer(apiResponse.user),
    userId: apiResponse.user.id,
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
    template: apiResponse.template
      ? templateMetadataSerializer(apiResponse.template)
      : null,
    finalChallenge: apiResponse.final_challenge,
    finalChallengeDescription: apiResponse.final_challenge_description,
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

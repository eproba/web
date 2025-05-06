import { Task, Worksheet } from "@/types/worksheet";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function worksheetSerializer(apiResponse: any): Worksheet {
  return {
    id: apiResponse.id,
    user: apiResponse.user,
    name: apiResponse.name,
    description: apiResponse.description,
    supervisor: apiResponse.supervisor,
    supervisorName: apiResponse.supervisor_name,
    tasks: apiResponse.tasks.map(taskSerializer),
    updatedAt: new Date(apiResponse.updated_at),
    createdAt: new Date(apiResponse.created_at),
    isArchived: apiResponse.is_archived,
    isDeleted: apiResponse.is_deleted,
  };
}

export function taskSerializer(apiResponse: any): Task {
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
  };
}

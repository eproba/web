export enum TaskStatus {
  TODO = 0,
  AWAITING_APPROVAL = 1,
  APPROVED = 2,
  REJECTED = 3,
}

export interface Task {
  id: string;
  name: string;
  description: string | null;
  status: TaskStatus;
  approver: string | null;
  approvalDate: Date | null;
}

export interface Worksheet {
  id: string;
  user: string;
  name: string;
  description: string;
  supervisor: string | null;
  supervisorName: string | null;
  tasks: Task[];
  updatedAt: Date;
  createdAt: Date;
  isArchived: boolean;
  isDeleted: boolean;
}

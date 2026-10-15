import {
  Task,
  WorksheetWithTasks,
  worksheetWithTasksSchema,
} from "@/lib/schemas/worksheet";
import { TaskStatus } from "@/types/worksheet";
import { v4 as uuid } from "uuid";

export type TaskCategory = Task["category"];
export type DropEdge = "top" | "bottom" | null;
export type EditorInitialData = Omit<Partial<WorksheetWithTasks>, "tasks"> & {
  tasks?: (Task & { status?: TaskStatus })[];
};
export interface ModifiedTask {
  id: string;
  name: string;
  originalStatus: TaskStatus;
}

export function hasTaskContent(task: Task, template = false) {
  return Boolean(
    task.name.trim() ||
    task.description.trim() ||
    (template && task.templateNotes?.trim()),
  );
}

export const worksheetSaveSchema = worksheetWithTasksSchema
  .refine((data) => data.tasks.some((task) => hasTaskContent(task)), {
    path: ["tasks"],
    error: "Dodaj przynajmniej jedno zadanie",
  })
  .refine((data) => !data.userId || data.userId !== data.supervisor, {
    path: ["supervisor"],
    error: "Użytkownik nie może być swoim własnym opiekunem.",
  });
export const templateSaveSchema = worksheetWithTasksSchema
  .refine((data) => data.tasks.some((task) => hasTaskContent(task, true)), {
    path: ["tasks"],
    error: "Dodaj przynajmniej jedno zadanie",
  })
  .refine((data) => Boolean(data.scope), {
    path: ["scope"],
    error: "Wybierz zakres szablonu",
  });

export function createTask(category: TaskCategory, order = 0): Task {
  return {
    id: uuid(),
    name: "",
    description: "",
    category,
    order,
    templateNotes: "",
  };
}
export function initialTasks(tasks?: Task[]): Task[] {
  return tasks
    ? [...tasks].sort((a, b) => a.order - b.order)
    : (["general", "individual"] as const).flatMap((category) =>
        Array.from({ length: 3 }, (_, order) => createTask(category, order)),
      );
}

// Array position is the editable order; numeric order is assigned only at the API boundary.
export function serializeTasks(
  tasks: Task[],
  template = false,
  clearStatus: string[] = [],
) {
  const orders = { general: 0, individual: 0 };
  const clearIds = new Set(clearStatus);
  return tasks
    .filter((task) => hasTaskContent(task, template))
    .map((task) => ({
      id: task.id,
      task: task.name.trim(),
      description: task.description.trim(),
      category: task.category,
      order: orders[task.category]++,
      ...(template ? { template_notes: task.templateNotes?.trim() || "" } : {}),
      ...(clearIds.has(task.id) ? { clear_status: true } : {}),
    }));
}
export function worksheetPayload(
  data: WorksheetWithTasks,
  templateId?: string | null,
  clearStatus: string[] = [],
) {
  return {
    user_id: data.userId || undefined,
    name: data.name.trim(),
    description: data.description.trim(),
    supervisor: data.supervisor || "",
    tasks: serializeTasks(data.tasks, false, clearStatus),
    template_id: templateId || undefined,
    final_challenge: data.finalChallenge?.trim() || "",
    final_challenge_description: data.finalChallengeDescription?.trim() || "",
  };
}
export function templatePayload(data: WorksheetWithTasks) {
  return {
    name: data.name.trim(),
    description: data.description.trim(),
    template_notes: data.templateNotes?.trim() || "",
    scope: data.scope!,
    tasks: serializeTasks(data.tasks, true),
    priority: data.priority ?? 0,
  };
}
export function templateRequestBody(
  data: WorksheetWithTasks,
): FormData | string {
  const payload = templatePayload(data);
  if (!(data.image instanceof File))
    return JSON.stringify({
      ...payload,
      image: data.image === null ? null : undefined,
    });
  const body = new FormData();
  body.append("image", data.image);
  for (const [key, value] of Object.entries(payload))
    body.append(
      key,
      typeof value === "object" ? JSON.stringify(value) : String(value),
    );
  return body;
}
export function modifiedStatusTasks(
  tasks: Task[],
  originals: NonNullable<EditorInitialData["tasks"]>,
): ModifiedTask[] {
  const byId = new Map(originals.map((task) => [task.id, task]));
  return tasks
    .filter((task) => hasTaskContent(task))
    .flatMap((task) => {
      const original = byId.get(task.id);
      if (
        !original ||
        original.status === undefined ||
        original.status === TaskStatus.TODO
      )
        return [];
      if (
        task.name.trim() === original.name.trim() &&
        task.description.trim() === original.description.trim()
      )
        return [];
      return [
        { id: task.id, name: task.name, originalStatus: original.status },
      ];
    });
}
export function taskMove(
  tasks: Task[],
  sourceId: string,
  category: TaskCategory,
  targetId: string | null,
  edge: DropEdge,
) {
  const from = tasks.findIndex((task) => task.id === sourceId);
  if (from < 0 || sourceId === targetId) return null;
  const remaining = tasks.filter((task) => task.id !== sourceId);
  let to: number;
  if (targetId) {
    const target = remaining.findIndex(
      (task) => task.id === targetId && task.category === category,
    );
    if (target < 0) return null;
    to = target + (edge === "bottom" ? 1 : 0);
  } else {
    const last = remaining.findLastIndex((task) => task.category === category);
    to = last < 0 ? remaining.length : last + 1;
  }
  return { from, to, category };
}

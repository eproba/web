import * as z from "zod";

export const taskSchema = z.object({
  id: z.string(),
  name: z.string().max(200, "Zadanie nie może przekraczać 200 znaków"),
  description: z
    .string()
    .max(2000, "Opis zadania nie może przekraczać 2000 znaków"),
  category: z.enum(["general", "individual"]),
  order: z.number(),
});

export const worksheetWithTasksSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, "Nazwa próby jest wymagana")
    .min(3, "Nazwa próby musi mieć co najmniej 3 znaki")
    .max(100, "Nazwa próby nie może przekraczać 100 znaków"),
  description: z.string().max(500, "Opis nie może przekraczać 500 znaków"),
  supervisor: z.string().nullable().optional(),
  userId: z.string(),
  tasks: z
    .array(taskSchema)
    .min(1, "Dodaj co najmniej jedno zadanie")
    .max(100, "Maksymalnie 50 zadań"),
});

export type Task = z.infer<typeof taskSchema>;
export type WorksheetWithTasks = z.infer<typeof worksheetWithTasksSchema>;

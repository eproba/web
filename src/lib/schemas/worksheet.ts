import * as z from "zod";

export const taskSchema = z.object({
  id: z.string(),
  name: z.string().max(200, "Zadanie nie może przekraczać 200 znaków"),
  description: z
    .string()
    .max(2000, "Opis zadania nie może przekraczać 2000 znaków"),
  category: z.enum(["general", "individual"]),
  order: z.number(),
  templateNotes: z
    .string()
    .max(1000, "Notatki szablonu nie mogą przekraczać 1000 znaków")
    .optional(),
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
  userId: z.string().nullable().optional(),
  teamId: z.string().nullable().optional(),
  organization: z.number().nullable().optional(),
  tasks: z.array(taskSchema).max(100, "Maksymalnie 100 zadań"),
  templateNotes: z
    .string()
    .max(1000, "Notatki szablonu nie mogą przekraczać 1000 znaków")
    .optional(),
  templateId: z.string().nullable().optional(),
  image: z
    .union([z.instanceof(File), z.string().url(), z.null()])
    .optional()
    .refine(
      (value) => {
        if (!value || typeof value === "string") return true;
        const allowedTypes = [
          "image/jpeg",
          "image/jpg",
          "image/png",
          "image/gif",
          "image/svg+xml",
        ];
        return allowedTypes.includes(value.type);
      },
      {
        message: "Dozwolone formaty: JPG, PNG, GIF, SVG",
      },
    )
    .refine(
      (value) => {
        if (!value || typeof value === "string") return true;
        return value.size <= 5 * 1024 * 1024; // 5MB
      },
      {
        message: "Rozmiar pliku nie może przekraczać 5MB",
      },
    ),
});

export type Task = z.infer<typeof taskSchema>;
export type WorksheetWithTasks = z.infer<typeof worksheetWithTasksSchema>;

import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  name: z
    .string()
    .max(200, { error: "Zadanie nie może przekraczać 200 znaków" }),
  description: z
    .string()
    .max(2000, { error: "Opis zadania nie może przekraczać 2000 znaków" }),
  category: z.enum(["general", "individual"]),
  order: z.number(),
  templateNotes: z
    .string()
    .max(1000, { error: "Notatki szablonu nie mogą przekraczać 1000 znaków" })
    .optional(),
});

export const worksheetWithTasksSchema = z.object({
  id: z.string().optional(),
  name: z
    .string()
    .min(1, { error: "Nazwa próby jest wymagana" })
    .min(3, { error: "Nazwa próby musi mieć co najmniej 3 znaki" })
    .max(100, { error: "Nazwa próby nie może przekraczać 100 znaków" }),
  description: z
    .string()
    .max(500, { error: "Opis nie może przekraczać 500 znaków" }),
  supervisor: z.string().nullable().optional(),
  userId: z.string().nullable().optional(),
  scope: z.enum(["team", "organization"]).optional(),
  tasks: z.array(taskSchema).max(100, { error: "Maksymalnie 100 zadań" }),
  templateNotes: z
    .string()
    .max(1000, { error: "Notatki szablonu nie mogą przekraczać 1000 znaków" })
    .optional(),
  templateId: z.string().nullable().optional(),
  image: z
    .union([z.instanceof(File), z.url(), z.null()])
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
        error: "Dozwolone formaty: JPG, PNG, GIF, SVG",
      },
    )
    .refine(
      (value) => {
        if (!value || typeof value === "string") return true;
        return value.size <= 5 * 1024 * 1024; // 5MB
      },
      {
        error: "Rozmiar pliku nie może przekraczać 5MB",
      },
    ),
  finalChallenge: z
    .string()
    .max(200, { error: "Próba końcowa nie może przekraczać 200 znaków" })
    .optional(),
  finalChallengeDescription: z
    .string()
    .max(2000, {
      error: "Opis próby końcowej nie może przekraczać 2000 znaków",
    })
    .optional(),
  priority: z.coerce
    .number({ error: "Priorytet musi być liczbą" })
    .int({ error: "Priorytet musi być liczbą całkowitą" })
    .min(0, {
      error: "Priorytet musi być większy lub równy 0",
    })
    .max(100, {
      error: "Priorytet nie może przekraczać 100",
    })
    .optional(),
});

export type Task = z.infer<typeof taskSchema>;
export type WorksheetWithTasks = z.infer<typeof worksheetWithTasksSchema>;

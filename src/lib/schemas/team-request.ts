import { z } from "zod";

export const teamRequestSchema = z.object({
  district: z.string().min(1, { error: "Okręg jest wymagany" }),
  organization: z.number(),
  teamName: z
    .string()
    .min(1, { error: "Nazwa drużyny jest wymagana" })
    .max(200, { error: "Nazwa drużyny nie może przekraczać 200 znaków" }),
  teamShortName: z
    .string()
    .min(1, { error: "Skrócona nazwa drużyny jest wymagana" })
    .max(10, {
      error: "Skrócona nazwa drużyny nie może przekraczać 10 znaków",
    }),
  functionLevel: z.number(),
  patrols: z
    .array(
      z
        .string()
        .min(1, { error: "Nazwa zastępu nie może być pusta" })
        .max(50, { error: "Nazwa zastępu nie może przekraczać 50 znaków" }),
    )
    .min(1, { error: "Dodaj przynajmniej jeden zastęp" }),
  userPatrol: z.string().optional(),
});

export type TeamRequestFormData = z.infer<typeof teamRequestSchema>;

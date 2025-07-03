import { z } from "zod";

export const teamRequestSchema = z.object({
  district: z.string().min(1, "Okręg jest wymagany"),
  organization: z.number(),
  teamName: z
    .string()
    .min(1, "Nazwa drużyny jest wymagana")
    .max(200, "Nazwa drużyny nie może przekraczać 200 znaków"),
  teamShortName: z
    .string()
    .min(1, "Skrócona nazwa drużyny jest wymagana")
    .max(10, "Skrócona nazwa drużyny nie może przekraczać 10 znaków"),
  functionLevel: z.number(),
  patrols: z
    .array(
      z
        .string()
        .min(1, "Nazwa zastępu nie może być pusta")
        .max(50, "Nazwa zastępu nie może przekraczać 50 znaków"),
    )
    .min(1, "Dodaj przynajmniej jeden zastęp"),
  userPatrol: z.string().optional(),
});

export type TeamRequestFormData = z.infer<typeof teamRequestSchema>;

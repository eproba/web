import { Team } from "@/types/team";
import { User } from "@/types/user";

export interface TeamRequest {
  id: string;
  team: Team;
  createdBy: User;
  acceptedById: string | null;
  status: "submitted" | "approved" | "rejected" | "pending_verification";
  createdAt: Date;
  notes: string;
  requestedFunctionLevel: number;
}

export const ORGANIZATION_CHOICES = [
  { value: 0, label: "Organizacja Harcerzy" },
  { value: 1, label: "Organizacja Harcerek" },
] as const;

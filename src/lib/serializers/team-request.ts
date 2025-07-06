import { TeamRequest } from "@/types/team-request";
import { ApiTeamResponse, teamSerializer } from "@/lib/serializers/team";
import { ApiUserResponse, userSerializer } from "@/lib/serializers/user";

export interface ApiTeamRequestResponse {
  id: string;
  team: ApiTeamResponse;
  created_by: ApiUserResponse;
  accepted_by_id: string | null;
  status: "submitted" | "approved" | "rejected" | "pending_verification";
  created_at: string;
  notes: string;
  requested_function_level: number;
}

export function teamRequestSerializer(
  apiResponse: ApiTeamRequestResponse,
): TeamRequest {
  return {
    id: apiResponse.id,
    team: teamSerializer(apiResponse.team),
    createdBy: userSerializer(apiResponse.created_by),
    acceptedById: apiResponse.accepted_by_id,
    status: apiResponse.status,
    createdAt: new Date(apiResponse.created_at),
    notes: apiResponse.notes,
    requestedFunctionLevel: apiResponse.requested_function_level,
  };
}

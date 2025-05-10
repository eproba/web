/* eslint-disable @typescript-eslint/no-explicit-any */

import { Organization, Patrol, Team } from "@/types/team";

export function teamSerializer(apiResponse: any): Team {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    shortName: apiResponse.short_name,
    district: apiResponse.district,
    isVerified: apiResponse.is_verified,
    organization: apiResponse.organization as Organization,
    patrols: apiResponse.patrols
      ? apiResponse.patrols.map(patrolSerializer)
      : undefined,
  };
}

export function patrolSerializer(apiResponse: any): Patrol {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    team: apiResponse.team,
  };
}

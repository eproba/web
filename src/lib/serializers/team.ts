import { Organization, Patrol, Team, District } from "@/types/team";

interface ApiDistrictResponse {
  id: string;
  name: string;
}

interface ApiTeamResponse {
  id: string;
  name: string;
  short_name: string;
  district: {
    id: string;
    name: string;
  };
  is_verified: boolean;
  organization: Organization;
  patrols?: Patrol[];
}

interface ApiPatrolResponse {
  id: string;
  name: string;
  team: string;
}

export function districtSerializer(apiResponse: ApiDistrictResponse): District {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
  };
}

export function teamSerializer(apiResponse: ApiTeamResponse): Team {
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

export function patrolSerializer(apiResponse: ApiPatrolResponse): Patrol {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    team: apiResponse.team,
  };
}

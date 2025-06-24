import {
  Gender,
  InstructorRank,
  PublicUser,
  ScoutRank,
  User,
  UserFunction,
} from "@/types/user";
import { displayNameFromUser } from "@/lib/utils";

export interface ApiUserResponse {
  id: string;
  nickname?: string | null;
  given_name?: string | null;
  first_name?: string | null;
  family_name?: string | null;
  last_name?: string | null;
  name: string;
  gender?: string | null;
  patrol?: string | null;
  patrol_name?: string | null;
  team?: string | null;
  team_name?: string | null;
  organization?: number | null;
  scout_rank: number;
  instructor_rank: number;
  function: number;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  email?: string;
  email_verified?: boolean;
  has_password?: boolean;
}

export function publicUserSerializer(apiResponse: ApiUserResponse): PublicUser {
  const gender = Gender.fromValue(apiResponse.gender ?? null);

  const scoutRank = ScoutRank.fromValue(apiResponse.scout_rank, gender);
  const instructorRank = InstructorRank.fromValue(
    apiResponse.instructor_rank,
    gender,
  );
  const combinedRank =
    [scoutRank, instructorRank]
      .filter((r) => r.value > 0)
      .map((r) => r.fullName)
      .join(" ") || "brak stopnia";

  const baseUser = {
    id: apiResponse.id,
    nickname: apiResponse.nickname ?? null,
    firstName: apiResponse.given_name ?? apiResponse.first_name ?? null,
    lastName: apiResponse.family_name ?? apiResponse.last_name ?? null,
    name: apiResponse.name,
    gender,
    patrol: apiResponse.patrol ?? null,
    patrolName: apiResponse.patrol_name ?? null,
    team: apiResponse.team ?? null,
    teamName: apiResponse.team_name ?? null,
    organization: apiResponse.organization ?? null,
    rank: combinedRank,
    scoutRank: scoutRank,
    instructorRank: instructorRank,
    function: UserFunction.fromValue(apiResponse.function, gender),
    isActive: apiResponse.is_active,
    isStaff: apiResponse.is_staff,
    isSuperuser: apiResponse.is_superuser,
  };

  return {
    ...baseUser,
    displayName: displayNameFromUser(baseUser),
  };
}

export function userSerializer(
  apiResponse: ApiUserResponse & { email?: string; email_verified?: boolean },
): User {
  const publicUser = publicUserSerializer(apiResponse);
  return {
    ...publicUser,
    email: apiResponse.email ?? "",
    emailVerified: apiResponse.email_verified ?? false,
    hasPassword: apiResponse.has_password ?? false,
  };
}

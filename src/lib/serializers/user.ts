import { Gender, PublicUser, User } from "@/types/user";

/* eslint-disable @typescript-eslint/no-explicit-any */

export function publicUserSerializer(apiResponse: any): PublicUser {
  return {
    id: apiResponse.id,
    nickname: apiResponse.nickname,
    firstName: apiResponse.given_name,
    lastName: apiResponse.family_name,
    name: apiResponse.name,
    gender: Object.values(Gender).includes(apiResponse.gender as Gender)
      ? (apiResponse.gender as Gender)
      : null,
    patrol: apiResponse.patrol,
    rank: apiResponse.rank,
    scoutRank: apiResponse.scout_rank,
    instructorRank: apiResponse.instructor_rank,
    function: apiResponse.function,
    isActive: apiResponse.is_active,
    isStaff: apiResponse.is_staff,
    isSuperuser: apiResponse.is_superuser,
  };
}

export function userSerializer(apiResponse: any): User {
  return {
    ...publicUserSerializer(apiResponse),
    email: apiResponse.email,
    emailVerified: apiResponse.email_verified,
  };
}

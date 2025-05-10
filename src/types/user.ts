export enum Gender {
  Male = 0,
  Female = 1,
  Other = 2,
}

export interface PublicUser {
  id: string;
  nickname: string | null;
  firstName: string | null;
  lastName: string | null;
  name: string;
  gender: Gender | null;
  patrol: string | null;
  rank: string;
  scoutRank: number;
  instructorRank: number;
  function: number;
  isActive: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
}

export interface User extends PublicUser {
  email: string;
  emailVerified: boolean;
}

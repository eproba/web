export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export interface User {
  id: string;
  nickname: string | null;
  firstName: string | null;
  lastName: string | null;
  name: string;
  email: string;
  emailVerified: boolean;
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

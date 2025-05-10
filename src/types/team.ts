export enum Organization {
  Male = 0,
  Female = 1,
}

export interface District {
  id: string;
  name: string;
}

export interface Team {
  id: string;
  name: string;
  shortName: string;
  district: District;
  isVerified: boolean;
  organization: Organization;
  patrols: Patrol[] | undefined;
}

export interface Patrol {
  id: string;
  name: string;
  team: string;
}

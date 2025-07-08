export interface FieldInfo<T extends string | number = string | number> {
  value: T;
  fullName: string;
  shortName: string | null;
  numberValue: number;
}

export class Gender {
  static readonly Male: FieldInfo<string> = {
    value: "male",
    fullName: "Mężczyzna",
    shortName: "M",
    numberValue: 0,
  };

  static readonly Female: FieldInfo<string> = {
    value: "female",
    fullName: "Kobieta",
    shortName: "K",
    numberValue: 1,
  };

  static readonly Other: FieldInfo<string> = {
    value: "other",
    fullName: "Inna",
    shortName: "I",
    numberValue: 2,
  };

  private static readonly genderMap = new Map(
    [Gender.Male, Gender.Female, Gender.Other].map((g) => [g.value, g]),
  );

  static fromValue(value: string | null): FieldInfo<string> | null {
    return value ? (Gender.genderMap.get(value) ?? null) : null;
  }
}

export class ScoutRank {
  private static readonly ranks = new Map<
    number,
    { male: string; female: string }
  >([
    [0, { male: "brak stopnia", female: "brak stopnia" }],
    [1, { male: "biszkopt", female: "biszkopt" }],
    [2, { male: "młodzik", female: "ochotniczka" }],
    [3, { male: "wywiadowca", female: "tropicielka" }],
    [4, { male: "ćwik", female: "samarytanka" }],
    [5, { male: "harcerz orli", female: "wędrowniczka" }],
    [
      6,
      { male: "harcerz Rzeczypospolitej", female: "harcerka Rzeczypospolitej" },
    ],
  ]);

  private static readonly shortNames = new Map<
    number,
    { male: string; female: string }
  >([
    [0, { male: "", female: "" }],
    [1, { male: "biszkopt", female: "biszkopt" }],
    [2, { male: "mł.", female: "och." }],
    [3, { male: "wyw.", female: "trop." }],
    [4, { male: "ćwik", female: "sam." }],
    [5, { male: "HO", female: "węd." }],
    [6, { male: "HR", female: "HR" }],
  ]);

  static fromValue(
    value: number,
    gender?: FieldInfo<string> | null,
  ): FieldInfo<number> {
    const normalizedValue = Math.max(0, Math.min(value, 6));
    const genderType = gender?.value === "female" ? "female" : "male";

    return {
      value: normalizedValue,
      fullName:
        ScoutRank.ranks.get(normalizedValue)?.[genderType] || "brak stopnia",
      shortName:
        ScoutRank.shortNames.get(normalizedValue)?.[genderType] || null,
      numberValue: normalizedValue,
    };
  }
}

export class InstructorRank {
  private static readonly ranks = new Map<
    number,
    { male: string; female: string }
  >([
    [0, { male: "brak stopnia", female: "brak stopnia" }],
    [1, { male: "przewodnik", female: "przewodniczka" }],
    [2, { male: "podharcmistrz", female: "podharcmistrzyni" }],
    [3, { male: "harcmistrz", female: "harcmistrzyni" }],
  ]);

  private static readonly shortNames = new Map<number, string>([
    [0, ""],
    [1, "pwd."],
    [2, "phm."],
    [3, "hm."],
  ]);

  static fromValue(
    value: number,
    gender?: FieldInfo<string> | null,
  ): FieldInfo<number> {
    const normalizedValue = Math.max(0, Math.min(value, 3));
    const genderType = gender?.value === "female" ? "female" : "male";

    return {
      value: normalizedValue,
      fullName:
        InstructorRank.ranks.get(normalizedValue)?.[genderType] ||
        "brak stopnia",
      shortName: InstructorRank.shortNames.get(normalizedValue) || null,
      numberValue: normalizedValue,
    };
  }
}

export class UserFunction {
  static readonly values = [
    { value: 0, baseName: "Druh(-na)", male: "Druh", female: "Druhna" },
    {
      value: 1,
      baseName: "Podzastępowy(-a)",
      male: "Podzastępowy",
      female: "Podzastępowa",
    },
    {
      value: 2,
      baseName: "Zastępowy(-a)",
      male: "Zastępowy",
      female: "Zastępowa",
    },
    {
      value: 3,
      baseName: "Przyboczny(-a)",
      male: "Przyboczny",
      female: "Przyboczna",
    },
    {
      value: 4,
      baseName: "Drużynowy(-a)",
      male: "Drużynowy",
      female: "Drużynowa",
    },
    {
      value: 5,
      baseName: "Wyższa funkcja",
      male: "Wyższa funkcja",
      female: "Wyższa funkcja",
    },
  ];

  private static readonly functionMap = new Map(
    this.values.map((f) => [f.value, f]),
  );

  static fromValue(
    value: number,
    gender?: FieldInfo<string> | null,
  ): FieldInfo<number> {
    const func = UserFunction.functionMap.get(value) || this.values[0];
    const genderType = gender?.value === "female" ? "female" : "male";

    return {
      value: func.value,
      fullName: func[genderType],
      shortName: null,
      numberValue: func.value,
    };
  }
}

export interface PublicUser {
  id: string;
  nickname: string | null;
  firstName: string | null;
  lastName: string | null;
  name: string;
  displayName: string;
  gender: FieldInfo<string> | null;
  patrol: string | null;
  patrolName: string | null;
  team: string | null;
  teamName: string | null;
  organization: number | null;
  rank: string;
  scoutRank: FieldInfo<number>;
  instructorRank: FieldInfo<number>;
  function: FieldInfo<number>;
  isActive: boolean;
  isStaff: boolean;
  isSuperuser: boolean;
}

export interface User extends PublicUser {
  email: string;
  emailVerified: boolean;
  emailNotifications: boolean;
  hasPassword: boolean;
}

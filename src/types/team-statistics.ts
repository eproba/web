export interface TeamInfo {
  name: string;
  shortName: string;
  district: string;
  organization: string;
  isVerified: boolean;
}

export interface OverviewStats {
  totalMembers: number;
  verifiedEmails: number;
  activeLast30Days: number;
  patrolsCount: number;
}

export interface RankCount {
  rank: string;
  rankValue: number;
  count: number;
  [key: string]: string | number;
}

export interface RankBreakdown {
  rank: string;
  rankValue: number;
  count: number;
}

export interface FunctionCount {
  function: string;
  functionValue: number;
  totalCount: number;
  rankBreakdown: RankBreakdown[];
}

export interface RankDistribution {
  scoutRanks: RankCount[];
  instructorRanks: RankCount[];
  functions: FunctionCount[];
}

export interface WorksheetProgress {
  totalWorksheets: number;
  activeWorksheets: number;
  completedWorksheets: number;
  averageCompletionRate: number;
  pendingApprovals: number;
}

export interface ActivityTrends {
  worksheetsCreatedLast7Days: number;
  worksheetsCreatedLast30Days: number;
  tasksCompletedLast7Days: number;
  tasksCompletedLast30Days: number;
}

export interface PatrolComparison {
  id: string;
  name: string;
  memberCount: number;
  worksheetCount: number;
  averageCompletionRate: number;
  averageRank: string;
}

export interface TopPerformer {
  id: string;
  name: string;
  patrol: string;
  rank: string;
  completedTasks: number;
  totalWorksheets: number;
}

export interface MemberNeedingAttention {
  id: string;
  name: string;
  patrol: string;
  rank: string;
  totalWorksheets: number;
  daysInactive: number;
}

export interface TeamStatistics {
  teamInfo: TeamInfo;
  overview: OverviewStats;
  rankDistribution: RankDistribution;
  worksheetProgress: WorksheetProgress;
  activityTrends: ActivityTrends;
  patrolComparison: PatrolComparison[];
  topPerformers: TopPerformer[];
  membersNeedingAttention: MemberNeedingAttention[];
}

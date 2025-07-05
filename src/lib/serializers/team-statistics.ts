import {
  ActivityTrends,
  FunctionCount,
  MemberNeedingAttention,
  OverviewStats,
  PatrolComparison,
  RankBreakdown,
  RankCount,
  RankDistribution,
  TeamInfo,
  TeamStatistics,
  TopPerformer,
  WorksheetProgress,
} from "@/types/team-statistics";

interface ApiTeamInfoResponse {
  name: string;
  short_name: string;
  district: string;
  organization: string;
  is_verified: boolean;
}

interface ApiOverviewStatsResponse {
  total_members: number;
  verified_emails: number;
  active_last_30_days: number;
  patrols_count: number;
}

interface ApiRankCountResponse {
  rank: string;
  rank_value: number;
  count: number;
}

interface ApiRankBreakdownResponse {
  rank: string;
  rank_value: number;
  count: number;
}

interface ApiFunctionCountResponse {
  function: string;
  function_value: number;
  total_count: number;
  rank_breakdown: ApiRankBreakdownResponse[];
}

interface ApiRankDistributionResponse {
  scout_ranks: ApiRankCountResponse[];
  instructor_ranks: ApiRankCountResponse[];
  functions: ApiFunctionCountResponse[];
}

interface ApiWorksheetProgressResponse {
  total_worksheets: number;
  active_worksheets: number;
  completed_worksheets: number;
  average_completion_rate: number;
  pending_approvals: number;
}

interface ApiActivityTrendsResponse {
  worksheets_created_last_7_days: number;
  worksheets_created_last_30_days: number;
  tasks_completed_last_7_days: number;
  tasks_completed_last_30_days: number;
}

interface ApiPatrolComparisonResponse {
  id: string;
  name: string;
  member_count: number;
  worksheet_count: number;
  average_completion_rate: number;
  average_rank: string;
}

interface ApiTopPerformerResponse {
  id: string;
  name: string;
  patrol: string;
  rank: string;
  completed_tasks: number;
  total_worksheets: number;
}

interface ApiMemberNeedingAttentionResponse {
  id: string;
  name: string;
  patrol: string;
  rank: string;
  total_worksheets: number;
  days_inactive: number;
}

export interface ApiTeamStatisticsResponse {
  team_info: ApiTeamInfoResponse;
  overview: ApiOverviewStatsResponse;
  rank_distribution: ApiRankDistributionResponse;
  worksheet_progress: ApiWorksheetProgressResponse;
  activity_trends: ApiActivityTrendsResponse;
  patrol_comparison: ApiPatrolComparisonResponse[];
  top_performers: ApiTopPerformerResponse[];
  members_needing_attention: ApiMemberNeedingAttentionResponse[];
}

export function teamInfoSerializer(apiResponse: ApiTeamInfoResponse): TeamInfo {
  return {
    name: apiResponse.name,
    shortName: apiResponse.short_name,
    district: apiResponse.district,
    organization: apiResponse.organization,
    isVerified: apiResponse.is_verified,
  };
}

export function overviewStatsSerializer(
  apiResponse: ApiOverviewStatsResponse,
): OverviewStats {
  return {
    totalMembers: apiResponse.total_members,
    verifiedEmails: apiResponse.verified_emails,
    activeLast30Days: apiResponse.active_last_30_days,
    patrolsCount: apiResponse.patrols_count,
  };
}

export function rankCountSerializer(
  apiResponse: ApiRankCountResponse,
): RankCount {
  return {
    rank: apiResponse.rank,
    rankValue: apiResponse.rank_value,
    count: apiResponse.count,
  };
}

export function rankBreakdownSerializer(
  apiResponse: ApiRankBreakdownResponse,
): RankBreakdown {
  return {
    rank: apiResponse.rank,
    rankValue: apiResponse.rank_value,
    count: apiResponse.count,
  };
}

export function functionCountSerializer(
  apiResponse: ApiFunctionCountResponse,
): FunctionCount {
  return {
    function: apiResponse.function,
    functionValue: apiResponse.function_value,
    totalCount: apiResponse.total_count,
    rankBreakdown: apiResponse.rank_breakdown.map(rankBreakdownSerializer),
  };
}

export function rankDistributionSerializer(
  apiResponse: ApiRankDistributionResponse,
): RankDistribution {
  return {
    scoutRanks: apiResponse.scout_ranks.map(rankCountSerializer),
    instructorRanks: apiResponse.instructor_ranks.map(rankCountSerializer),
    functions: apiResponse.functions.map(functionCountSerializer),
  };
}

export function worksheetProgressSerializer(
  apiResponse: ApiWorksheetProgressResponse,
): WorksheetProgress {
  return {
    totalWorksheets: apiResponse.total_worksheets,
    activeWorksheets: apiResponse.active_worksheets,
    completedWorksheets: apiResponse.completed_worksheets,
    averageCompletionRate: apiResponse.average_completion_rate,
    pendingApprovals: apiResponse.pending_approvals,
  };
}

export function activityTrendsSerializer(
  apiResponse: ApiActivityTrendsResponse,
): ActivityTrends {
  return {
    worksheetsCreatedLast7Days: apiResponse.worksheets_created_last_7_days,
    worksheetsCreatedLast30Days: apiResponse.worksheets_created_last_30_days,
    tasksCompletedLast7Days: apiResponse.tasks_completed_last_7_days,
    tasksCompletedLast30Days: apiResponse.tasks_completed_last_30_days,
  };
}

export function patrolComparisonSerializer(
  apiResponse: ApiPatrolComparisonResponse,
): PatrolComparison {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    memberCount: apiResponse.member_count,
    worksheetCount: apiResponse.worksheet_count,
    averageCompletionRate: apiResponse.average_completion_rate,
    averageRank: apiResponse.average_rank,
  };
}

export function topPerformerSerializer(
  apiResponse: ApiTopPerformerResponse,
): TopPerformer {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    patrol: apiResponse.patrol,
    rank: apiResponse.rank,
    completedTasks: apiResponse.completed_tasks,
    totalWorksheets: apiResponse.total_worksheets,
  };
}

export function memberNeedingAttentionSerializer(
  apiResponse: ApiMemberNeedingAttentionResponse,
): MemberNeedingAttention {
  return {
    id: apiResponse.id,
    name: apiResponse.name,
    patrol: apiResponse.patrol,
    rank: apiResponse.rank,
    totalWorksheets: apiResponse.total_worksheets,
    daysInactive: apiResponse.days_inactive,
  };
}

export function teamStatisticsSerializer(
  apiResponse: ApiTeamStatisticsResponse,
): TeamStatistics {
  return {
    teamInfo: teamInfoSerializer(apiResponse.team_info),
    overview: overviewStatsSerializer(apiResponse.overview),
    rankDistribution: rankDistributionSerializer(apiResponse.rank_distribution),
    worksheetProgress: worksheetProgressSerializer(
      apiResponse.worksheet_progress,
    ),
    activityTrends: activityTrendsSerializer(apiResponse.activity_trends),
    patrolComparison: apiResponse.patrol_comparison.map(
      patrolComparisonSerializer,
    ),
    topPerformers: apiResponse.top_performers.map(topPerformerSerializer),
    membersNeedingAttention: apiResponse.members_needing_attention.map(
      memberNeedingAttentionSerializer,
    ),
  };
}

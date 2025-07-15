"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TeamStatistics } from "@/types/team-statistics";
import { TrendingUpIcon } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  XAxis,
  YAxis,
} from "recharts";

const CHART_COLORS = [
  "var(--color-chart-1)",
  "var(--color-chart-2)",
  "var(--color-chart-3)",
  "var(--color-chart-4)",
  "var(--color-chart-5)",
  "var(--color-chart-6)",
  "var(--color-chart-7)",
];

// Create a consistent color mapping for ranks
const createRankColorMapping = (ranks: string[]) => {
  const sortedRanks = [...ranks].sort();
  return sortedRanks.reduce(
    (acc, rank, index) => {
      acc[rank] = CHART_COLORS[index % CHART_COLORS.length];
      return acc;
    },
    {} as Record<string, string>,
  );
};

interface ChartsProps {
  statistics: TeamStatistics;
}

export function ActivityTrendsChart({ statistics }: ChartsProps) {
  const activityTrendsConfig = {
    tasks: {
      label: "Ukończone zadania",
      color: "var(--color-chart-5)",
    },
    worksheets: {
      label: "Nowe próby",
      color: "var(--color-chart-4)",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUpIcon className="h-5 w-5" />
          Trendy aktywności
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={activityTrendsConfig}
          className="min-h-[180px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={[
              {
                name: "7 dni",
                tasks: statistics.activityTrends.tasksCompletedLast7Days,
                worksheets:
                  statistics.activityTrends.worksheetsCreatedLast7Days,
              },
              {
                name: "30 dni",
                tasks: statistics.activityTrends.tasksCompletedLast30Days,
                worksheets:
                  statistics.activityTrends.worksheetsCreatedLast30Days,
              },
            ]}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip cursor={false} content={ChartTooltipContent} />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar
              dataKey="tasks"
              fill="var(--color-tasks)"
              name="Zadania"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="worksheets"
              fill="var(--color-worksheets)"
              name="Próby"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function ScoutRanksChart({ statistics }: ChartsProps) {
  const allScoutRanks = statistics.rankDistribution.scoutRanks.map(
    (r) => r.rank,
  );
  const rankColorMapping = createRankColorMapping(allScoutRanks);

  const scoutRankConfig = statistics.rankDistribution.scoutRanks.reduce(
    (acc, rank) => {
      acc[rank.rank] = {
        label: rank.rank,
        color: rankColorMapping[rank.rank],
      };
      return acc;
    },
    {} as ChartConfig,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm sm:text-base">
          Stopnie harcerskie
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={scoutRankConfig}
          className="mx-auto aspect-square max-h-80"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={ChartTooltipContent} />
            <ChartLegend
              content={<ChartLegendContent />}
              className="flex-wrap"
            />
            <Pie
              data={statistics.rankDistribution.scoutRanks}
              dataKey="count"
              nameKey="rank"
              innerRadius={50}
              strokeWidth={10}
            >
              {statistics.rankDistribution.scoutRanks.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={rankColorMapping[entry.rank]}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function InstructorRanksChart({ statistics }: ChartsProps) {
  const instructorRankConfig =
    statistics.rankDistribution.instructorRanks.reduce((acc, rank, index) => {
      acc[rank.rank] = {
        label: rank.rank,
        color: CHART_COLORS[index % CHART_COLORS.length],
      };
      return acc;
    }, {} as ChartConfig);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm sm:text-base">
          Stopnie instruktorskie
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={instructorRankConfig}
          className="mx-auto aspect-square max-h-80"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={ChartTooltipContent} />
            <ChartLegend
              content={<ChartLegendContent />}
              className="flex-wrap"
            />
            <Pie
              data={statistics.rankDistribution.instructorRanks}
              dataKey="count"
              nameKey="rank"
              innerRadius={60}
              strokeWidth={5}
            >
              {statistics.rankDistribution.instructorRanks.map(
                (entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CHART_COLORS[index % CHART_COLORS.length]}
                  />
                ),
              )}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function FunctionsChart({ statistics }: ChartsProps) {
  const transformedData = statistics.rankDistribution.functions.map(
    (functionData) => {
      const baseData: Record<string, string | number> = {
        function: functionData.function,
        totalCount: functionData.totalCount,
      };

      functionData.rankBreakdown.forEach((rank) => {
        baseData[rank.rank] = rank.count;
      });

      return baseData;
    },
  );

  const allRanks = Array.from(
    new Set(
      statistics.rankDistribution.functions.flatMap((f) =>
        f.rankBreakdown.map((r) => r.rank),
      ),
    ),
  );

  // Get all scout ranks to create consistent color mapping
  const allScoutRanks = statistics.rankDistribution.scoutRanks.map(
    (r) => r.rank,
  );
  const rankColorMapping = createRankColorMapping(allScoutRanks);

  const functionsConfig = allRanks.reduce((acc, rank) => {
    acc[rank] = {
      label: rank,
      color:
        rankColorMapping[rank] ||
        CHART_COLORS[allRanks.indexOf(rank) % CHART_COLORS.length],
    };
    return acc;
  }, {} as ChartConfig);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm sm:text-base">
          Stopnie dla funkcji
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={functionsConfig}
          className="h-full min-h-80 w-full"
        >
          <BarChart
            accessibilityLayer
            data={transformedData}
            margin={{ top: 10, right: 10, left: 10, bottom: 60 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="function"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              angle={-45}
              textAnchor="end"
              height={40}
              interval={0}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              allowDecimals={false}
            />
            <ChartTooltip content={ChartTooltipContent} />
            {allRanks.map((rank) => (
              <Bar
                key={rank}
                dataKey={rank}
                stackId="ranks"
                fill={functionsConfig[rank].color}
                radius={
                  rank === allRanks[allRanks.length - 1]
                    ? [2, 2, 0, 0]
                    : [0, 0, 0, 0]
                }
              />
            ))}
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function PatrolComparisonChart({ statistics }: ChartsProps) {
  const patrolComparisonConfig = {
    memberCount: {
      label: "Członkowie",
    },
    worksheetCount: {
      label: "Próby",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm sm:text-base">
          Porównanie zastępów
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={patrolComparisonConfig}
          className="h-full min-h-80 w-full"
        >
          <BarChart
            accessibilityLayer
            data={statistics.patrolComparison}
            margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="name"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
            />
            <YAxis tickLine={false} axisLine={false} tickMargin={8} />
            <ChartTooltip content={ChartTooltipContent} />
            <Bar
              dataKey="memberCount"
              fill="var(--color-chart-1)"
              name="Członkowie"
              radius={[2, 2, 0, 0]}
            />
            <Bar
              dataKey="worksheetCount"
              fill="var(--color-chart-2)"
              name="Próby"
              radius={[2, 2, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

export function PatrolPerformanceRadarChart({ statistics }: ChartsProps) {
  const patrolPerformanceConfig = {
    averageCompletionRate: {
      label: "Poziom ukończenia",
    },
  } satisfies ChartConfig;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm sm:text-base">
          Ukończenie zadań w zastępach
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={patrolPerformanceConfig}
          className="w-full sm:min-h-80"
        >
          <RadarChart data={statistics.patrolComparison}>
            <ChartTooltip content={ChartTooltipContent} />
            <PolarAngleAxis dataKey="name" />
            <PolarGrid />
            <Radar
              dataKey="averageCompletionRate"
              fill="var(--color-chart-3)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

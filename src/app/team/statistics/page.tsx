import { StatisticsAISummary } from "@/components/team/statistics/statistics-ai-summary";
import {
  ActivityTrendsChart,
  FunctionsChart,
  InstructorRanksChart,
  PatrolComparisonChart,
  PatrolPerformanceRadarChart,
  ScoutRanksChart,
} from "@/components/team/statistics/statistics-charts";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchTeamStatistics } from "@/lib/server-api";
import {
  ActivityIcon,
  AlertTriangleIcon,
  AwardIcon,
  BarChartIcon,
  FileTextIcon,
  ShieldOffIcon,
  SparklesIcon,
  TargetIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Statystyki drużyny",
};

export default async function TeamStatisticsPage() {
  const { data: statistics, error } = await fetchTeamStatistics();

  if (error) {
    return error;
  }

  if (!statistics) {
    return (
      <Alert>
        <AlertDescription>
          Brak danych statystycznych do wyświetlenia.
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold">Statystyki Drużyny</h1>
          <p className="text-muted-foreground mt-1">
            {statistics.teamInfo.name} ({statistics.teamInfo.shortName})
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {!statistics.teamInfo.isVerified && (
            <Badge>
              <>
                <ShieldOffIcon className="mr-1 h-3 w-3" />
                Niezweryfikowana
              </>
            </Badge>
          )}
          <Badge variant="outline">{statistics.teamInfo.district}</Badge>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Wszyscy członkowie
            </CardTitle>
            <UsersIcon className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statistics.overview.totalMembers}
            </div>
            <p className="text-muted-foreground text-xs">
              {statistics.overview.verifiedEmails} zweryfikowanych emaili
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Aktywni (30 dni)
            </CardTitle>
            <ActivityIcon className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statistics.overview.activeLast30Days}
            </div>
            <p className="text-muted-foreground text-xs">
              {Math.round(
                (statistics.overview.activeLast30Days /
                  statistics.overview.totalMembers) *
                  100,
              )}
              % członków
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Zastępy</CardTitle>
            <UsersIcon className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statistics.overview.patrolsCount}
            </div>
            <p className="text-muted-foreground text-xs">
              Średnio{" "}
              {Math.round(
                statistics.overview.totalMembers /
                  statistics.overview.patrolsCount,
              )}{" "}
              {(() => {
                const count = Math.round(
                  statistics.overview.totalMembers /
                    statistics.overview.patrolsCount,
                );
                if (count === 1) return "osoba";
                if (
                  count % 10 >= 2 &&
                  count % 10 <= 4 &&
                  (count % 100 < 12 || count % 100 > 14)
                )
                  return "osoby";
              })()}
              /zastęp
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ukończenie prób
            </CardTitle>
            <TargetIcon className="text-muted-foreground size-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statistics.worksheetProgress.averageCompletionRate.toFixed(1)}%
            </div>
            <p className="text-muted-foreground text-xs">
              Średni poziom ukończenia
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="flex h-auto w-full flex-wrap justify-between gap-2">
          <TabsTrigger value="overview">
            <BarChartIcon className="size-4" />
            <span className="hidden sm:block">Przegląd</span>
          </TabsTrigger>
          <TabsTrigger value="ranks">
            <AwardIcon className="size-4" />
            <span className="hidden sm:block">Stopnie</span>
          </TabsTrigger>
          <TabsTrigger value="patrols">
            <UsersIcon className="size-4" />
            <span className="hidden sm:block">Zastępy</span>
          </TabsTrigger>
          <TabsTrigger value="performance">
            <ActivityIcon className="size-4" />
            <span className="hidden sm:block">Aktywność</span>
          </TabsTrigger>
          <TabsTrigger value="ai-summary">
            <SparklesIcon className="size-4" />
            <span className="hidden sm:block">Podsumowanie</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* Worksheet Progress */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileTextIcon className="size-5" />
                  Postęp prób
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Aktywne próby</span>
                    <span>{statistics.worksheetProgress.activeWorksheets}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Wszystkie próby</span>
                    <span>{statistics.worksheetProgress.totalWorksheets}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Ukończone próby</span>
                    <span>
                      {statistics.worksheetProgress.completedWorksheets}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Zadania oczekujące na zatwierdzenie</span>
                    <span>{statistics.worksheetProgress.pendingApprovals}</span>
                  </div>
                </div>
                <Progress
                  value={statistics.worksheetProgress.averageCompletionRate}
                  className="h-2"
                />
                <p className="text-muted-foreground text-xs">
                  Średni poziom ukończenia:{" "}
                  {statistics.worksheetProgress.averageCompletionRate.toFixed(
                    1,
                  )}
                  %
                </p>
              </CardContent>
            </Card>

            {/* Activity Trends */}
            <ActivityTrendsChart statistics={statistics} />
          </div>
        </TabsContent>

        <TabsContent value="ranks" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
            <ScoutRanksChart statistics={statistics} />
            <InstructorRanksChart statistics={statistics} />
            <FunctionsChart statistics={statistics} />
          </div>
        </TabsContent>

        <TabsContent value="patrols" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            <PatrolComparisonChart statistics={statistics} />
            <PatrolPerformanceRadarChart statistics={statistics} />
          </div>

          {/* Patrol Details Table */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm sm:text-base">
                Szczegóły zastępów
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Zastęp</TableHead>
                    <TableHead>Członkowie</TableHead>
                    <TableHead>Aktywne próby</TableHead>
                    <TableHead>Średni poziom ukończenia</TableHead>
                    <TableHead>Średni stopień</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {statistics.patrolComparison.map((patrol) => (
                    <TableRow key={patrol.id}>
                      <TableCell>{patrol.name}</TableCell>
                      <TableCell>{patrol.memberCount}</TableCell>
                      <TableCell>{patrol.worksheetCount}</TableCell>
                      <TableCell>
                        {patrol.averageCompletionRate.toFixed(1)}%
                      </TableCell>
                      <TableCell>{patrol.averageRank}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrophyIcon className="size-5" />
                  Najbardziej aktywni
                </CardTitle>
                <CardDescription>
                  Członkowie, którzy ukończyli najwięcej zadań w ciągu ostatnich
                  90 dni.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {statistics.topPerformers
                    .sort((a, b) => b.completedTasks - a.completedTasks)
                    .map((performer) => (
                      <div
                        key={performer.id}
                        className="bg-muted flex items-center justify-between rounded-lg p-3"
                      >
                        <div>
                          <Link
                            className="font-medium"
                            href={`/profile/${performer.id}`}
                          >
                            {performer.name}
                          </Link>
                          <div className="text-muted-foreground text-sm">
                            {performer.patrol} • {performer.rank}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            {performer.completedTasks}{" "}
                            {(() => {
                              const count = performer.completedTasks;
                              if (count === 1) return "zadanie";
                              if (
                                count % 10 >= 2 &&
                                count % 10 <= 4 &&
                                (count % 100 < 12 || count % 100 > 14)
                              )
                                return "zadania";
                              return "zadań";
                            })()}
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {performer.totalWorksheets}{" "}
                            {(() => {
                              const count = performer.totalWorksheets;
                              if (count === 1) return "próba";
                              if (
                                count % 10 >= 2 &&
                                count % 10 <= 4 &&
                                (count % 100 < 12 || count % 100 > 14)
                              )
                                return "próby";
                              return "prób";
                            })()}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>

            {/* Members Needing Attention */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangleIcon className="size-5" />
                  Wymagają uwagi
                </CardTitle>
                <CardDescription>
                  Członkowie, którzy nie wykonali żadnego zadania w ciągu
                  ostatnich 90 dni.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {statistics.membersNeedingAttention
                    .sort((a, b) => b.daysInactive - a.daysInactive)
                    .map((member) => (
                      <div
                        key={member.id}
                        className="bg-muted flex items-center justify-between rounded-lg p-3"
                      >
                        <div>
                          <Link
                            className="font-medium"
                            href={`/profile/${member.id}`}
                          >
                            {member.name}
                          </Link>
                          <div className="text-muted-foreground text-sm">
                            {member.patrol} • {member.rank}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            -{member.daysInactive} dni
                          </div>
                          <div className="text-muted-foreground text-xs">
                            {member.totalWorksheets}{" "}
                            {(() => {
                              const count = member.totalWorksheets;
                              if (count === 1) return "próba";
                              if (
                                count % 10 >= 2 &&
                                count % 10 <= 4 &&
                                (count % 100 < 12 || count % 100 > 14)
                              )
                                return "próby";
                              return "prób";
                            })()}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="ai-summary" className="space-y-4">
          <StatisticsAISummary statistics={statistics} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

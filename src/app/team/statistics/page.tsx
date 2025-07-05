import { getTeamStatistics } from "@/lib/server-api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  ActivityTrendsChart,
  FunctionsChart,
  InstructorRanksChart,
  PatrolComparisonChart,
  PatrolPerformanceRadarChart,
  ScoutRanksChart,
} from "@/components/team/statistics-charts";
import {
  ActivityIcon,
  AlertTriangleIcon,
  AwardIcon,
  BarChartIcon,
  FileTextIcon,
  ShieldOffIcon,
  TargetIcon,
  TrophyIcon,
  UsersIcon,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default async function TeamStatisticsPage() {
  const { data: statistics, error } = await getTeamStatistics();

  if (error) {
    return error;
  }

  if (!statistics) {
    return (
      <div className="container mx-auto p-6">
        <Alert>
          <AlertDescription>
            Brak danych statystycznych do wyświetlenia.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Statystyki Drużyny</h1>
          <p className="text-muted-foreground mt-1">
            {statistics.teamInfo.name} ({statistics.teamInfo.shortName})
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {!statistics.teamInfo.isVerified && (
            <Badge>
              <>
                <ShieldOffIcon className="h-3 w-3 mr-1" />
                Niezweryfikowana
              </>
            </Badge>
          )}
          <Badge variant="outline">{statistics.teamInfo.district}</Badge>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Wszyscy członkowie
            </CardTitle>
            <UsersIcon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statistics.overview.totalMembers}
            </div>
            <p className="text-xs text-muted-foreground">
              {statistics.overview.verifiedEmails} zweryfikowanych emaili
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Aktywni (30 dni)
            </CardTitle>
            <ActivityIcon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statistics.overview.activeLast30Days}
            </div>
            <p className="text-xs text-muted-foreground">
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
            <UsersIcon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statistics.overview.patrolsCount}
            </div>
            <p className="text-xs text-muted-foreground">
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
            <TargetIcon className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {statistics.worksheetProgress.averageCompletionRate.toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Średni poziom ukończenia
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto gap-1">
          <TabsTrigger value="overview">
            <BarChartIcon className="size-4" />
            Przegląd
          </TabsTrigger>
          <TabsTrigger value="ranks">
            <AwardIcon className="size-4" />
            Stopnie
          </TabsTrigger>
          <TabsTrigger value="patrols">
            <UsersIcon className="size-4 " />
            Zastępy
          </TabsTrigger>
          <TabsTrigger value="performance">
            <ActivityIcon className="size-4 " />
            Aktywność
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
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
                <p className="text-xs text-muted-foreground">
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
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            <ScoutRanksChart statistics={statistics} />
            <InstructorRanksChart statistics={statistics} />
            <FunctionsChart statistics={statistics} />
          </div>
        </TabsContent>

        <TabsContent value="patrols" className="space-y-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
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
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
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
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{performer.name}</div>
                          <div className="text-sm text-muted-foreground">
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
                          <div className="text-xs text-muted-foreground">
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
                        className="flex items-center justify-between p-3 bg-muted rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {member.patrol} • {member.rank}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">
                            -{member.daysInactive} dni
                          </div>
                          <div className="text-xs text-muted-foreground">
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
      </Tabs>
    </div>
  );
}

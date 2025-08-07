"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import {
  MemberNeedingAttention,
  TeamStatistics,
  TopPerformer,
} from "@/types/team-statistics";
import { useCompletion } from "@ai-sdk/react";
import { SparklesIcon } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";
import Markdown from "react-markdown";

function buildUserMap(statistics: TeamStatistics): Record<string, string> {
  const map: Record<string, string> = {};
  [
    ...(statistics.topPerformers ?? []),
    ...(statistics.membersNeedingAttention ?? []),
  ].forEach((user) => {
    map[user.id] = user.name;
  });
  return map;
}

function redactStatistics(statistics: TeamStatistics): TeamStatistics {
  const redactName = (user: TopPerformer | MemberNeedingAttention) => ({
    ...user,
    name: `<userId:${user.id}>`,
  });

  return {
    ...statistics,
    topPerformers: statistics.topPerformers?.map(
      redactName,
    ) as unknown as TopPerformer[],
    membersNeedingAttention: statistics.membersNeedingAttention?.map(
      redactName,
    ) as unknown as MemberNeedingAttention[],
  };
}

function restoreNames(
  summary: string,
  userMap: Record<string, string>,
): string {
  return summary.replace(/<userId:([a-f0-9-]+)>/g, (_, id) =>
    userMap[id] ? `[${userMap[id]}](/profile/${id})` : `<userId:${id}>`,
  );
}

export function StatisticsAISummary({
  statistics,
}: {
  statistics: TeamStatistics;
}) {
  const userMap = buildUserMap(statistics);

  const {
    completion: summary,
    complete,
    isLoading,
  } = useCompletion({
    api: "/ai/api/team-stats",
  });

  useEffect(() => {
    const fetchSummary = async () => {
      await complete(JSON.stringify(redactStatistics(statistics)));
    };
    fetchSummary();
  }, [complete, statistics]);

  const restoredSummary = summary ? restoreNames(summary, userMap) : "";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SparklesIcon
            className={cn("size-5", isLoading && "animate-bounce")}
          />
          Podsumowanie AI
        </CardTitle>
      </CardHeader>
      <CardContent>
        {restoredSummary ? (
          <div className="space-y-4">
            <Markdown
              components={{
                a: ({ ...props }) => (
                  <Link
                    {...props}
                    href={props.href || ""}
                    className="hover:underline"
                  />
                ),
              }}
            >
              {restoredSummary}
            </Markdown>
          </div>
        ) : isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : (
          <p className="text-muted-foreground">
            Nie udało się wygenerować podsumowania. Spróbuj ponownie później.
          </p>
        )}
      </CardContent>
    </Card>
  );
}

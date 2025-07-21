"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { TeamStatistics } from "@/types/team-statistics";
import { SparklesIcon } from "lucide-react";
import { useEffect, useState } from "react";
import Markdown from "react-markdown";

export function StatisticsAISummary({
  statistics,
}: {
  statistics: TeamStatistics;
}) {
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const fetchSummary = async () => {
      setIsLoading(true);
      setSummary("Ładowanie podsumowania AI...");
      setError(null);
      try {
        const res = await fetch("/ai/api/team-stats", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ statistics }),
        });
        if (!res.ok) throw new Error(await res.text());
        const text = await res.text();
        if (isMounted) setSummary(text);
      } catch (err) {
        console.error("Error fetching AI summary:", err);
        if (isMounted) setError("Błąd generowania podsumowania AI");
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };
    fetchSummary();
    return () => {
      isMounted = false;
    };
  }, [statistics]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <SparklesIcon className="size-5" />
          Podsumowanie AI
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
          </div>
        ) : error ? (
          <div className="text-destructive">{error}</div>
        ) : (
          <Markdown>{summary}</Markdown>
        )}
      </CardContent>
    </Card>
  );
}

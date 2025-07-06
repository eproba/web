"use client";
import { Task, Worksheet } from "@/types/worksheet";
import { Input } from "@/components/ui/input";
import { WorksheetItem } from "@/components/worksheets/worksheet-item";
import { useCallback, useMemo, useState } from "react";
import { useDebouncedCallback } from "@/lib/hooks/use-debounced-callback";
import Fuse from "fuse.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "@/types/user";
import { LoaderCircleIcon, SearchIcon } from "lucide-react";
import { CreateWorksheetButton } from "@/components/worksheets/create-worksheet-button";

export function WorksheetList({
  orgWorksheets,
  variant = "user",
  showFilters = false,
  patrols = [],
  currentUser,
}: {
  orgWorksheets: Worksheet[];
  variant?: "user" | "managed" | "shared" | "archived" | "review";
  showFilters?: boolean;
  patrols?: Record<string, string>[];
  currentUser?: User;
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [selectedPatrol, setSelectedPatrol] = useState<string>("null");
  const [worksheets, setWorksheets] = useState<Worksheet[]>(orgWorksheets);
  const [isFiltering, setIsFiltering] = useState(false);

  const debouncedSearch = useDebouncedCallback((query: string) => {
    setDebouncedSearchQuery(query);
    setIsFiltering(false);
  }, 300);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setSearchQuery(value);
      if (value) {
        setIsFiltering(true);
      } else {
        setIsFiltering(false);
      }
      debouncedSearch(value);
    },
    [debouncedSearch],
  );

  const handlePatrolChange = useCallback((value: string) => {
    setSelectedPatrol(value);
    setIsFiltering(true);

    // Show loading state briefly for better UX
    const timer = setTimeout(() => {
      setIsFiltering(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  function updateTask(worksheetId: string, task: Task) {
    setWorksheets((prevWorksheets) =>
      prevWorksheets.map((w) => {
        if (w.id === worksheetId) {
          return {
            ...w,
            tasks: w.tasks.map((t) => (t.id === task.id ? task : t)),
          };
        }
        return w;
      }),
    );
  }

  function updateWorksheet(worksheet: Worksheet) {
    setWorksheets((prevWorksheets) =>
      prevWorksheets.map((w) => (w.id === worksheet.id ? worksheet : w)),
    );
  }

  function deleteWorksheet(worksheetId: string) {
    setWorksheets((prevWorksheets) =>
      prevWorksheets.filter((w) => w.id !== worksheetId),
    );
  }

  const filteredWorksheets = useMemo(() => {
    let filteredByPatrol = worksheets;
    if (selectedPatrol !== "null") {
      filteredByPatrol = worksheets.filter(
        (worksheet) => worksheet.user?.patrol === selectedPatrol,
      );
    }

    if (!debouncedSearchQuery) {
      return filteredByPatrol;
    }

    const fuseOptions = {
      keys: [
        "name",
        "description",
        "user.id",
        "tasks.name",
        "tasks.description",
      ],
      threshold: 0.4, // Lower threshold = stricter matching
      ignoreLocation: true,
      findAllMatches: true,
    };

    const fuse = new Fuse(filteredByPatrol, fuseOptions);
    const searchResults = fuse.search(debouncedSearchQuery);

    return searchResults.map((result) => result.item);
  }, [worksheets, debouncedSearchQuery, selectedPatrol]);

  return (
    <div className="space-y-4">
      {showFilters ? (
        <div className="flex items-center justify-between gap-2">
          <div className="relative">
            <SearchIcon className="size-4 text-muted-foreground absolute left-3 top-1/2 transform -translate-y-1/2" />
            <Input
              type="text"
              placeholder="Wyszukaj próbę"
              className="max-w-xs pl-10 pr-10"
              value={searchQuery}
              onChange={handleSearchChange}
            />
            {isFiltering && searchQuery && (
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="animate-spin size-4 border-2 border-muted-foreground border-t-transparent rounded-full" />
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Select onValueChange={handlePatrolChange} value={selectedPatrol}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Wybierz zastęp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="null">Wszystkie</SelectItem>
                {patrols.map((patrol) => (
                  <SelectItem key={patrol.id} value={patrol.id}>
                    {patrol.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {(variant === "managed" || variant === "user") && (
              <CreateWorksheetButton size="icon" />
            )}
          </div>
        </div>
      ) : variant === "managed" || variant === "user" ? (
        <div className="flex justify-end">
          <CreateWorksheetButton />
        </div>
      ) : null}

      {showFilters && isFiltering && (
        <div className="mb-4 flex items-center gap-2">
          <p className="text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <LoaderCircleIcon className="size-4 animate-spin" />
              Filtrowanie...
            </span>
          </p>
        </div>
      )}

      {isFiltering ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-card rounded-lg p-6 shadow-md">
              <div className="space-y-4">
                {/* Header section */}
                <div className="flex w-full justify-between items-center gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <Skeleton className="size-10 rounded-md" />
                    <div className="space-y-2">
                      <Skeleton className="h-6 w-48" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <Skeleton className="h-8 w-20" />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>

                {/* Supervisor info */}
                <Skeleton className="h-4 w-40" />

                {/* Last updated */}
                <Skeleton className="h-3 w-52" />

                {/* Task table skeleton */}
                <div className="mt-4 space-y-2">
                  <div>
                    {/* Table header */}
                    <div className="flex items-center justify-between p-3 border-b">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-12" />
                    </div>
                    {/* Table rows */}
                    {[...Array(5)].map((_, rowIndex) => (
                      <div
                        key={rowIndex}
                        className="flex items-center justify-between p-3 border-b last:border-b-0"
                      >
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : filteredWorksheets.length === 0 ? (
        variant === "review" ? (
          <Card>
            <CardHeader>
              <CardTitle>Nie masz żadnych zadań do sprawdzenia.</CardTitle>
            </CardHeader>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>
                Nie znaleziono prób pasujących do podanych kryteriów.
              </CardTitle>
            </CardHeader>
            {variant !== "archived" && (
              <CardContent>
                <CreateWorksheetButton />
              </CardContent>
            )}
          </Card>
        )
      ) : (
        filteredWorksheets
          .sort(
            (a, b) =>
              new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
          )
          .map((worksheet) => (
            <WorksheetItem
              key={worksheet.id}
              worksheet={worksheet}
              variant={variant}
              updateTask={updateTask}
              updateWorksheet={updateWorksheet}
              deleteWorksheet={() => deleteWorksheet(worksheet.id)}
              currentUser={currentUser}
            />
          ))
      )}
    </div>
  );
}

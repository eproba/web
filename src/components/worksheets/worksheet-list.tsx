"use client";
import { Task, Worksheet } from "@/types/worksheet";
import { Input } from "@/components/ui/input";
import { WorksheetItem } from "@/components/worksheets/worksheet-item";
import { useMemo, useState } from "react";
import { useDebounce } from "use-debounce";
import Fuse from "fuse.js";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User } from "@/types/user";
import { SearchIcon } from "lucide-react";

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
  const [debouncedSearchQuery] = useDebounce(searchQuery, 400);
  const [selectedPatrol, setSelectedPatrol] = useState<string>("null");
  const [worksheets, setWorksheets] = useState<Worksheet[]>(orgWorksheets);

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
      {showFilters && (
        <div className="flex items-center justify-between gap-2">
          <Input
            type="text"
            placeholder="Wyszukaj próbę"
            containerClassName="max-w-xs"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            startIcon={SearchIcon}
          />
          <Select onValueChange={setSelectedPatrol} value={selectedPatrol}>
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
        </div>
      )}
      {filteredWorksheets.length === 0 ? (
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
            <CardContent>{/*TODO: Add create worksheet button */}</CardContent>
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
              deleteWorksheet={() => deleteWorksheet(worksheet.id)}
              currentUser={currentUser}
            />
          ))
      )}
    </div>
  );
}

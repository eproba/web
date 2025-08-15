"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { WorksheetEditor } from "@/components/worksheets/editor/worksheet-editor";
import { cn } from "@/lib/utils";
import { TemplateWorksheet } from "@/types/template";
import { User } from "@/types/user";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { v4 as uuid } from "uuid";

export const CreateWorksheetFromTemplate = ({
  template,
  redirectTo,
  currentUser,
}: {
  template: TemplateWorksheet;
  redirectTo?: string;
  currentUser: User;
}) => {
  const [ignoredTasks, setIgnoredTasks] = useState<string[]>(
    template.taskGroups.flatMap((g) => g.tasks || []),
  );
  const [showTasksSelection, setShowTasksSelection] = useState(
    template.taskGroups.length > 0,
  );
  const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

  const taskNoun = (n: number) => {
    const abs = Math.abs(n);
    const mod10 = abs % 10;
    const mod100 = abs % 100;
    if (mod10 === 1 && mod100 !== 11) return "zadanie";
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14))
      return "zadania";
    return "zadań";
  };

  const requirementText = (min: number, max: number) => {
    const hasMin = min > 0;
    const hasMax = max > 0;
    if (hasMin && hasMax) {
      if (min === max) return `Wymagania: ${min} ${taskNoun(min)}`;
      return `Wymagania: min ${min} ${taskNoun(min)}, max ${max} ${taskNoun(max)}`;
    }
    if (hasMin) return `Wymagania: min ${min} ${taskNoun(min)}`;
    if (hasMax) return `Wymagania: max ${max} ${taskNoun(max)}`;
    return "Wymagania: dowolna liczba zadań";
  };

  const groups = template.taskGroups || [];
  const totalGroups = groups.length;
  const currentGroup = groups[currentGroupIndex];

  const currentGroupStats = useMemo(() => {
    if (!currentGroup)
      return { total: 0, selected: 0, min: 0, max: 0, valid: true };
    const groupTaskIds = currentGroup.tasks;
    const total = groupTaskIds.length;
    const selected = groupTaskIds.filter(
      (id) => !ignoredTasks.includes(id),
    ).length;
    const min = Math.max(0, currentGroup.minTasks || 0);
    const rawMax = currentGroup.maxTasks || 0;
    const max = rawMax > 0 ? rawMax : Infinity;
    const valid = selected >= min && selected <= max;
    return { total, selected, min, max, valid };
  }, [currentGroup, ignoredTasks]);

  return (
    <div className="space-y-4">
      <Card className="py-0">
        <div className="flex items-center">
          {template?.image && (
            <Image
              src={template.image}
              alt={template.name}
              width={48}
              height={48}
              className="m-2 size-12 rounded-md object-cover dark:grayscale dark:invert"
            />
          )}
          <div className={cn("my-4", !template?.image && "mx-6")}>
            <CardTitle>{template?.name}</CardTitle>
            <CardDescription>
              <span className="hidden sm:inline">
                Ten szablon zostanie użyty do stworzenia nowej próby. Możesz ją
                edytować i dostosować do swoich potrzeb.
              </span>
              <span className="inline sm:hidden">
                Tworzysz próbę z tego szablonu.
              </span>
            </CardDescription>
          </div>
        </div>
      </Card>
      {showTasksSelection ? (
        <Card>
          <CardHeader>
            <CardTitle>Wybierz zadania z grup</CardTitle>
            <CardDescription>
              Ten szablon zawiera zadania podzielone na grupy. Wybierz, które z
              nich chcesz uwzględnić w tej próbie, będziesz mógł je edytować
              później.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {totalGroups > 0 && currentGroup && (
              <>
                {totalGroups > 1 ? (
                  <>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="text-muted-foreground text-sm">
                        Krok {currentGroupIndex + 1} z {totalGroups}
                      </div>
                      <div className="text-sm">
                        {requirementText(
                          currentGroup.minTasks,
                          currentGroup.maxTasks,
                        )}
                      </div>
                    </div>
                    <Progress
                      value={((currentGroupIndex + 1) / totalGroups) * 100}
                    />
                  </>
                ) : (
                  <div className="text-right text-sm">
                    {requirementText(
                      currentGroup.minTasks,
                      currentGroup.maxTasks,
                    )}
                  </div>
                )}

                <div className="space-y-2">
                  <h3 className="text-base font-semibold">
                    {currentGroup.name}
                  </h3>
                  {currentGroup.description && (
                    <p className="text-muted-foreground text-sm">
                      {currentGroup.description}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  {currentGroup.tasks.map((taskId) => {
                    const task = template.tasks.find((t) => t.id === taskId);
                    const checkboxId = `task-${currentGroup.id}-${taskId}`;
                    const selected = !ignoredTasks.includes(taskId);
                    return (
                      <div
                        key={taskId}
                        className="flex items-start gap-3 rounded-md border p-3"
                      >
                        <Checkbox
                          id={checkboxId}
                          checked={selected}
                          onCheckedChange={(checked) => {
                            const isSelected = Boolean(checked);
                            if (isSelected) {
                              setIgnoredTasks((prev) =>
                                prev.filter((id) => id !== taskId),
                              );
                            } else {
                              setIgnoredTasks((prev) =>
                                prev.includes(taskId)
                                  ? prev
                                  : [...prev, taskId],
                              );
                            }
                          }}
                        />
                        <Label
                          htmlFor={checkboxId}
                          className="flex-1 cursor-pointer"
                        >
                          <div className="leading-none font-medium">
                            {task?.name || `Zadanie ${taskId}`}
                          </div>
                          {task?.description && (
                            <p className="text-muted-foreground mt-1 text-sm">
                              {task.description}
                            </p>
                          )}
                        </Label>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-center justify-between pt-2 text-sm">
                  <div className="text-muted-foreground">
                    Wybrano {currentGroupStats.selected} z{" "}
                    {currentGroupStats.total}
                  </div>
                  {!currentGroupStats.valid && (
                    <div className="text-destructive">
                      {currentGroupStats.selected < currentGroupStats.min
                        ? `Wybierz co najmniej ${currentGroupStats.min} ${taskNoun(currentGroupStats.min)}.`
                        : currentGroup.maxTasks > 0 &&
                            currentGroupStats.selected >
                              (currentGroup.maxTasks || 0)
                          ? `Wybierz nie więcej niż ${currentGroup.maxTasks} ${taskNoun(currentGroup.maxTasks || 0)}.`
                          : ""}
                    </div>
                  )}
                </div>
              </>
            )}
          </CardContent>
          <CardFooter className="justify-between">
            <Button
              variant="outline"
              onClick={() => setCurrentGroupIndex((i) => Math.max(0, i - 1))}
              disabled={currentGroupIndex === 0}
            >
              Wstecz
            </Button>
            <Button
              onClick={() => {
                const isLast = currentGroupIndex === totalGroups - 1;
                if (isLast) {
                  setShowTasksSelection(false);
                } else {
                  setCurrentGroupIndex((i) => Math.min(totalGroups - 1, i + 1));
                }
              }}
              disabled={!currentGroupStats.valid}
            >
              {currentGroupIndex === totalGroups - 1
                ? "Przejdź do edycji"
                : "Dalej"}
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <WorksheetEditor
          mode="create"
          redirectTo={redirectTo || `/worksheets/templates#${template.id}`}
          initialData={{
            ...template,
            templateId: template.id,
            tasks: (template?.tasks || [])
              .filter((task) => !ignoredTasks.includes(task.id))
              .map((task) => ({
                ...task,
                id: uuid(),
              })),
          }}
          currentUser={currentUser}
        />
      )}
    </div>
  );
};

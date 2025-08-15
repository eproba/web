import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useApi } from "@/lib/api-client";
import { ToastMsg } from "@/lib/toast-msg";
import { romanize } from "@/lib/utils";
import { TemplateTask, TemplateWorksheet } from "@/types/template";
import { Task, TaskStatus, Worksheet } from "@/types/worksheet";
import { ArchiveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment } from "react";
import { toast } from "react-toastify";

import { TaskTableRow } from "./task-table-row";

export function TaskTable({
  worksheet,
  variant,
  updateTask,
  removeWorksheet,
}:
  | {
      worksheet: Worksheet;
      variant: "user" | "managed" | "shared" | "archived" | "review";
      updateTask?: (task: Task) => void;
      removeWorksheet?: (worksheetId: string) => void;
    }
  | {
      worksheet: TemplateWorksheet;
      variant: "template";
      updateTask?: (task: Task) => void;
      removeWorksheet?: (worksheetId: string) => void;
    }) {
  const router = useRouter();
  const { apiClient } = useApi();
  const completionPercentage = Math.round(
    (worksheet.tasks.filter(
      (task) => "status" in task && task.status === TaskStatus.APPROVED,
    ).length /
      worksheet.tasks.length) *
      100 || 0,
  );

  const individualTasks = worksheet.tasks.filter(
    (task) => task.category === "individual",
  );
  const generalTasks = worksheet.tasks.filter(
    (task) => task.category === "general",
  );
  const hasBothCategories =
    individualTasks.length > 0 && generalTasks.length > 0;
  const hasFinalChallenge =
    variant !== "template" &&
    (worksheet.finalChallenge || worksheet.finalChallengeDescription);

  async function handleArchiveWorksheet() {
    try {
      await apiClient(`/worksheets/${worksheet.id}/`, {
        method: "PATCH",
        body: JSON.stringify({ is_archived: true }),
      });
      toast.success("Próba została przeniesiona do archiwum");
      if (removeWorksheet) {
        removeWorksheet(worksheet.id);
      } else {
        router.refresh();
      }
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie można przenieść próby do archiwum",
            description: error as Error,
          },
        }),
      );
    }
  }

  const renderTableHeader = () => (
    <TableHeader>
      <TableRow className="hover:bg-transparent">
        <TableHead className="w-8">Lp.</TableHead>
        <TableHead>Zadanie</TableHead>
        {variant !== "template" && (
          <TableHead className="hidden w-16 sm:table-cell">Status</TableHead>
        )}
        <TableHead className="sm:hidden"></TableHead>
        {(variant === "managed" ||
          variant === "user" ||
          variant === "review") && (
          <TableHead className="hidden w-16 sm:table-cell">Akcje</TableHead>
        )}
      </TableRow>
    </TableHeader>
  );

  const renderTaskList = (tasks: (Task | TemplateTask)[]) => (
    <TableBody>
      {tasks
        .sort((a, b) => a.order - b.order)
        .map((task, index) => {
          if (variant === "template") {
            return (
              <TaskTableRow
                key={task.id}
                task={task as TemplateTask}
                displayIndex={index + 1}
                variant={variant}
                worksheet={worksheet}
                updateTask={updateTask}
              />
            );
          } else {
            return (
              <TaskTableRow
                key={task.id}
                task={task as Task}
                displayIndex={index + 1}
                variant={variant}
                worksheet={worksheet}
                updateTask={updateTask}
              />
            );
          }
        })}
      {tasks.length === 0 && (
        <TableRow>
          <TableCell
            colSpan={variant === "template" ? 2 : 4}
            className="text-center"
          >
            Ta próba nie ma jeszcze zadań.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );

  // Render template tasks grouped by TemplateTaskGroup definitions
  const renderTemplateGrouped = (onlyCategory?: TemplateTask["category"]) => {
    const template = worksheet as TemplateWorksheet;
    const groups = template.taskGroups || [];
    const tasks = ((template.tasks as TemplateTask[]) || [])
      .filter((t) => (onlyCategory ? t.category === onlyCategory : true))
      .slice();
    const taskById = new Map(tasks.map((t) => [t.id, t] as const));

    // Sort groups by the minimal order of their tasks (fallback 0)
    const sortedGroups = groups
      .map((g) => ({
        group: g,
        minOrder: Math.min(
          ...g.tasks
            .map((id) => taskById.get(id)?.order)
            .filter((v): v is number => typeof v === "number"),
        ),
      }))
      .sort(
        (a, b) =>
          (isFinite(a.minOrder) ? a.minOrder : 0) -
          (isFinite(b.minOrder) ? b.minOrder : 0),
      )
      .map((x) => x.group);

    const requirementText = (min: number, max: number) => {
      const hasMin = min > 0;
      const hasMax = max > 0;
      if (hasMin && hasMax) {
        if (min === max) return `${min} zad.`;
        return `min ${min}, max ${max}`;
      }
      if (hasMin) return `min ${min}`;
      if (hasMax) return `max ${max}`;
      return "";
    };

    let topLevelIndex = 0;

    // Build a combined sequence of rows: [group, groupTasks..., ungroupedTask, ...]
    const ungroupedTasks = tasks
      .filter((t) => !groups.some((g) => g.tasks.includes(t.id)))
      .sort((a, b) => a.order - b.order);

    return (
      <TableBody>
        {sortedGroups.map((group) => {
          const groupTasks = group.tasks
            .map((id) => taskById.get(id))
            .filter((t): t is TemplateTask => !!t)
            .sort((a, b) => a.order - b.order);

          if (groupTasks.length === 0) return null;

          return (
            <Fragment key={`group-wrap-${group.id}`}>
              <TableRow
                key={`group-${group.id}`}
                className="bg-muted/30 hover:bg-muted/30"
              >
                <TableCell className="w-8 align-text-top font-medium">
                  {++topLevelIndex}
                </TableCell>
                <TableCell className="py-2">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <h4 className="text-sm font-medium">{group.name}</h4>
                      <span className="text-muted-foreground text-xs">
                        {requirementText(group.minTasks, group.maxTasks)}
                      </span>
                    </div>
                    {group.description && (
                      <p className="text-muted-foreground text-xs whitespace-pre-wrap">
                        {group.description}
                      </p>
                    )}
                  </div>
                </TableCell>
              </TableRow>
              {groupTasks.map((task, i) => (
                <TaskTableRow
                  key={task.id}
                  task={task}
                  displayIndex={`${romanize(i + 1).toLowerCase()}.`}
                  grouped
                  variant={"template"}
                  worksheet={template}
                  updateTask={updateTask}
                />
              ))}
            </Fragment>
          );
        })}

        {/* Ungrouped tasks appear after all groups, continuing the top-level index */}
        {ungroupedTasks.map((task) => (
          <TaskTableRow
            key={task.id}
            task={task}
            displayIndex={++topLevelIndex}
            variant={"template"}
            worksheet={template}
            updateTask={updateTask}
          />
        ))}

        {tasks.length === 0 && (
          <TableRow>
            <TableCell colSpan={2} className="text-center">
              Ta próba nie ma jeszcze zadań.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    );
  };

  const renderProgress = () => (
    <div className="flex items-center justify-end gap-4">
      <Progress value={completionPercentage} className="w-24" />
      <p className="w-8 text-sm">{completionPercentage || 0}%</p>
    </div>
  );

  if (
    variant === "template" &&
    (worksheet as TemplateWorksheet).taskGroups?.length > 0
  ) {
    if (hasBothCategories) {
      return (
        <div className="space-y-4">
          {generalTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-medium">Wymagania ogólne</h3>
              <Table containerClassName="sm:overflow-x-visible">
                {renderTableHeader()}
                {renderTemplateGrouped("general")}
              </Table>
            </div>
          )}

          {individualTasks.length > 0 && (
            <div>
              <h3 className="text-lg font-medium">Zadania indywidualne</h3>
              <Table containerClassName="sm:overflow-x-visible">
                {renderTableHeader()}
                {renderTemplateGrouped("individual")}
              </Table>
            </div>
          )}
        </div>
      );
    }

    return (
      <Table containerClassName="sm:overflow-x-visible">
        {renderTableHeader()}
        {renderTemplateGrouped()}
      </Table>
    );
  }

  if (!hasBothCategories && !hasFinalChallenge) {
    return (
      <Table containerClassName="sm:overflow-x-visible">
        {renderTableHeader()}
        {renderTaskList(worksheet.tasks)}
        {variant !== "archived" && variant !== "template" && (
          <TableFooter className="bg-transparent">
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={4}>
                <div className="flex items-center justify-end gap-4">
                  {completionPercentage === 100 && variant === "managed" && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleArchiveWorksheet}
                    >
                      <ArchiveIcon className="size-4" />
                      Archiwizuj próbę
                    </Button>
                  )}
                  {renderProgress()}
                </div>
              </TableCell>
            </TableRow>
          </TableFooter>
        )}
      </Table>
    );
  }

  return (
    <div className="space-y-4">
      {generalTasks.length > 0 && (
        <div>
          {hasBothCategories && (
            <h3 className="text-lg font-medium">Wymagania ogólne</h3>
          )}
          <Table containerClassName="sm:overflow-x-visible">
            {renderTableHeader()}
            {renderTaskList(generalTasks)}
          </Table>
        </div>
      )}

      {individualTasks.length > 0 && (
        <div>
          <h3 className="text-lg font-medium">Zadania indywidualne</h3>
          <Table containerClassName="sm:overflow-x-visible">
            {renderTableHeader()}
            {renderTaskList(individualTasks)}
          </Table>
        </div>
      )}

      {hasFinalChallenge && (
        <div>
          <h3 className="text-lg font-medium">Próba końcowa</h3>
          <Table containerClassName="sm:overflow-x-visible">
            <TableBody>
              <TableRow className="hover:bg-muted/10">
                <TableCell colSpan={4}>
                  {worksheet.finalChallenge && (
                    <p className={`text-wrap`}>{worksheet.finalChallenge}</p>
                  )}
                  {worksheet.finalChallengeDescription && (
                    <p className="text-muted-foreground line-clamp-3 text-sm text-wrap whitespace-pre-wrap sm:line-clamp-none">
                      {worksheet.finalChallengeDescription}
                    </p>
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      )}

      {variant !== "archived" && variant !== "template" && (
        <div className="flex items-center justify-end gap-4 border-t bg-transparent pt-3">
          {completionPercentage === 100 && variant === "managed" && (
            <Button variant="ghost" size="sm" onClick={handleArchiveWorksheet}>
              <ArchiveIcon className="size-4" />
              Archiwizuj próbę
            </Button>
          )}
          {renderProgress()}
        </div>
      )}
    </div>
  );
}

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
import { TemplateTask, TemplateWorksheet } from "@/types/template";
import { User } from "@/types/user";
import { Task, TaskStatus, Worksheet } from "@/types/worksheet";

import { TaskTableRow } from "./task-table-row";

export function TaskTable({
  worksheet,
  variant,
  updateTask,
  currentUser,
}:
  | {
      worksheet: Worksheet;
      variant: "user" | "managed" | "shared" | "archived" | "review";
      updateTask?: (task: Task) => void;
      currentUser?: User;
    }
  | {
      worksheet: TemplateWorksheet;
      variant: "template";
      updateTask?: (task: Task) => void;
      currentUser?: User;
    }) {
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
                index={index}
                variant={variant}
                worksheetId={worksheet.id}
                updateTask={updateTask}
                currentUser={currentUser}
              />
            );
          } else {
            return (
              <TaskTableRow
                key={task.id}
                task={task as Task}
                index={index}
                variant={variant}
                worksheetId={worksheet.id}
                updateTask={updateTask}
                currentUser={currentUser}
                supervisorId={worksheet.supervisor}
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

  const renderProgress = () => (
    <div className="flex items-center justify-end gap-4">
      <Progress value={completionPercentage} className="w-24" />
      <p className="w-8 text-sm">{completionPercentage || 0}%</p>
    </div>
  );

  if (!hasBothCategories) {
    return (
      <Table containerClassName="sm:overflow-x-visible">
        {renderTableHeader()}
        {renderTaskList(worksheet.tasks)}
        {variant !== "archived" && variant !== "template" && (
          <TableFooter className="bg-transparent">
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={4}>
                <div className="flex w-full items-center justify-end gap-4">
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
          <h3 className="text-lg font-medium">Zadania ogólne</h3>
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

      {variant !== "archived" && variant !== "template" && (
        <div className="border-t bg-transparent pt-3">{renderProgress()}</div>
      )}
    </div>
  );
}

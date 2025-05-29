import { Task, TaskStatus, Worksheet } from "@/types/worksheet";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { TaskTableRow } from "./task-table-row";

export function TaskTable({
  worksheet,
  variant,
  updateTask,
  currentUserId,
}: {
  worksheet: Worksheet;
  variant: "user" | "managed" | "shared" | "archived" | "review";
  updateTask: (task: Task) => void;
  currentUserId?: string;
}) {
  const completionPercentage = Math.round(
    (worksheet.tasks.filter((task) => task.status === TaskStatus.APPROVED)
      .length /
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
        <TableHead className="w-16 hidden sm:table-cell">Status</TableHead>
        <TableHead className="sm:hidden"></TableHead>
        {(variant === "managed" || variant === "user") && (
          <TableHead className="w-16 hidden sm:table-cell">Akcje</TableHead>
        )}
      </TableRow>
    </TableHeader>
  );

  const renderTaskList = (tasks: Task[]) => (
    <TableBody>
      {tasks.map((task, index) => (
        <TaskTableRow
          key={task.id}
          task={task}
          index={index}
          variant={variant}
          worksheetId={worksheet.id}
          updateTask={updateTask}
          currentUserId={currentUserId}
        />
      ))}
      {tasks.length === 0 && (
        <TableRow>
          <TableCell colSpan={4} className="text-center">
            Ta próba nie ma jeszcze zadań.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  );

  const renderProgress = () => (
    <div className="flex items-center justify-end gap-4">
      <Progress value={completionPercentage} className="w-24" />
      <p className="text-sm w-8">{completionPercentage || 0}%</p>
    </div>
  );

  if (!hasBothCategories) {
    return (
      <Table>
        {renderTableHeader()}
        {renderTaskList(worksheet.tasks)}
        {variant !== "archived" && (
          <TableFooter className="bg-transparent">
            <TableRow className="hover:bg-transparent">
              <TableCell colSpan={4}>
                <div className="flex items-center justify-end gap-4 w-full">
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
          <h3 className="font-medium text-lg">Zadania ogólne</h3>
          <Table>
            {renderTableHeader()}
            {renderTaskList(generalTasks)}
          </Table>
        </div>
      )}

      {individualTasks.length > 0 && (
        <div>
          <h3 className="font-medium text-lg">Zadania indywidualne</h3>
          <Table>
            {renderTableHeader()}
            {renderTaskList(individualTasks)}
          </Table>
        </div>
      )}

      {variant !== "archived" && (
        <div className="bg-transparent border-t pt-3">{renderProgress()}</div>
      )}
    </div>
  );
}

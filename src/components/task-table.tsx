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
      100,
  );
  return (
    <Table>
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
      <TableBody>
        {worksheet.tasks.map((task, index) => (
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
        {worksheet.tasks.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              Ta próba nie ma jeszcze zadań.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
      {variant !== "archived" && (
        <TableFooter className="bg-transparent">
          <TableRow className="hover:bg-transparent">
            <TableCell colSpan={4}>
              <div className="flex items-center justify-end gap-4 w-full">
                <Progress value={completionPercentage} className="w-24" />
                <p className="text-sm">{completionPercentage || 0}%</p>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}

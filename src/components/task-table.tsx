import { TaskStatus, Worksheet } from "@/types/worksheet";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaskStatusIndicator } from "@/components/task-status-indicator";
import { TaskActions } from "@/components/task-actions";
import { Progress } from "@/components/ui/progress";

export function TaskTable({
  worksheet,
  variant,
}: {
  worksheet: Worksheet;
  variant: "user" | "managed" | "shared" | "archived";
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
          <TableHead className="w-16">Status</TableHead>
          {(variant === "managed" || variant === "user") && (
            <TableHead className="w-16">Akcje</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {worksheet.tasks.map((task, index) => (
          <TableRow key={task.id} className="hover:bg-muted/10">
            <TableCell className="font-medium align-text-top w-8">
              {index + 1}
            </TableCell>
            <TableCell>
              <p className="text-wrap">{task.name}</p>
              {task.description && (
                <p className="text-sm text-muted-foreground text-wrap">
                  {task.description}
                </p>
              )}
            </TableCell>
            <TableCell className="text-center w-16">
              <TaskStatusIndicator task={task} />
            </TableCell>
            {(variant === "managed" || variant === "user") && (
              <TableCell className="text-center w-16">
                <TaskActions
                  task={task}
                  variant={variant}
                  worksheetId={worksheet.id}
                />
              </TableCell>
            )}
          </TableRow>
        ))}
        {worksheet.tasks.length === 0 && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              Ta proba nie ma jeszcze zadań.
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
                <p className="text-sm">{completionPercentage}%</p>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
}

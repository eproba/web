import { Worksheet } from "@/types/worksheet";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TaskStatusIndicator } from "@/components/task-status-indicator";
import { TaskActions } from "@/components/task-actions";

export function TaskTable({
  worksheet,
  variant,
}: {
  worksheet: Worksheet;
  variant: "user" | "managed" | "shared" | "archived";
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          <TableHead className="w-8">Lp.</TableHead>
          <TableHead>Task</TableHead>
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
      </TableBody>
    </Table>
  );
}

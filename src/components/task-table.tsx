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
import { TaskStatusIndicator } from "@/components/task-status-indicator";
import { TaskActions } from "@/components/task-actions";
import { Progress } from "@/components/ui/progress";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

export function TaskTable({
  worksheet,
  variant,
  updateTask,
}: {
  worksheet: Worksheet;
  variant: "user" | "managed" | "shared" | "archived";
  updateTask: (task: Task) => void;
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
          {(variant === "managed" || variant === "user") && (
            <TableHead className="w-16 hidden sm:table-cell">Akcje</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {worksheet.tasks.map((task, index) => (
          <Drawer key={task.id}>
            <DrawerTrigger asChild className="sm:hidden">
              <TableRow className="hover:bg-muted/10">
                <TableCell className="font-medium align-text-top w-8">
                  {index + 1}
                </TableCell>
                <TableCell>
                  <p className="text-wrap">{task.name}</p>
                  {task.description && (
                    <p className="text-sm text-muted-foreground text-wrap line-clamp-3">
                      {task.description}
                    </p>
                  )}
                </TableCell>
                <TableCell className="text-center w-8">
                  <TaskStatusIndicator task={task} tooltip={false} />
                </TableCell>
              </TableRow>
            </DrawerTrigger>
            <TableRow className="hover:bg-muted/10 hidden sm:table-row">
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
                    updateTask={updateTask}
                  />
                </TableCell>
              )}
            </TableRow>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>{task.name}</DrawerTitle>
                <DrawerDescription className="max-h-80 overflow-y-auto text-wrap">
                  {task.description}
                </DrawerDescription>
              </DrawerHeader>
              <div className="flex flex-col items-center justify-between px-4 py-2">
                <TaskStatusIndicator
                  task={task}
                  format="full"
                  tooltip={false}
                />
                <TaskActions
                  task={task}
                  variant={variant}
                  worksheetId={worksheet.id}
                  updateTask={updateTask}
                />
              </div>
              <DrawerFooter>
                <DrawerClose asChild>
                  <Button variant="outline">Zamknij</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
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

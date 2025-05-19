import { Task } from "@/types/worksheet";
import { TableCell, TableRow } from "@/components/ui/table";
import { TaskStatusIndicator } from "@/components/task-status-indicator";
import { TaskActions } from "@/components/task-actions";
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
import { useState } from "react";

export function TaskTableRow({
  task,
  index,
  variant,
  worksheetId,
  updateTask,
}: {
  task: Task;
  index: number;
  variant: "user" | "managed" | "shared" | "archived";
  worksheetId: string;
  updateTask: (task: Task) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Drawer key={task.id} open={isOpen} onOpenChange={setIsOpen}>
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
        <TableCell className="text-center w-16 p-0">
          <TaskStatusIndicator task={task} />
        </TableCell>
        {(variant === "managed" || variant === "user") && (
          <TableCell className="text-center w-16 p-0">
            <TaskActions
              task={task}
              variant={variant}
              worksheetId={worksheetId}
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
        <div className="flex flex-col items-center justify-between px-4 gap-4">
          <TaskStatusIndicator task={task} format="badges" tooltip={false} />
          {(variant === "managed" || variant === "user") && (
            <TaskActions
              task={task}
              variant={variant}
              worksheetId={worksheetId}
              updateTask={updateTask}
              format="button"
              closeDrawer={() => setIsOpen(false)}
            />
          )}
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Zamknij</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

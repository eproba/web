import { Task, TaskStatus } from "@/types/worksheet";
import { TableCell, TableRow } from "@/components/ui/table";
import { TaskStatusIndicator } from "@/components/worksheets/task-status-indicator";
import { TaskActions } from "@/components/worksheets/task-actions";
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
import { cn } from "@/lib/utils";
import { User } from "@/types/user";
import { TemplateTask } from "@/types/template";
import { MessageSquareDashedIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export function TaskTableRow({
  task,
  index,
  variant,
  worksheetId,
  updateTask,
  currentUser,
}:
  | {
      task: Task;
      index: number;
      variant: "user" | "managed" | "shared" | "archived" | "review";
      worksheetId: string;
      updateTask?: (task: Task) => void;
      currentUser?: User;
    }
  | {
      task: TemplateTask;
      index: number;
      variant: "template";
      worksheetId: string;
      updateTask?: (task: Task) => void;
      currentUser?: User;
    }) {
  const [isOpen, setIsOpen] = useState(false);
  const isHighlightedTask =
    variant === "review" &&
    task.status === TaskStatus.AWAITING_APPROVAL &&
    task.approver === currentUser?.id;

  const rowStyle =
    variant === "review" && !isHighlightedTask
      ? "opacity-50 hover:opacity-100 transition-opacity"
      : "";

  return (
    <Drawer key={task.id} open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild className="sm:hidden">
        <TableRow className={cn("hover:bg-muted/10", rowStyle)}>
          <TableCell className="font-medium align-text-top w-8">
            {index + 1}
          </TableCell>
          <TableCell>
            <p className={`text-wrap ${isHighlightedTask ? "font-bold" : ""}`}>
              {task.name}
            </p>
            {task.description && (
              <p className="text-sm text-muted-foreground text-wrap line-clamp-3">
                {task.description}
              </p>
            )}
          </TableCell>
          {variant !== "template" && (
            <TableCell className="text-center w-8">
              <TaskStatusIndicator task={task} tooltip={false} />
            </TableCell>
          )}
        </TableRow>
      </DrawerTrigger>
      <TableRow
        className={cn("hover:bg-muted/10 hidden sm:table-row", rowStyle)}
      >
        <TableCell className="font-medium align-text-top w-8">
          {index + 1}
        </TableCell>
        <TableCell>
          <p className={`text-wrap ${isHighlightedTask ? "font-bold" : ""}`}>
            <span className="inline-flex items-center gap-2">
              {task.name}
              {variant === "template" && task.templateNotes && (
                <Popover>
                  <PopoverTrigger>
                    <MessageSquareDashedIcon className="size-4 text-muted-foreground" />
                  </PopoverTrigger>
                  <PopoverContent>
                    <p className="text-sm text-muted-foreground">
                      Notatka - widoczna do momentu utworzenie próby z szablonu:
                    </p>
                    <p className="text-sm">{task.templateNotes}</p>
                  </PopoverContent>
                </Popover>
              )}
            </span>
          </p>
          {task.description && (
            <p className="text-sm text-muted-foreground text-wrap">
              {task.description}
            </p>
          )}
        </TableCell>
        {variant !== "template" && (
          <TableCell className="text-center w-16 p-0">
            <TaskStatusIndicator task={task} />
          </TableCell>
        )}
        {(variant === "managed" ||
          variant === "user" ||
          variant === "review") && (
          <TableCell className="text-center w-16 p-0">
            <TaskActions
              task={task}
              variant={variant}
              worksheetId={worksheetId}
              updateTask={updateTask!}
              currentUser={currentUser}
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
          {variant !== "template" && (
            <TaskStatusIndicator task={task} format="badges" tooltip={false} />
          )}
          {(variant === "managed" ||
            variant === "user" ||
            variant === "review") && (
            <TaskActions
              task={task}
              variant={variant}
              worksheetId={worksheetId}
              updateTask={updateTask!}
              format="button"
              closeDrawer={() => setIsOpen(false)}
              currentUser={currentUser}
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

import { Task, TaskStatus } from "@/types/worksheet";
import { TableCell, TableRow } from "@/components/ui/table";
import { TaskStatusIndicator } from "@/components/worksheets/task-status-indicator";
import { TaskActions } from "@/components/worksheets/task-actions";
import { TaskNotes } from "@/components/worksheets/task-notes";
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
import { motion } from "framer-motion";
import { InfoIcon } from "lucide-react";
import { RequiredFunctionLevel } from "@/lib/const";

export function TaskTableRow({
  task,
  index,
  variant,
  worksheetId,
  updateTask,
  currentUser,
  supervisorId,
}:
  | {
      task: Task;
      index: number;
      variant: "user" | "managed" | "shared" | "archived" | "review";
      worksheetId: string;
      updateTask?: (task: Task) => void;
      currentUser?: User;
      supervisorId?: string | null;
    }
  | {
      task: TemplateTask;
      index: number;
      variant: "template";
      worksheetId: string;
      updateTask?: (task: Task) => void;
      currentUser?: User;
      supervisorId?: never;
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
            {variant === "template" &&
            !task.name &&
            "templateNotes" in task &&
            task.templateNotes ? (
              <p className="text-wrap text-muted-foreground italic flex items-center gap-2">
                <InfoIcon className="size-4 flex-shrink-0" />
                {task.templateNotes}
              </p>
            ) : (
              <p
                className={`text-wrap ${isHighlightedTask ? "font-bold" : ""}`}
              >
                {task.name}
              </p>
            )}
            {task.description && (
              <p className="text-sm text-muted-foreground text-wrap line-clamp-3 whitespace-pre-wrap">
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
        className={cn(
          "relative hover:bg-muted/10 hidden sm:table-row group",
          rowStyle,
        )}
      >
        <TableCell className="font-medium align-text-top w-8 relative">
          {["managed", "review", "archived"].includes(variant) &&
            currentUser &&
            (currentUser.function.numberValue >=
              RequiredFunctionLevel.WORKSHEET_NOTES_ACCESS ||
              currentUser.id === supervisorId) && (
              <div className="absolute -left-8 top-0 py-0.5 z-50 pointer-events-auto opacity-0 invisible group-hover:opacity-100 group-hover:visible has-[[data-state=open]]:opacity-100 has-[[data-state=open]]:visible transition-all duration-300 ease-out transform translate-x-2 group-hover:translate-x-0 has-[[data-state=open]]:translate-x-0">
                <TaskNotes
                  task={task as Task}
                  worksheetId={worksheetId}
                  updateTask={updateTask!}
                  format="overlay"
                />
              </div>
            )}
          {index + 1}
        </TableCell>
        <TableCell>
          {variant === "template" &&
          !task.name &&
          "templateNotes" in task &&
          task.templateNotes ? (
            <p className="text-wrap text-muted-foreground italic flex items-center gap-2">
              <InfoIcon className="size-4 flex-shrink-0" />
              {task.templateNotes}
            </p>
          ) : (
            <p className={`text-wrap ${isHighlightedTask ? "font-bold" : ""}`}>
              {task.name}
            </p>
          )}
          {task.description && (
            <p className="text-sm text-muted-foreground text-wrap whitespace-pre-wrap">
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

      <DrawerContent
        className="transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          height: "auto",
          maxHeight: "80vh",
        }}
      >
        <DrawerHeader>
          <DrawerTitle>
            {variant === "template" &&
            !task.name &&
            "templateNotes" in task &&
            task.templateNotes ? (
              <>
                <InfoIcon className="inline-block mr-2 size-4" />
                {task.templateNotes}
              </>
            ) : (
              task.name
            )}
          </DrawerTitle>
          <DrawerDescription className="max-h-80 overflow-y-auto text-wrap whitespace-pre-wrap">
            {task.description}
          </DrawerDescription>
        </DrawerHeader>
        <motion.div
          className="flex flex-col items-center justify-between px-4 gap-4 pb-4"
          layout
          transition={{
            duration: 0.35,
            ease: [0.4, 0.0, 0.2, 1],
            when: "beforeChildren",
          }}
        >
          {variant !== "template" && (
            <motion.div
              layout
              className="w-full space-y-4"
              transition={{
                duration: 0.35,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              <TaskStatusIndicator
                task={task}
                format="badges"
                tooltip={false}
              />
              {["managed", "review", "archived"].includes(variant) &&
                currentUser &&
                (currentUser.function.numberValue >=
                  RequiredFunctionLevel.WORKSHEET_NOTES_ACCESS ||
                  currentUser.id === supervisorId) && (
                  <TaskNotes
                    task={task}
                    worksheetId={worksheetId}
                    updateTask={updateTask!}
                    format="mobile"
                    className="w-full"
                  />
                )}
            </motion.div>
          )}
          {(variant === "managed" ||
            variant === "user" ||
            variant === "review") && (
            <motion.div
              layout
              transition={{
                duration: 0.35,
                ease: [0.4, 0.0, 0.2, 1],
              }}
            >
              <TaskActions
                task={task}
                variant={variant}
                worksheetId={worksheetId}
                updateTask={updateTask!}
                format="button"
                closeDrawer={() => setIsOpen(false)}
                currentUser={currentUser}
              />
            </motion.div>
          )}
        </motion.div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Zamknij</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

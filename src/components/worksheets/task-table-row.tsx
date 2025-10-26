import { Button } from "@/components/ui/button";
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
import { TableCell, TableRow } from "@/components/ui/table";
import { TaskActions } from "@/components/worksheets/task-actions";
import { TaskNotes } from "@/components/worksheets/task-notes";
import { TaskStatusIndicator } from "@/components/worksheets/task-status-indicator";
import { RequiredFunctionLevel } from "@/lib/const";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/state/user";
import { TemplateTask, TemplateWorksheet } from "@/types/template";
import { Task, TaskStatus, Worksheet } from "@/types/worksheet";
import { motion } from "framer-motion";
import { InfoIcon } from "lucide-react";
import { useState } from "react";

export function TaskTableRow({
  task,
  variant,
  worksheet,
  updateTask,
  displayIndex,
  grouped,
}:
  | {
      task: Task;
      variant: "user" | "managed" | "shared" | "archived" | "review";
      worksheet: Worksheet;
      updateTask?: (task: Task) => void;
      displayIndex?: string | number;
      grouped?: boolean;
    }
  | {
      task: TemplateTask;
      variant: "template";
      worksheet: TemplateWorksheet;
      updateTask?: (task: Task) => void;
      displayIndex?: string | number;
      grouped?: boolean;
    }) {
  const [isOpen, setIsOpen] = useState(false);
  const currentUser = useCurrentUser();

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
          <TableCell
            className={cn("w-8 align-text-top font-medium", grouped && "pl-4")}
          >
            {displayIndex}
          </TableCell>
          <TableCell>
            {variant === "template" &&
            !task.name &&
            "templateNotes" in task &&
            task.templateNotes ? (
              <p className="text-muted-foreground flex items-center gap-2 text-wrap italic">
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
              <p className="text-muted-foreground line-clamp-3 text-sm text-wrap whitespace-pre-wrap">
                {task.description}
              </p>
            )}
          </TableCell>
          {variant !== "template" && (
            <TableCell className="w-8 text-center">
              <TaskStatusIndicator task={task} tooltip={false} />
            </TableCell>
          )}
        </TableRow>
      </DrawerTrigger>

      <TableRow
        className={cn(
          "hover:bg-muted/10 group relative hidden sm:table-row",
          rowStyle,
        )}
      >
        <TableCell
          className={cn(
            "relative w-8 align-text-top font-medium",
            grouped && "pl-6",
          )}
        >
          {["managed", "review", "archived"].includes(variant) &&
            currentUser &&
            (currentUser.function.numberValue >=
              RequiredFunctionLevel.WORKSHEET_NOTES_ACCESS ||
              currentUser.id === (worksheet as Worksheet).supervisor) &&
            currentUser.id !== (worksheet as Worksheet).user.id && (
              <div className="pointer-events-auto invisible absolute top-0 -left-8 z-50 translate-x-2 transform py-0.5 opacity-0 transition-all duration-300 ease-out group-hover:visible group-hover:translate-x-0 group-hover:opacity-100 has-[[data-state=open]]:visible has-[[data-state=open]]:translate-x-0 has-[[data-state=open]]:opacity-100">
                <TaskNotes
                  task={task as Task}
                  worksheetId={worksheet.id}
                  updateTask={updateTask!}
                  format="overlay"
                />
              </div>
            )}
          {displayIndex}
        </TableCell>
        <TableCell>
          {variant === "template" &&
          !task.name &&
          "templateNotes" in task &&
          task.templateNotes ? (
            <p className="text-muted-foreground flex items-center gap-2 text-wrap italic">
              <InfoIcon className="size-4 flex-shrink-0" />
              {task.templateNotes}
            </p>
          ) : (
            <p className={`text-wrap ${isHighlightedTask ? "font-bold" : ""}`}>
              {task.name}
            </p>
          )}
          {task.description && (
            <p className="text-muted-foreground text-sm text-wrap whitespace-pre-wrap">
              {task.description}
            </p>
          )}
        </TableCell>
        {variant !== "template" && (
          <TableCell className="w-16 p-0 text-center">
            <TaskStatusIndicator task={task} />
          </TableCell>
        )}
        {(variant === "managed" ||
          variant === "user" ||
          variant === "review") && (
          <TableCell className="w-16 p-0 text-center">
            <TaskActions
              task={task}
              variant={variant}
              worksheet={worksheet}
              updateTask={updateTask!}
            />
          </TableCell>
        )}
      </TableRow>

      <DrawerContent
        className="overflow-hidden transition-all duration-300 ease-in-out"
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
                <InfoIcon className="mr-2 inline-block size-4" />
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
          className="flex flex-col items-center justify-between gap-4 px-4 pb-4"
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
                  currentUser.id === worksheet.supervisor) &&
                currentUser.id !== worksheet.user.id && (
                  <TaskNotes
                    task={task}
                    worksheetId={worksheet.id}
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
                worksheet={worksheet}
                updateTask={updateTask!}
                format="button"
                closeDrawer={() => setIsOpen(false)}
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

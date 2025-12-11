import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { TaskItem } from "@/components/worksheets/editor/task-item";
import { RequiredFunctionLevel } from "@/lib/const";
import { type Task, type WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/state/user";
import { UserFunction } from "@/types/user";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { AnimatePresence, motion } from "framer-motion";
import { InfoIcon, ListTodoIcon, PlusIcon } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";

interface TaskField extends Task {
  fieldId: string;
  taskIndex: number;
}

interface TaskListProps {
  title?: string | null;
  tasks: TaskField[];
  category: "general" | "individual";
  showDescriptions: boolean;
  enableCategories: boolean;
  onAddTask: (category: string) => string;
  onRemoveTask: (category: string, id: string) => void;
  onMoveTaskUp: (category: string, taskId: string) => void;
  onMoveTaskDown: (category: string, taskId: string) => void;
  onMoveTaskToCategory: (
    taskId: string,
    fromCategory: string,
    toCategory: string,
  ) => void;
  form: UseFormReturn<WorksheetWithTasks>;
  variant: "template" | "worksheet";
}

export const TaskList: React.FC<TaskListProps> = ({
  title,
  tasks,
  category,
  showDescriptions,
  enableCategories,
  onAddTask,
  onRemoveTask,
  onMoveTaskUp,
  onMoveTaskDown,
  onMoveTaskToCategory,
  form,
  variant,
}) => {
  const currentUser = useCurrentUser();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDropHovered, setIsDropHovered] = useState(false);
  const taskRefs = useRef<Map<string, { focus: () => void }>>(new Map());

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    return dropTargetForElements({
      element,
      getData: () => ({ category }),
      canDrop: ({ source }) => {
        return enableCategories || source.data.category === category;
      },
      onDragEnter: () => {
        if (tasks.length === 0) {
          setIsDropHovered(true);
        }
      },
      onDragLeave: () => {
        setIsDropHovered(false);
      },
      onDrop: () => {
        setIsDropHovered(false);
      },
    });
  }, [category, enableCategories, tasks.length]);

  const handleAddTask = () => {
    const newTaskId = onAddTask(category);
    // Focus on the new task after a brief delay to allow for DOM updates
    setTimeout(() => {
      const taskRef = taskRefs.current.get(newTaskId);
      taskRef?.focus();
    }, 100);
  };

  const content = (
    <motion.div
      ref={containerRef}
      className={cn(
        "relative w-full touch-manipulation space-y-1 transition-all duration-300",
      )}
    >
      <motion.div layout className="space-y-1">
        <AnimatePresence mode="popLayout">
          {tasks.map((task, index) => {
            return (
              <motion.div
                key={task.fieldId}
                layout
                initial={false}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                transition={{ duration: 0.2 }}
              >
                <TaskItem
                  ref={(ref) => {
                    if (ref) {
                      taskRefs.current.set(task.id, ref);
                    } else {
                      taskRefs.current.delete(task.id);
                    }
                  }}
                  task={task}
                  index={index}
                  taskIndex={task.taskIndex}
                  showDescription={showDescriptions}
                  onRemove={() => onRemoveTask(category, task.id)}
                  onMoveUp={() => onMoveTaskUp(category, task.id)}
                  onMoveDown={() => onMoveTaskDown(category, task.id)}
                  onMoveToDifferentCategory={() =>
                    onMoveTaskToCategory(
                      task.id,
                      category,
                      category === "general" ? "individual" : "general",
                    )
                  }
                  canMoveUp={index > 0}
                  canMoveDown={index < tasks.length - 1}
                  canMoveToDifferentCategory={enableCategories}
                  form={form}
                  variant={variant}
                />
              </motion.div>
            );
          })}
        </AnimatePresence>

        {tasks.length !== 0 && (
          <motion.div
            layout
            className="pt-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 25,
            }}
          >
            <Button
              type="button"
              variant="ghost"
              onClick={handleAddTask}
              className="border-muted-foreground/30 w-full border-2 border-dashed"
            >
              <PlusIcon className="mr-2 size-4" />
              Dodaj zadanie
            </Button>
          </motion.div>
        )}
      </motion.div>

      {tasks.length === 0 && (
        <motion.div
          layout
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            delay: 0.1,
          }}
          className={cn(
            "relative flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-transparent py-12 text-center transition-all",
            isDropHovered &&
              "border-dashed border-blue-500 bg-blue-50/50 dark:bg-blue-950/50",
          )}
        >
          {/* Drop hint overlay */}
          <AnimatePresence>
            {isDropHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <motion.div
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  className="rounded-lg bg-blue-500/90 px-4 py-2 font-medium text-white shadow-lg"
                >
                  Upuść tutaj zadanie
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 20,
              delay: 0.2,
            }}
            className={isDropHovered ? "opacity-30" : ""}
          >
            <ListTodoIcon className="text-muted-foreground mb-4 h-12 w-12" />
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className={cn(
              "text-muted-foreground mb-6",
              isDropHovered && "opacity-30",
            )}
          >
            {enableCategories
              ? `Brak zadań ${
                  category === "general" ? "ogólnych" : "indywidualnych"
                }`
              : "Brak zadań"}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn("w-full max-w-xs", isDropHovered && "opacity-30")}
          >
            <Button
              type="button"
              variant="outline"
              onClick={handleAddTask}
              className="w-full transition-transform hover:scale-105"
            >
              <PlusIcon className="mr-2 size-4" />
              Dodaj pierwsze zadanie
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );

  if (title) {
    return (
      <motion.div layout className="h-full w-full">
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <motion.div
                className={cn(
                  "h-3 w-3 rounded-full",
                  category === "general" ? "bg-blue-500" : "bg-green-500",
                )}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 500,
                  damping: 30,
                  delay: 0.1,
                }}
              />
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                {title}
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center"
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger type="button">
                      <InfoIcon className="text-muted-foreground size-4" />
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      {category === "general"
                        ? `Wymagania dotyczące umiejętności - technik harcerskich i wiedzy, mogą je podpisywać ${UserFunction.fromValue(
                            RequiredFunctionLevel.WORKSHEET_MANAGEMENT,
                            currentUser?.gender,
                          ).fullName.toLowerCase()} i wyżej`
                        : `Zadania ułożone indywidualnie, oparte o kształtowanie postaw i pracę nad cechami charakteru, podpisać je może co najmniej ${UserFunction.fromValue(
                            RequiredFunctionLevel.INDIVIDUAL_TASKS_MANAGEMENT,
                            currentUser?.gender,
                          ).fullName.toLowerCase()} lub opiekun${currentUser?.gender?.value === "female" ? "ka" : ""}`}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-muted-foreground ml-auto text-sm font-normal"
              >
                {tasks.length}{" "}
                {tasks.length === 1
                  ? "zadanie"
                  : tasks.length < 5 && tasks.length > 1
                    ? "zadania"
                    : "zadań"}
              </motion.span>
            </CardTitle>
          </CardHeader>
          <CardContent className="px-1 sm:px-4">{content}</CardContent>
        </Card>
      </motion.div>
    );
  }

  return content;
};

TaskList.displayName = "TaskList";

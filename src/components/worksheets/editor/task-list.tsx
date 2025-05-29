import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InfoIcon, ListTodoIcon, PlusIcon } from "lucide-react";
import { TaskItem } from "@/components/worksheets/editor/task-item";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { cn } from "@/lib/utils";
import { type Task, type WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { UseFormReturn } from "react-hook-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TaskListProps {
  title?: string | null;
  tasks: Task[];
  category: "general" | "individual";
  showDescriptions: boolean;
  enableCategories: boolean;
  onUpdateTask: (
    category: string,
    id: string,
    updates: { field: string; value: string }[],
  ) => void;
  onAddTask: (category: string) => void;
  onRemoveTask: (category: string, id: string) => void;
  form: UseFormReturn<WorksheetWithTasks>;
}

export const TaskList: React.FC<TaskListProps> = ({
  title,
  tasks,
  category,
  showDescriptions,
  enableCategories,
  onUpdateTask,
  onAddTask,
  onRemoveTask,
  form,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDropHovered, setIsDropHovered] = useState(false);

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
    onAddTask(category);
  };

  const content = (
    <motion.div
      ref={containerRef}
      className={cn(
        "space-y-1 transition-all duration-300 relative touch-manipulation w-full",
        tasks.length === 0 && "ring-2 ring-transparent",
        tasks.length === 0 &&
          isDropHovered &&
          "ring-blue-500 ring-opacity-50 bg-blue-50/30 dark:bg-blue-950/30 rounded-lg",
      )}
    >
      {tasks.length === 0 ? (
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
            "flex flex-col items-center justify-center py-12 text-center relative",
            "border-2 border-transparent rounded-lg",
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
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
              >
                <motion.div
                  initial={{ y: 10 }}
                  animate={{ y: 0 }}
                  className="bg-blue-500/90 text-white px-4 py-2 rounded-lg shadow-lg font-medium"
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
            <ListTodoIcon className="w-12 h-12 text-muted-foreground mb-4" />
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
            {title ? `Brak zadań ${title.toLowerCase()}` : "Brak zadań"}
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
              className="w-full hover:scale-105 transition-transform"
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Dodaj pierwsze zadanie
            </Button>
          </motion.div>
        </motion.div>
      ) : (
        <motion.div layout className="space-y-1">
          <AnimatePresence mode="popLayout">
            {tasks.map((task, index) => {
              const allTasks = form.getValues("tasks");
              const taskIndex = allTasks.findIndex((t) => t.id === task.id);

              return (
                <motion.div
                  key={task.id}
                  layout="position"
                  initial={false}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <TaskItem
                    task={task}
                    index={index}
                    taskIndex={taskIndex}
                    showDescription={showDescriptions}
                    onUpdate={(updates) =>
                      onUpdateTask(category, task.id, updates)
                    }
                    onRemove={() => onRemoveTask(category, task.id)}
                    form={form}
                  />
                </motion.div>
              );
            })}
          </AnimatePresence>

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
              className="w-full border-2 border-dashed border-muted-foreground/30 "
            >
              <PlusIcon className="w-4 h-4 mr-2" />
              Dodaj zadanie
            </Button>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );

  if (title) {
    return (
      <motion.div layout className="w-full h-full">
        <Card className="transition-all duration-200 hover:shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <motion.div
                className={cn(
                  "w-3 h-3 rounded-full",
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
              >
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <InfoIcon className="w-4 h-4 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      {category === "general"
                        ? "Zadania ogólne, mogą je podpisywać zastępowi"
                        : "Zadania indywidualne, podpisać je może tylko kadra lub opiekun"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </motion.span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-sm font-normal text-muted-foreground ml-auto"
              >
                {tasks.length}{" "}
                {tasks.length === 1
                  ? "zadanie"
                  : tasks.length < 5
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

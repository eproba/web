import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  GripVerticalIcon,
  InfoIcon,
  SparklesIcon,
  Trash2Icon,
} from "lucide-react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { setCustomNativeDragPreview } from "@atlaskit/pragmatic-drag-and-drop/element/set-custom-native-drag-preview";
import { cn } from "@/lib/utils";
import { isTouchDevice, triggerHapticFeedback } from "@/lib/mobile-utils";
import { useDragDrop } from "./drag-drop-provider";
import { type Task, type WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { TaskSuggestionsDialog } from "./task-suggestions-dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDebouncedCallback } from "use-debounce";
import { User } from "@/types/user";
import { RequiredFunctionLevel } from "@/lib/const";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { TaskActionPopover } from "./task-action-popover";

interface TaskItemProps {
  task: Task;
  index: number;
  taskIndex: number;
  showDescription: boolean;
  onUpdate: (updates: { field: string; value: string }[]) => void;
  onRemove: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onMoveToDifferentCategory?: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  canMoveToDifferentCategory: boolean;
  form: UseFormReturn<WorksheetWithTasks>;
  currentUser: User;
  variant: "template" | "worksheet";
  ref: React.ForwardedRef<{
    focus: () => void;
  }>;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  index,
  taskIndex,
  showDescription,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
  onMoveToDifferentCategory,
  canMoveUp,
  canMoveDown,
  canMoveToDifferentCategory,
  form,
  currentUser,
  variant,
  ref,
}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const dragHandleRef = useRef<HTMLDivElement>(null);
  const taskInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [draggedOver, setDraggedOver] = useState<"top" | "bottom" | null>(null);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { dragState, setDragState } = useDragDrop();

  // Expose focus method to parent
  useImperativeHandle(ref, () => ({
    focus: () => {
      taskInputRef.current?.focus();
    },
  }));

  const debouncedUpdate = useDebouncedCallback(
    (updates: { field: string; value: string }[]) => {
      onUpdate(updates);
    },
    300,
  );

  const handleDelete = () => {
    if (!task.name && !task.description && !task.templateNotes) {
      onRemove();
    } else {
      setShowDeleteDialog(true);
    }
  };

  useEffect(() => {
    const element = elementRef.current;
    const dragHandle = dragHandleRef.current;
    if (!element || !dragHandle) return;

    const cleanup: (() => void)[] = [];

    cleanup.push(
      draggable({
        element: dragHandle,
        getInitialData: () => ({
          id: task.id,
          category: task.category,
        }),
        onGenerateDragPreview: ({ nativeSetDragImage }) => {
          setCustomNativeDragPreview({
            nativeSetDragImage,
            getOffset: () => ({ x: 16, y: 16 }),
            render: ({ container }) => {
              const preview = document.createElement("div");
              preview.style.cssText = `
                                background: var(--card);
                                border: 1px solid var(--border);
                                border-radius: 0.5rem;
                                padding: 1rem;
                                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
                                max-width: 20rem;
                                opacity: 0.95;
                                backdrop-filter: blur(8px);
                                pointer-events: none;
                                z-index: 9999;
                                font-family: inherit;
                                touch-action: none;
                            `;

              const content = document.createElement("div");
              content.style.cssText = `
                                display: flex;
                                gap: 0.75rem;
                                align-items: flex-start;
                            `;

              const number = document.createElement("span");
              number.style.cssText = `
                                font-size: 0.875rem;
                                font-weight: 500;
                                color: var(--muted-foreground);
                                flex-shrink: 0;
                            `;
              number.textContent = `${index + 1}.`;

              const taskText = document.createElement("div");
              taskText.style.cssText = `
                                flex: 1;
                                font-size: 1rem;
                                font-weight: 500;
                                display: -webkit-box;
                                -webkit-line-clamp: 2;
                                line-clamp: 2;
                                -webkit-box-orient: vertical;
                                overflow: hidden;
                                color: var(--foreground);
                                line-height: 1.4;
                            `;
              taskText.textContent = task.name || "Nowe zadanie";

              content.appendChild(number);
              content.appendChild(taskText);
              preview.appendChild(content);
              container.appendChild(preview);
            },
          });
        },
        onDragStart: () => {
          setIsDragging(true);
          triggerHapticFeedback("light");
          setDragState((prev) => ({
            ...prev,
            isDragging: true,
            draggedItem: task.id,
          }));
        },
        onDrop: () => {
          setIsDragging(false);
          triggerHapticFeedback("medium");
          setDragState((prev) => ({
            ...prev,
            isDragging: false,
            draggedItem: null,
            dragOverItem: null,
          }));
        },
      }),
    );

    cleanup.push(
      dropTargetForElements({
        getIsSticky: () => true,
        element,
        getData: ({ input, element }) => {
          const rect = element.getBoundingClientRect();
          const y = input.clientY;
          const elementTop = rect.top;
          const elementHeight = rect.height;
          const relativeY = (y - elementTop) / elementHeight;

          const edge = relativeY < 0.5 ? "top" : "bottom";
          setDraggedOver(edge);

          return {
            id: task.id,
            category: task.category,
            [Symbol.for("closestEdge")]: edge,
          };
        },
        canDrop: ({ source }) => source.data.id !== task.id,
        onDragEnter: ({ source }) => {
          if (source.data.id !== task.id) {
            if (isTouchDevice()) {
              triggerHapticFeedback("light");
            }
            setDragState((prev) => ({
              ...prev,
              dragOverItem: task.id,
            }));
          }
        },
        onDragLeave: () => {
          setDraggedOver(null);
          setDragState((prev) => ({
            ...prev,
            dragOverItem:
              prev.dragOverItem === task.id ? null : prev.dragOverItem,
          }));
        },
        onDrop: () => {
          setDraggedOver(null);
        },
      }),
    );

    return () => cleanup.forEach((fn) => fn());
  }, [
    task.id,
    task.category,
    task.name,
    task.templateNotes,
    setDragState,
    index,
    variant,
  ]);

  const isBeingDragged = dragState.draggedItem === task.id;
  const showTopIndicator = draggedOver === "top";
  const showBottomIndicator = draggedOver === "bottom";

  return (
    <motion.div
      layout="position"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10, height: 0 }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
      }}
      className="relative"
    >
      {/* Top Drop Indicator */}
      <AnimatePresence>
        {showTopIndicator && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute -top-1 left-0 right-0 h-1 bg-blue-500 rounded-full z-20"
            style={{
              boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ delay: 0.05, duration: 0.15 }}
              className="absolute -top-1 left-0 w-3 h-3 bg-blue-500 rounded-full"
              style={{
                boxShadow: "0 0 6px rgba(59, 130, 246, 0.7)",
              }}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ delay: 0.05, duration: 0.15 }}
              className="absolute -top-1 right-0 w-3 h-3 bg-blue-500 rounded-full"
              style={{
                boxShadow: "0 0 6px rgba(59, 130, 246, 0.7)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Task Item */}
      <motion.div
        ref={elementRef}
        layout
        className={cn(
          "group relative bg-card border rounded-lg p-4 transition-all duration-200 touch-manipulation hover:bg-accent/30",
          isBeingDragged && "opacity-30 scale-95 bg-muted border-dashed",
          isHovered && !isBeingDragged && "shadow-sm",
        )}
        whileTap={{ scale: 0.98 }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex gap-3 items-start">
          {/* Task Number */}
          <div className="flex items-center pt-2 min-w-4 sm:min-w-8">
            <span className="text-sm font-medium text-muted-foreground select-none">
              {index + 1}.
            </span>
          </div>

          {/* Task Content */}
          <div className="flex-1 space-y-3">
            <FormField
              control={form.control}
              name={`tasks.${taskIndex}.name` as const}
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      ref={taskInputRef}
                      placeholder="Wprowadź zadanie..."
                      onMouseDown={(e) => e.stopPropagation()}
                      onDragStart={(e) => e.preventDefault()}
                      onChange={(e) => {
                        field.onChange(e.target.value);
                        debouncedUpdate([
                          { field: "task", value: e.target.value },
                        ]);
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {showDescription &&
              variant === "worksheet" &&
              form.getValues(`tasks.${taskIndex}.templateNotes`) && (
                <Alert>
                  <InfoIcon />
                  <AlertDescription className="whitespace-pre-wrap">
                    {form.getValues(`tasks.${taskIndex}.templateNotes`)}
                  </AlertDescription>
                </Alert>
              )}

            {showDescription && (
              <FormField
                control={form.control}
                name={`tasks.${taskIndex}.description` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Opis zadania (opcjonalnie)..."
                        rows={2}
                        onMouseDown={(e) => e.stopPropagation()}
                        onDragStart={(e) => e.preventDefault()}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          debouncedUpdate([
                            { field: "description", value: e.target.value },
                          ]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            {showDescription && variant === "template" && (
              <FormField
                control={form.control}
                name={`tasks.${taskIndex}.templateNotes` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs text-muted-foreground">
                      Notatki do szablonu, znikają po utworzeniu próby
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="To zadanie ma na celu..."
                        rows={2}
                        onMouseDown={(e) => e.stopPropagation()}
                        onDragStart={(e) => e.preventDefault()}
                        onChange={(e) => {
                          field.onChange(e.target.value);
                          debouncedUpdate([
                            { field: "templateNotes", value: e.target.value },
                          ]);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 flex-col-reverse md:flex-row">
            {/* AI Suggestions Button - Desktop Only */}
            {currentUser.function.numberValue >=
              RequiredFunctionLevel.TASK_SUGGESTIONS &&
              variant === "worksheet" &&
              task.category === "individual" && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setShowSuggestions(true);
                  }}
                  className={cn(
                    "hidden md:flex md:opacity-0 md:pointer-coarse:opacity-100 group-hover:opacity-100 transition-all hover:bg-blue-100 hover:text-blue-700",
                    showSuggestions &&
                      "opacity-100 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300",
                  )}
                  title="Pomysły na zadania"
                >
                  <SparklesIcon className="size-4" />
                </Button>
              )}

            {/* Delete Task Button - Desktop Only */}
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="hidden md:flex md:opacity-0 md:pointer-coarse:opacity-100 group-hover:opacity-100 transition-opacity hover:bg-red-100 hover:text-red-700"
              onClick={() => handleDelete()}
            >
              <Trash2Icon className="size-4" />
            </Button>

            <motion.div
              ref={dragHandleRef}
              className={cn(
                "cursor-grab hover:bg-gray-100 dark:hover:bg-gray-800 transition-all touch-manipulation select-none",
                "p-2 rounded-md items-center justify-center hidden md:flex",
                isDragging && "cursor-grabbing bg-blue-100 dark:bg-blue-900",
                "opacity-60 group-hover:opacity-100",
              )}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                touchAction: "none",
                WebkitUserSelect: "none",
                userSelect: "none",
                WebkitTouchCallout: "none",
              }}
              onPointerDown={(e) => {
                if (e.pointerType === "touch") {
                  e.preventDefault();
                  triggerHapticFeedback("light");
                }
              }}
            >
              <GripVerticalIcon
                className={cn(
                  "w-5 h-5 text-muted-foreground transition-colors",
                  isDragging && "text-blue-600",
                )}
              />
            </motion.div>

            {/* Mobile Action Menu */}
            <TaskActionPopover
              key={task.id}
              task={task}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              onMoveToDifferentCategory={onMoveToDifferentCategory}
              onShowSuggestions={() => setShowSuggestions(true)}
              onDelete={() => handleDelete()}
              canMoveUp={canMoveUp}
              canMoveDown={canMoveDown}
              canMoveToDifferentCategory={canMoveToDifferentCategory}
              currentUser={currentUser}
              variant={variant}
            />
          </div>
        </div>
      </motion.div>

      {/* Bottom Drop Indicator */}
      <AnimatePresence>
        {showBottomIndicator && (
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1 }}
            exit={{ opacity: 0, scaleY: 0 }}
            transition={{ duration: 0.15 }}
            className="absolute -bottom-1 left-0 right-0 h-1 bg-blue-500 rounded-full z-20"
            style={{
              boxShadow: "0 0 8px rgba(59, 130, 246, 0.5)",
            }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ delay: 0.05, duration: 0.15 }}
              className="absolute -bottom-1 left-0 w-3 h-3 bg-blue-500 rounded-full"
              style={{
                boxShadow: "0 0 6px rgba(59, 130, 246, 0.7)",
              }}
            />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ delay: 0.05, duration: 0.15 }}
              className="absolute -bottom-1 right-0 w-3 h-3 bg-blue-500 rounded-full"
              style={{
                boxShadow: "0 0 6px rgba(59, 130, 246, 0.7)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Task Suggestions Dialog */}
      {task.category === "individual" && (
        <TaskSuggestionsDialog
          open={showSuggestions}
          onOpenChange={(open) => {
            setShowSuggestions(open);
          }}
          onAddTask={(suggestion) => {
            form.setValue(`tasks.${taskIndex}.name`, suggestion.name);
            form.setValue(
              `tasks.${taskIndex}.description`,
              suggestion.description,
            );

            onUpdate([
              { field: "name", value: suggestion.name },
              { field: "description", value: suggestion.description },
            ]);
          }}
        />
      )}

      {/* Delete Task Dialog */}
      <AlertDialog
        open={showDeleteDialog}
        onOpenChange={(open) => {
          setShowDeleteDialog(open);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Usuń zadanie</AlertDialogTitle>
            <AlertDialogDescription>
              Czy na pewno chcesz usunąć to zadanie? Ta akcja nie może być
              cofnięta.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
              Anuluj
            </AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                onRemove();
                setShowDeleteDialog(false);
              }}
            >
              Usuń
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </motion.div>
  );
};

TaskItem.displayName = "TaskItem";

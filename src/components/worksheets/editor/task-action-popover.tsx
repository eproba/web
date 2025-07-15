import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RequiredFunctionLevel } from "@/lib/const";
import { triggerHapticFeedback } from "@/lib/mobile-utils";
import { type Task } from "@/lib/schemas/worksheet";
import { User } from "@/types/user";
import {
  ArrowRightLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MoreVerticalIcon,
  SparklesIcon,
  Trash2Icon,
} from "lucide-react";
import React, { useState } from "react";

interface TaskActionPopoverProps {
  task: Task;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  onMoveToDifferentCategory?: () => void;
  onShowSuggestions: () => void;
  onDelete: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  canMoveToDifferentCategory: boolean;
  currentUser: User;
  variant: "template" | "worksheet";
}

export const TaskActionPopover: React.FC<TaskActionPopoverProps> = ({
  task,
  onMoveUp,
  onMoveDown,
  onMoveToDifferentCategory,
  onShowSuggestions,
  onDelete,
  canMoveUp,
  canMoveDown,
  canMoveToDifferentCategory,
  currentUser,
  variant,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMoveUp = () => {
    if (!canMoveUp || !onMoveUp) return;
    onMoveUp();
    triggerHapticFeedback("light");
  };

  const handleMoveDown = () => {
    if (!canMoveDown || !onMoveDown) return;
    onMoveDown();
    triggerHapticFeedback("light");
  };

  const handleMoveToDifferentCategory = () => {
    if (!canMoveToDifferentCategory || !onMoveToDifferentCategory) return;

    onMoveToDifferentCategory();
    triggerHapticFeedback("medium");
    setIsOpen(false);
  };

  const handleShowSuggestions = () => {
    setIsOpen(false);
    // Delay to ensure popover closes cleanly before opening dialog
    setTimeout(() => {
      onShowSuggestions();
    }, 100);
  };

  const handleShowDeleteDialog = () => {
    setIsOpen(false);
    // Delay to ensure popover closes cleanly before opening dialog
    setTimeout(() => {
      onDelete();
    }, 100);
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="h-8 w-8 p-0 hover:bg-gray-100 md:hidden dark:hover:bg-gray-800"
          title="Opcje zadania"
        >
          <MoreVerticalIcon className="size-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-2" align="end">
        <div className="space-y-1">
          {/* Move Up */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleMoveUp}
            disabled={!canMoveUp}
            className="h-8 w-full justify-start px-2"
          >
            <ChevronUpIcon className="mr-2 size-4" />
            Przenieś w górę
          </Button>

          {/* Move Down */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleMoveDown}
            disabled={!canMoveDown}
            className="h-8 w-full justify-start px-2"
          >
            <ChevronDownIcon className="mr-2 size-4" />
            Przenieś w dół
          </Button>

          {/* Move to Different Category */}
          {canMoveToDifferentCategory && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleMoveToDifferentCategory}
              className="h-8 w-full justify-start px-2"
            >
              <ArrowRightLeftIcon className="mr-2 size-4" />
              <span className="truncate">
                {task.category === "general"
                  ? "Do indywidualnych"
                  : "Do ogólnych"}
              </span>
            </Button>
          )}

          {/* Separator */}
          <div className="my-1 border-t" />

          {/* AI Suggestions */}
          {currentUser.function.numberValue >=
            RequiredFunctionLevel.TASK_SUGGESTIONS &&
            variant === "worksheet" &&
            task.category === "individual" && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={handleShowSuggestions}
                className="h-8 w-full justify-start px-2 text-blue-600 hover:bg-blue-50 hover:text-blue-700"
              >
                <SparklesIcon className="mr-2 size-4" />
                Pomysły na zadania
              </Button>
            )}

          {/* Delete Task */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleShowDeleteDialog}
            className="h-8 w-full justify-start px-2 text-red-600 hover:bg-red-50 hover:text-red-700"
          >
            <Trash2Icon className="mr-2 size-4" />
            Usuń zadanie
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

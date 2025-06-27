import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowRightLeftIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MoreVerticalIcon,
  SparklesIcon,
  Trash2Icon,
} from "lucide-react";
import { triggerHapticFeedback } from "@/lib/mobile-utils";
import { User } from "@/types/user";
import { RequiredFunctionLevel } from "@/lib/const";
import { type Task } from "@/lib/schemas/worksheet";

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
          size="sm"
          className="h-8 w-8 p-0 md:hidden hover:bg-gray-100 dark:hover:bg-gray-800"
          title="Opcje zadania"
        >
          <MoreVerticalIcon className="w-4 h-4" />
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
            className="w-full justify-start h-8 px-2"
          >
            <ChevronUpIcon className="w-4 h-4 mr-2" />
            Przenieś w górę
          </Button>

          {/* Move Down */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleMoveDown}
            disabled={!canMoveDown}
            className="w-full justify-start h-8 px-2"
          >
            <ChevronDownIcon className="w-4 h-4 mr-2" />
            Przenieś w dół
          </Button>

          {/* Move to Different Category */}
          {canMoveToDifferentCategory && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={handleMoveToDifferentCategory}
              className="w-full justify-start h-8 px-2"
            >
              <ArrowRightLeftIcon className="w-4 h-4 mr-2" />
              <span className="truncate">
                {task.category === "general"
                  ? "Do indywidualnych"
                  : "Do ogólnych"}
              </span>
            </Button>
          )}

          {/* Separator */}
          <div className="border-t my-1" />

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
                className="w-full justify-start h-8 px-2 text-blue-600 hover:text-blue-700 hover:bg-blue-50"
              >
                <SparklesIcon className="w-4 h-4 mr-2" />
                Pomysły na zadania
              </Button>
            )}

          {/* Delete Task */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleShowDeleteDialog}
            className="w-full justify-start h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            <Trash2Icon className="w-4 h-4 mr-2" />
            Usuń zadanie
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

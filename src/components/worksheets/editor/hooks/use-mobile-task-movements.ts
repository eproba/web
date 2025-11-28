import { type WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";

interface UseMobileTaskMovementsProps {
  form: UseFormReturn<WorksheetWithTasks>;
  reorderTasks: (
    sourceId: string,
    targetId: string,
    edge: string | null,
  ) => void;
  moveTaskBetweenCategories: (
    sourceId: string,
    destCategory: string,
    targetId: string | null,
    edge: string | null,
  ) => void;
}

export const useMobileTaskMovements = ({
  form,
  reorderTasks,
  moveTaskBetweenCategories,
}: UseMobileTaskMovementsProps) => {
  const handleMoveTaskUp = useCallback(
    (category: string, taskId: string) => {
      const tasks = form.watch("tasks");
      const categoryTasks = tasks.filter((task) => task.category === category);
      const taskIndex = categoryTasks.findIndex((task) => task.id === taskId);

      if (taskIndex > 0) {
        const targetTask = categoryTasks[taskIndex - 1];
        reorderTasks(taskId, targetTask.id, "top");
      }
    },
    [form, reorderTasks],
  );

  const handleMoveTaskDown = useCallback(
    (category: string, taskId: string) => {
      const tasks = form.watch("tasks");
      const categoryTasks = tasks.filter((task) => task.category === category);
      const taskIndex = categoryTasks.findIndex((task) => task.id === taskId);

      if (taskIndex < categoryTasks.length - 1) {
        const targetTask = categoryTasks[taskIndex + 1];
        reorderTasks(taskId, targetTask.id, "bottom");
      }
    },
    [form, reorderTasks],
  );

  const handleMoveTaskToCategory = useCallback(
    (taskId: string, fromCategory: string, toCategory: string) => {
      const tasks = form.watch("tasks");
      const targetCategoryTasks = tasks.filter(
        (task) => task.category === toCategory,
      );

      if (targetCategoryTasks.length > 0) {
        // Move to the end of the target category
        const lastTask = targetCategoryTasks[targetCategoryTasks.length - 1];
        moveTaskBetweenCategories(taskId, toCategory, lastTask.id, "bottom");
      } else {
        // If target category is empty, just change the category
        moveTaskBetweenCategories(taskId, toCategory, null, null);
      }
    },
    [form, moveTaskBetweenCategories],
  );

  return {
    handleMoveTaskUp,
    handleMoveTaskDown,
    handleMoveTaskToCategory,
  };
};

import { type WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";

import { DropEdge, TaskCategory } from "../editor-model";

interface UseMobileTaskMovementsProps {
  form: UseFormReturn<WorksheetWithTasks>;
  reorderTasks: (sourceId: string, targetId: string, edge: DropEdge) => void;
  moveTaskBetweenCategories: (
    sourceId: string,
    destCategory: TaskCategory,
    targetId: string | null,
    edge: DropEdge,
  ) => void;
}

export const useMobileTaskMovements = ({
  form,
  reorderTasks,
  moveTaskBetweenCategories,
}: UseMobileTaskMovementsProps) => {
  const handleMoveTaskUp = useCallback(
    (category: TaskCategory, taskId: string) => {
      const tasks = form.getValues("tasks");
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
    (category: TaskCategory, taskId: string) => {
      const tasks = form.getValues("tasks");
      const categoryTasks = tasks.filter((task) => task.category === category);
      const taskIndex = categoryTasks.findIndex((task) => task.id === taskId);

      if (taskIndex >= 0 && taskIndex < categoryTasks.length - 1) {
        const targetTask = categoryTasks[taskIndex + 1];
        reorderTasks(taskId, targetTask.id, "bottom");
      }
    },
    [form, reorderTasks],
  );

  const handleMoveTaskToCategory = useCallback(
    (taskId: string, fromCategory: TaskCategory, toCategory: TaskCategory) => {
      const tasks = form.getValues("tasks");
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

import { useCallback } from "react";
import { UseFormReturn } from "react-hook-form";
import { type Task, type WorksheetWithTasks } from "@/lib/schemas/worksheet";

interface UseMobileTaskMovementsProps {
  form: UseFormReturn<WorksheetWithTasks>;
  reorderTasks: (
    tasks: Task[],
    sourceId: string,
    targetId: string,
    edge: string | null,
  ) => Task[];
  moveTaskBetweenCategories: (
    tasks: Task[],
    sourceId: string,
    destCategory: string,
    targetId: string,
    edge: string | null,
  ) => Task[];
  updateTasksInForm: (tasks: Task[]) => void;
}

export const useMobileTaskMovements = ({
  form,
  reorderTasks,
  moveTaskBetweenCategories,
  updateTasksInForm,
}: UseMobileTaskMovementsProps) => {
  const handleMoveTaskUp = useCallback(
    (category: string, taskId: string) => {
      const tasks = form.watch("tasks");
      const categoryTasks = tasks.filter((task) => task.category === category);
      const taskIndex = categoryTasks.findIndex((task) => task.id === taskId);

      if (taskIndex > 0) {
        const targetTask = categoryTasks[taskIndex - 1];
        const reorderedTasks = reorderTasks(
          tasks,
          taskId,
          targetTask.id,
          "top",
        );
        updateTasksInForm(reorderedTasks);
      }
    },
    [form, reorderTasks, updateTasksInForm],
  );

  const handleMoveTaskDown = useCallback(
    (category: string, taskId: string) => {
      const tasks = form.watch("tasks");
      const categoryTasks = tasks.filter((task) => task.category === category);
      const taskIndex = categoryTasks.findIndex((task) => task.id === taskId);

      if (taskIndex < categoryTasks.length - 1) {
        const targetTask = categoryTasks[taskIndex + 1];
        const reorderedTasks = reorderTasks(
          tasks,
          taskId,
          targetTask.id,
          "bottom",
        );
        updateTasksInForm(reorderedTasks);
      }
    },
    [form, reorderTasks, updateTasksInForm],
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
        const reorderedTasks = moveTaskBetweenCategories(
          tasks,
          taskId,
          toCategory,
          lastTask.id,
          "bottom",
        );
        updateTasksInForm(reorderedTasks);
      } else {
        // If target category is empty, just change the category
        const updatedTasks = tasks.map((task) =>
          task.id === taskId
            ? { ...task, category: toCategory as "general" | "individual" }
            : task,
        );
        updateTasksInForm(updatedTasks);
      }
    },
    [form, moveTaskBetweenCategories, updateTasksInForm],
  );

  return {
    handleMoveTaskUp,
    handleMoveTaskDown,
    handleMoveTaskToCategory,
  };
};

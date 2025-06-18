import { useCallback, useMemo } from "react";
import { UseFormReturn } from "react-hook-form";
import { type Task, type WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { v4 as uuid } from "uuid";

interface UseWorksheetTasksProps {
  form: UseFormReturn<WorksheetWithTasks>;
}

export const useWorksheetTasks = ({ form }: UseWorksheetTasksProps) => {
  const { watch, setValue } = form;
  const watchedTasks = watch("tasks");

  const { generalTasks, individualTasks } = useMemo(() => {
    const general = watchedTasks.filter((task) => task.category === "general");
    const individual = watchedTasks.filter(
      (task) => task.category === "individual",
    );

    return { generalTasks: general, individualTasks: individual };
  }, [watchedTasks]);

  const updateTasksInForm = useCallback(
    (newTasks: Task[]) => {
      setValue("tasks", newTasks, { shouldValidate: true });
    },
    [setValue],
  );

  const updateTask = useCallback(
    (id: string, updates: { field: string; value: string }[]) => {
      const updatedTasks = watchedTasks.map((task) => {
        if (task.id === id) {
          const updatedTask = { ...task };
          updates.forEach((update) => {
            if (update.field === "task") {
              updatedTask.name = update.value;
            } else if (update.field === "description") {
              updatedTask.description = update.value;
            }
          });
          return updatedTask;
        }
        return task;
      });
      updateTasksInForm(updatedTasks);
    },
    [watchedTasks, updateTasksInForm],
  );

  const addTask = useCallback(
    (category: string) => {
      const existingTasksInCategory = watchedTasks.filter(
        (task) => task.category === category,
      );
      const newOrder = existingTasksInCategory.length;

      const newTaskId = uuid();
      const newTask: Task = {
        id: newTaskId,
        name: "",
        description: "",
        category: category as "general" | "individual",
        order: newOrder,
      };

      const updatedTasks = [...watchedTasks, newTask];
      updateTasksInForm(updatedTasks);

      return newTaskId;
    },
    [watchedTasks, updateTasksInForm],
  );

  const removeTask = useCallback(
    (category: string, id: string) => {
      const updatedTasks = watchedTasks.filter((task) => task.id !== id);

      // Reorder remaining tasks in the same category
      const reorderedTasks = updatedTasks.map((task) => {
        if (task.category === category) {
          const sameCategory = updatedTasks.filter(
            (t) => t.category === category,
          );
          const newOrder = sameCategory.indexOf(task);
          return { ...task, order: newOrder };
        }
        return task;
      });

      updateTasksInForm(reorderedTasks);
    },
    [watchedTasks, updateTasksInForm],
  );

  const reorderTasks = useCallback(
    (
      tasks: Task[],
      sourceId: string,
      targetId: string,
      edge: string | null,
    ): Task[] => {
      const newTasks = [...tasks];
      const sourceIndex = newTasks.findIndex((task) => task.id === sourceId);
      const targetIndex = newTasks.findIndex((task) => task.id === targetId);

      if (sourceIndex === -1 || targetIndex === -1) return tasks;

      const [movedTask] = newTasks.splice(sourceIndex, 1);

      // Adjust target index if source was before target
      const adjustedTargetIndex =
        sourceIndex < targetIndex ? targetIndex - 1 : targetIndex;
      const insertIndex =
        edge === "top" ? adjustedTargetIndex : adjustedTargetIndex + 1;

      newTasks.splice(insertIndex, 0, movedTask);

      return newTasks.map((task, index) => ({ ...task, order: index }));
    },
    [],
  );

  const moveTaskBetweenCategories = useCallback(
    (
      tasks: Task[],
      sourceId: string,
      destCategory: string,
      targetId: string,
      edge: string | null,
    ): Task[] => {
      const newTasks = [...tasks];
      const taskToMoveIndex = newTasks.findIndex(
        (task) => task.id === sourceId,
      );

      if (taskToMoveIndex === -1) return tasks;

      const taskToMove = {
        ...newTasks[taskToMoveIndex],
        category: destCategory as "general" | "individual",
      };
      newTasks.splice(taskToMoveIndex, 1);

      const targetIndex = newTasks.findIndex((task) => task.id === targetId);
      if (targetIndex === -1) {
        // If target not found, append to end
        newTasks.push(taskToMove);
      } else {
        const insertIndex = edge === "top" ? targetIndex : targetIndex + 1;
        newTasks.splice(insertIndex, 0, taskToMove);
      }

      return newTasks.map((task, index) => ({ ...task, order: index }));
    },
    [],
  );

  const transferAllTasks = useCallback(
    (sourceCategory: string, destCategory: string) => {
      if (sourceCategory === destCategory) return;

      const tasksToMove = watchedTasks.filter(
        (task) => task.category === sourceCategory,
      );

      if (tasksToMove.length === 0) return;

      const updatedTasks = watchedTasks.map((task) =>
        task.category === sourceCategory
          ? { ...task, category: destCategory as "general" | "individual" }
          : task,
      );

      const reorderedTasks = updatedTasks.map((task) => {
        const sameCategory = updatedTasks.filter(
          (t) => t.category === task.category,
        );
        const newOrder = sameCategory.findIndex((t) => t.id === task.id);
        return { ...task, order: newOrder };
      });

      updateTasksInForm(reorderedTasks);
    },
    [watchedTasks, updateTasksInForm],
  );

  return {
    watchedTasks,
    generalTasks,
    individualTasks,
    updateTasksInForm,
    updateTask,
    addTask,
    removeTask,
    reorderTasks,
    moveTaskBetweenCategories,
    transferAllTasks,
  };
};

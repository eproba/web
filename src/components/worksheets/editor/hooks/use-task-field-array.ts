import { type Task, type WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { useCallback, useMemo } from "react";
import { UseFormReturn, useFieldArray } from "react-hook-form";
import { v4 as uuid } from "uuid";

interface UseTaskFieldArrayProps {
  form: UseFormReturn<WorksheetWithTasks>;
}

export const useTaskFieldArray = ({ form }: UseTaskFieldArrayProps) => {
  const { control, watch, setValue } = form;

  const { fields, append, remove, update, move } = useFieldArray({
    control,
    name: "tasks",
  });

  const watchedTasks = watch("tasks");

  const { generalFields, individualFields } = useMemo(() => {
    const generalFieldsArr: Array<
      Task & { fieldId: string; taskIndex: number }
    > = [];
    const individualFieldsArr: Array<
      Task & { fieldId: string; taskIndex: number }
    > = [];

    fields.forEach((field, index) => {
      const task = watchedTasks[index];
      if (task) {
        const fieldWithIndex = {
          ...task,
          fieldId: field.id,
          taskIndex: index,
        };
        if (task.category === "general") {
          generalFieldsArr.push(fieldWithIndex);
        } else {
          individualFieldsArr.push(fieldWithIndex);
        }
      }
    });

    return {
      generalFields: generalFieldsArr,
      individualFields: individualFieldsArr,
    };
  }, [fields, watchedTasks]);

  const addTask = useCallback(
    (category: string): string => {
      const newTaskId = uuid();
      const existingTasksInCategory = watchedTasks.filter(
        (task) => task.category === category,
      );
      const newOrder = existingTasksInCategory.reduce(
        (maxOrder, task) => Math.max(maxOrder, task.order + 1),
        0,
      );

      const newTask: Task = {
        id: newTaskId,
        name: "",
        description: "",
        category: category as "general" | "individual",
        order: newOrder,
        templateNotes: "",
      };

      append(newTask);
      return newTaskId;
    },
    [append, watchedTasks],
  );

  const removeTask = useCallback(
    (category: string, taskId: string) => {
      const index = watchedTasks.findIndex((task) => task.id === taskId);
      if (index !== -1) {
        remove(index);
      }
    },
    [remove, watchedTasks],
  );

  const updateTask = useCallback(
    (taskId: string, updates: { field: string; value: string }[]) => {
      const index = watchedTasks.findIndex((task) => task.id === taskId);
      if (index === -1) return;

      const currentTask = watchedTasks[index];
      const updatedTask = { ...currentTask };

      updates.forEach((upd) => {
        if (upd.field === "task" || upd.field === "name") {
          updatedTask.name = upd.value;
        } else if (upd.field === "description") {
          updatedTask.description = upd.value;
        } else if (upd.field === "templateNotes") {
          updatedTask.templateNotes = upd.value;
        }
      });

      update(index, updatedTask);
    },
    [update, watchedTasks],
  );

  const reorderTasks = useCallback(
    (sourceId: string, targetId: string, edge: string | null) => {
      const sourceIndex = watchedTasks.findIndex(
        (task) => task.id === sourceId,
      );
      const targetIndex = watchedTasks.findIndex(
        (task) => task.id === targetId,
      );

      if (sourceIndex === -1 || targetIndex === -1) return;

      let finalTargetIndex = targetIndex;

      if (sourceIndex < targetIndex) {
        if (edge === "top") finalTargetIndex = targetIndex - 1;
      } else {
        if (edge === "bottom") finalTargetIndex = targetIndex + 1;
      }

      if (finalTargetIndex !== sourceIndex) {
        move(sourceIndex, finalTargetIndex);
      }
    },
    [move, watchedTasks],
  );

  const moveTaskBetweenCategories = useCallback(
    (
      sourceId: string,
      destCategory: string,
      targetId: string | null,
      edge: string | null,
    ) => {
      const sourceIndex = watchedTasks.findIndex(
        (task) => task.id === sourceId,
      );

      if (sourceIndex === -1) return;

      const task = watchedTasks[sourceIndex];
      update(sourceIndex, {
        ...task,
        category: destCategory as "general" | "individual",
      });

      let finalTargetIndex = -1;

      if (targetId) {
        const targetIndex = watchedTasks.findIndex(
          (task) => task.id === targetId,
        );
        if (targetIndex !== -1) {
          if (sourceIndex < targetIndex) {
            if (edge === "top") finalTargetIndex = targetIndex - 1;
            else finalTargetIndex = targetIndex;
          } else {
            if (edge === "bottom") finalTargetIndex = targetIndex + 1;
            else finalTargetIndex = targetIndex;
          }
        }
      } else {
        finalTargetIndex = watchedTasks.length - 1;
      }

      if (finalTargetIndex !== -1 && finalTargetIndex !== sourceIndex) {
        move(sourceIndex, finalTargetIndex);
      }
    },
    [move, update, watchedTasks],
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

      setValue("tasks", updatedTasks, { shouldValidate: true });
    },
    [setValue, watchedTasks],
  );

  return {
    fields,
    watchedTasks,
    generalFields,
    individualFields,
    addTask,
    removeTask,
    updateTask,
    reorderTasks,
    moveTaskBetweenCategories,
    transferAllTasks,
  };
};

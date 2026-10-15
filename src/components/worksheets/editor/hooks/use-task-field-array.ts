import { type Task, type WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { useCallback, useMemo } from "react";
import { UseFormReturn, useFieldArray, useWatch } from "react-hook-form";

import { DropEdge, TaskCategory, createTask, taskMove } from "../editor-model";

interface UseTaskFieldArrayProps {
  form: UseFormReturn<WorksheetWithTasks>;
}

export const useTaskFieldArray = ({ form }: UseTaskFieldArrayProps) => {
  const { control, setValue, getValues } = form;

  const { fields, append, remove, move, replace } = useFieldArray({
    control,
    name: "tasks",
  });

  const watchedTasks = useWatch({ control, name: "tasks" });

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
    (category: TaskCategory): string => {
      const watchedTasks = getValues("tasks");
      const newTask = createTask(
        category,
        watchedTasks.filter((task) => task.category === category).length,
      );

      append(newTask);
      return newTask.id;
    },
    [append, getValues],
  );

  const removeTask = useCallback(
    (category: TaskCategory, taskId: string) => {
      const index = getValues("tasks").findIndex((task) => task.id === taskId);
      if (index !== -1) {
        remove(index);
      }
    },
    [remove, getValues],
  );

  const moveTaskBetweenCategories = useCallback(
    (
      sourceId: string,
      category: TaskCategory,
      targetId: string | null,
      edge: DropEdge,
    ) => {
      const operation = taskMove(
        getValues("tasks"),
        sourceId,
        category,
        targetId,
        edge,
      );
      if (!operation) return;
      setValue(`tasks.${operation.from}.category`, category, {
        shouldDirty: true,
      });
      if (operation.from !== operation.to) move(operation.from, operation.to);
    },
    [getValues, setValue, move],
  );
  const reorderTasks = useCallback(
    (sourceId: string, targetId: string, edge: DropEdge) => {
      const source = getValues("tasks").find((task) => task.id === sourceId);
      if (source)
        moveTaskBetweenCategories(sourceId, source.category, targetId, edge);
    },
    [getValues, moveTaskBetweenCategories],
  );

  const transferAllTasks = useCallback(
    (sourceCategory: TaskCategory, destCategory: TaskCategory) => {
      if (sourceCategory === destCategory) return;

      const watchedTasks = getValues("tasks");
      const tasksToMove = watchedTasks.filter(
        (task) => task.category === sourceCategory,
      );

      if (tasksToMove.length === 0) return;

      const updatedTasks = watchedTasks.map((task) =>
        task.category === sourceCategory
          ? { ...task, category: destCategory }
          : task,
      );

      replace(updatedTasks);
    },
    [replace, getValues],
  );

  return {
    fields,
    watchedTasks,
    generalFields,
    individualFields,
    addTask,
    removeTask,
    reorderTasks,
    moveTaskBetweenCategories,
    transferAllTasks,
  };
};

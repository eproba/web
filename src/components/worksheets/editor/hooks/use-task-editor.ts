import { WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

import { hasTaskContent } from "../editor-model";
import { useDragDropHandler } from "./use-drag-drop-handler";
import { useMobileTaskMovements } from "./use-mobile-task-movements";
import { useTaskFieldArray } from "./use-task-field-array";

export function useTaskEditor(
  form: UseFormReturn<WorksheetWithTasks>,
  initiallyCategorized: boolean,
  variant: "worksheet" | "template",
) {
  const tasks = useTaskFieldArray({ form });
  useDragDropHandler(tasks);
  const movements = useMobileTaskMovements({ form, ...tasks });
  // Existing content must never be hidden by an organization-based default.
  const [enableCategories, setEnableCategories] = useState(
    () =>
      initiallyCategorized ||
      form
        .getValues("tasks")
        .some(
          (task) =>
            task.category === "individual" &&
            hasTaskContent(task, variant === "template"),
        ),
  );
  const [descriptionPreference, setDescriptionPreference] = useState<
    boolean | null
  >(null);
  const hasDescriptions = tasks.watchedTasks.some(
    (task) =>
      task.description.trim() ||
      (variant === "template" && task.templateNotes?.trim()),
  );
  const showDescriptions = descriptionPreference ?? hasDescriptions;
  const toggleCategories = () => {
    if (enableCategories) tasks.transferAllTasks("individual", "general");
    setEnableCategories(!enableCategories);
  };
  return {
    ...tasks,
    ...movements,
    enableCategories,
    showDescriptions,
    toggleCategories,
    toggleDescriptions: () => setDescriptionPreference(!showDescriptions),
  };
}

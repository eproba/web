"use client";

import { Form } from "@/components/ui/form";
import { DragDropProvider } from "@/components/worksheets/editor/drag-drop-provider";
import { useDragDropHandler } from "@/components/worksheets/editor/hooks/use-drag-drop-handler";
import { useMobileTaskMovements } from "@/components/worksheets/editor/hooks/use-mobile-task-movements";
import { useTaskFieldArray } from "@/components/worksheets/editor/hooks/use-task-field-array";
import { useTemplateForm } from "@/components/worksheets/editor/hooks/use-template-form";
import { TaskControls } from "@/components/worksheets/editor/task-controls";
import { TasksSection } from "@/components/worksheets/editor/tasks-section";
import { TemplateWorksheetBasicInfo } from "@/components/worksheets/editor/template-basic-info";
import { WorksheetSubmitButton } from "@/components/worksheets/editor/worksheet-submit-button";
import { Task, WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { User } from "@/types/user";
import React, { useState } from "react";

interface TemplateEditorProps {
  initialData?: Partial<WorksheetWithTasks>;
  mode: "create" | "edit";
  redirectTo: string;
  currentUser: User;
}

export const TemplateEditor = ({
  initialData,
  mode,
  redirectTo,
  currentUser,
}: TemplateEditorProps) => {
  // Initialize form with initial data
  const { form, onSubmit, isSubmitting } = useTemplateForm({
    mode,
    redirectTo,
    initialData,
  });

  // Initialize task management with useFieldArray hook
  const {
    watchedTasks,
    generalFields,
    individualFields,
    updateTask,
    addTask,
    removeTask,
    reorderTasks,
    moveTaskBetweenCategories,
    transferAllTasks,
  } = useTaskFieldArray({ form });

  // Initialize drag and drop with a custom hook
  useDragDropHandler({
    reorderTasks,
    moveTaskBetweenCategories,
  });

  // Initialize mobile task movements hook
  const { handleMoveTaskUp, handleMoveTaskDown, handleMoveTaskToCategory } =
    useMobileTaskMovements({
      form,
      reorderTasks,
      moveTaskBetweenCategories,
    });

  // UI State
  const [showDescriptions, setShowDescriptions] = useState(false);
  const [userToggledDescriptions, setUserToggledDescriptions] = useState(false);
  const [enableCategories, setEnableCategories] = useState(
    currentUser.organization === 0,
  );

  // Watch tasks for changes to auto-enable descriptions
  const hasDescriptions = (watchedTasks || []).some(
    (task: Task) => task.description?.trim() || task.templateNotes?.trim(),
  );

  // Calculate effective show descriptions state
  // Show if user manually enabled it OR (it has descriptions AND user hasn't manually disabled it)
  const shouldShowDescriptions = userToggledDescriptions
    ? showDescriptions
    : showDescriptions || hasDescriptions;

  const handleToggleDescriptions = () => {
    setUserToggledDescriptions(true);
    setShowDescriptions(!shouldShowDescriptions);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
      e.preventDefault();
    }
  };

  return (
    <DragDropProvider>
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="duration-300relative space-y-8 transition-all"
          onKeyDown={handleKeyDown}
        >
          <TemplateWorksheetBasicInfo form={form} currentUser={currentUser} />

          <TaskControls
            showDescriptions={shouldShowDescriptions}
            enableCategories={enableCategories}
            onToggleDescriptions={handleToggleDescriptions}
            onToggleCategories={() => {
              if (enableCategories) {
                transferAllTasks("individual", "general");
              }
              setEnableCategories(!enableCategories);
            }}
          />

          <TasksSection
            form={form}
            generalTasks={generalFields}
            individualTasks={individualFields}
            showDescriptions={shouldShowDescriptions}
            enableCategories={enableCategories}
            onUpdateTask={updateTask}
            onAddTask={addTask}
            onRemoveTask={removeTask}
            onMoveTaskUp={handleMoveTaskUp}
            onMoveTaskDown={handleMoveTaskDown}
            onMoveTaskToCategory={handleMoveTaskToCategory}
            variant="template"
          />

          <WorksheetSubmitButton
            isSubmitting={isSubmitting}
            mode={mode}
            variant="template"
          />
        </form>
      </Form>
    </DragDropProvider>
  );
};

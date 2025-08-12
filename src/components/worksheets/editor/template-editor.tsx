"use client";

import { Form } from "@/components/ui/form";
import { DragDropProvider } from "@/components/worksheets/editor/drag-drop-provider";
import { useDragDropHandler } from "@/components/worksheets/editor/hooks/use-drag-drop-handler";
import { useMobileTaskMovements } from "@/components/worksheets/editor/hooks/use-mobile-task-movements";
import { useTemplateForm } from "@/components/worksheets/editor/hooks/use-template-form";
import { useWorksheetTasks } from "@/components/worksheets/editor/hooks/use-worksheet-tasks";
import { TaskControls } from "@/components/worksheets/editor/task-controls";
import { TasksSection } from "@/components/worksheets/editor/tasks-section";
import { TemplateWorksheetBasicInfo } from "@/components/worksheets/editor/template-basic-info";
import { WorksheetSubmitButton } from "@/components/worksheets/editor/worksheet-submit-button";
import { Task, WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { User } from "@/types/user";
import React, { useEffect, useState } from "react";

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

  // Initialize task management with a custom hook
  const {
    generalTasks,
    individualTasks,
    updateTask,
    addTask,
    removeTask,
    reorderTasks,
    moveTaskBetweenCategories,
    updateTasksInForm,
    transferAllTasks,
  } = useWorksheetTasks({ form });

  // Initialize drag and drop with a custom hook
  useDragDropHandler({
    watchedTasks: form.watch("tasks"),
    updateTasksInForm,
    reorderTasks,
    moveTaskBetweenCategories,
  });

  // Initialize mobile task movements hook
  const { handleMoveTaskUp, handleMoveTaskDown, handleMoveTaskToCategory } =
    useMobileTaskMovements({
      form,
      reorderTasks,
      moveTaskBetweenCategories,
      updateTasksInForm,
    });

  // UI State
  const [showDescriptions, setShowDescriptions] = useState(false);
  const [userToggledDescriptions, setUserToggledDescriptions] = useState(false);
  const [enableCategories, setEnableCategories] = useState(
    currentUser.organization === 0,
  );

  // Watch tasks for changes to auto-enable descriptions
  const watchedTasks = form.watch("tasks");

  // Watch tasks for changes to auto-enable descriptions only if user hasn't made a choice
  useEffect(() => {
    const tasks = watchedTasks || [];
    const hasDescriptions = tasks.some(
      (task: Task) => task.description?.trim() || task.templateNotes?.trim(),
    );

    // Only auto-enable if the user hasn't explicitly toggled it
    if (hasDescriptions && !showDescriptions && !userToggledDescriptions) {
      setShowDescriptions(true);
    }
  }, [watchedTasks, showDescriptions, userToggledDescriptions]);

  const handleToggleDescriptions = () => {
    setShowDescriptions(!showDescriptions);
    setUserToggledDescriptions(true);
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
          {/* Template Basic Info */}
          <TemplateWorksheetBasicInfo form={form} currentUser={currentUser} />

          {/* Task Controls */}
          <TaskControls
            showDescriptions={showDescriptions}
            enableCategories={enableCategories}
            onToggleDescriptions={handleToggleDescriptions}
            onToggleCategories={() => {
              if (enableCategories) {
                transferAllTasks("individual", "general");
              }
              setEnableCategories(!enableCategories);
            }}
          />

          {/* Tasks Section */}
          <TasksSection
            form={form}
            generalTasks={generalTasks}
            individualTasks={individualTasks}
            showDescriptions={showDescriptions}
            enableCategories={enableCategories}
            onUpdateTask={updateTask}
            onAddTask={addTask}
            onRemoveTask={removeTask}
            onMoveTaskUp={handleMoveTaskUp}
            onMoveTaskDown={handleMoveTaskDown}
            onMoveTaskToCategory={handleMoveTaskToCategory}
            currentUser={currentUser}
            variant="template"
          />

          {/* Submit Button */}
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

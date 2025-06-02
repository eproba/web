"use client";
import React, { useEffect, useState } from "react";
import { TaskControls } from "@/components/worksheets/editor/task-controls";
import { TasksSection } from "@/components/worksheets/editor/tasks-section";
import { WorksheetBasicInfo } from "@/components/worksheets/editor/worksheet-basic-info";
import { WorksheetSubmitButton } from "@/components/worksheets/editor/worksheet-submit-button";
import { DragDropProvider } from "@/components/worksheets/editor/drag-drop-provider";
import { Form } from "@/components/ui/form";
import { useWorksheetForm } from "@/components/worksheets/editor/hooks/use-worksheet-form";
import { useWorksheetTasks } from "@/components/worksheets/editor/hooks/use-worksheet-tasks";
import { useDragDropHandler } from "@/components/worksheets/editor/hooks/use-drag-drop-handler";
import { Task, WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { User } from "@/types/user";
import { TemplateWorksheetBasicInfo } from "@/components/worksheets/editor/template-basic-info";

interface WorksheetEditorProps {
  initialData?: Partial<WorksheetWithTasks>;
  mode: "create" | "edit";
  variant?: "template" | "worksheet";
  redirectTo: string;
  currentUser: User;
}

export const WorksheetEditor = ({
  initialData,
  mode,
  variant = "worksheet",
  redirectTo,
  currentUser,
}: WorksheetEditorProps) => {
  // Initialize form with initial data
  const { form, onSubmit, isSubmitting } = useWorksheetForm({
    mode,
    redirectTo,
    initialData,
    currentUser,
    variant,
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

  // UI State
  const [showDescriptions, setShowDescriptions] = useState(false);
  const [userToggledDescriptions, setUserToggledDescriptions] = useState(false);
  const [enableCategories, setEnableCategories] = useState(
    initialData?.tasks
      ? initialData.tasks.some((task: Task) => task.category === "individual")
      : true,
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
      <div
        className="space-y-8 transition-all duration-300relative"
        onKeyDown={handleKeyDown}
      >
        <Form {...form}>
          {/* Worksheet Basic Info */}
          {variant === "worksheet" ? (
            <WorksheetBasicInfo form={form} currentUser={currentUser} />
          ) : (
            <TemplateWorksheetBasicInfo form={form} currentUser={currentUser} />
          )}

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
            currentUser={currentUser}
            variant={variant}
          />

          {/* Submit Button */}
          <WorksheetSubmitButton
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            mode={mode}
            variant={variant}
          />
        </Form>
      </div>
    </DragDropProvider>
  );
};

"use client";

import { DragDropProvider } from "@/components/worksheets/editor/drag-drop-provider";
import { useTemplateForm } from "@/components/worksheets/editor/hooks/use-template-form";
import { TaskControls } from "@/components/worksheets/editor/task-controls";
import { TasksSection } from "@/components/worksheets/editor/tasks-section";
import { TemplateWorksheetBasicInfo } from "@/components/worksheets/editor/template-basic-info";
import { WorksheetSubmitButton } from "@/components/worksheets/editor/worksheet-submit-button";
import { WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { User } from "@/types/user";
import React from "react";
import { FormProvider } from "react-hook-form";

import { useTaskEditor } from "./hooks/use-task-editor";

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

  const {
    generalFields,
    individualFields,
    addTask,
    removeTask,
    handleMoveTaskUp,
    handleMoveTaskDown,
    handleMoveTaskToCategory,
    enableCategories,
    showDescriptions,
    toggleCategories,
    toggleDescriptions,
  } = useTaskEditor(form, currentUser.organization === 0, "template");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
      e.preventDefault();
    }
  };

  return (
    <DragDropProvider>
      <FormProvider {...form}>
        <form
          onSubmit={onSubmit}
          className="duration-300relative space-y-8 transition-all"
          onKeyDown={handleKeyDown}
        >
          <TemplateWorksheetBasicInfo form={form} currentUser={currentUser} />

          <TaskControls
            showDescriptions={showDescriptions}
            enableCategories={enableCategories}
            onToggleDescriptions={toggleDescriptions}
            onToggleCategories={toggleCategories}
          />

          <TasksSection
            form={form}
            generalTasks={generalFields}
            individualTasks={individualFields}
            showDescriptions={showDescriptions}
            enableCategories={enableCategories}
            onAddTask={addTask}
            onRemoveTask={removeTask}
            onMoveTaskUp={handleMoveTaskUp}
            onMoveTaskDown={handleMoveTaskDown}
            onMoveTaskToCategory={handleMoveTaskToCategory}
            variant="template"
          />

          <WorksheetSubmitButton
            showDescriptions={showDescriptions}
            isSubmitting={isSubmitting}
            mode={mode}
            variant="template"
          />
        </form>
      </FormProvider>
    </DragDropProvider>
  );
};

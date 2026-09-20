"use client";

import { toast } from "@/components/ui/toast";
import { DragDropProvider } from "@/components/worksheets/editor/drag-drop-provider";
import { useWorksheetForm } from "@/components/worksheets/editor/hooks/use-worksheet-form";
import { ModifiedTasksDialog } from "@/components/worksheets/editor/modified-tasks-dialog";
import { TaskControls } from "@/components/worksheets/editor/task-controls";
import { TasksSection } from "@/components/worksheets/editor/tasks-section";
import { WorksheetBasicInfo } from "@/components/worksheets/editor/worksheet-basic-info";
import { WorksheetSubmitButton } from "@/components/worksheets/editor/worksheet-submit-button";
import { RequiredFunctionLevel } from "@/lib/const";
import { ToastMsg } from "@/lib/toast-msg";
import { Organization } from "@/types/team";
import { User } from "@/types/user";
import React, { useEffect } from "react";
import { FormProvider } from "react-hook-form";

import { EditorInitialData } from "./editor-model";
import { useTaskEditor } from "./hooks/use-task-editor";

interface WorksheetEditorProps {
  initialData?: EditorInitialData;
  mode: "create" | "edit";
  redirectTo: string;
  currentUser: User;
}

export const WorksheetEditor = ({
  initialData,
  mode,
  redirectTo,
  currentUser,
}: WorksheetEditorProps) => {
  const {
    form,
    onSubmit,
    confirmModifiedTasks,
    cancelConfirmation,
    modifiedTasks,
    isConfirming,
    isSubmitting,
  } = useWorksheetForm({ mode, redirectTo, initialData, currentUser });

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
  } = useTaskEditor(form, currentUser.organization === 0, "worksheet");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.target instanceof HTMLInputElement) {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (
      !initialData &&
      mode === "create" &&
      currentUser.organization === Organization.Male &&
      currentUser.function.numberValue >=
        RequiredFunctionLevel.WORKSHEET_MANAGEMENT
    ) {
      toast.add({
        ...ToastMsg({
          data: {
            title: "Tworzysz próbę na stopień?",
            description:
              "Skorzystaj z szablonów rekomendowanych przez Organizację Harcerzy ZHR.\nKliknij, aby zobaczyć dostępne szablony.",
            href: "/worksheets/templates#organization-templates",
          },
        }),
        type: "info",
        timeout: 30000,
        id: "worksheet-template-hint",
      });
    }
    return () => {
      // Cleanup toast when component unmounts
      toast.close("worksheet-template-hint");
    };
  }, [
    currentUser.function.numberValue,
    currentUser.organization,
    initialData,
    mode,
  ]);

  return (
    <DragDropProvider>
      <FormProvider {...form}>
        <form
          onSubmit={onSubmit}
          className="duration-300relative space-y-8 transition-all"
          onKeyDown={handleKeyDown}
        >
          <WorksheetBasicInfo form={form} currentUser={currentUser} />

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
            variant="worksheet"
          />
          <WorksheetSubmitButton
            showDescriptions={showDescriptions}
            isSubmitting={isSubmitting}
            mode={mode}
            variant="worksheet"
          />
        </form>
      </FormProvider>

      <ModifiedTasksDialog
        key={modifiedTasks.map((t) => t.id).join(",")}
        isOpen={isConfirming}
        onClose={cancelConfirmation}
        onContinue={confirmModifiedTasks}
        modifiedTasks={modifiedTasks}
      />
    </DragDropProvider>
  );
};

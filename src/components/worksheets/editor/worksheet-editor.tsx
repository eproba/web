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
import { useMobileTaskMovements } from "@/components/worksheets/editor/hooks/use-mobile-task-movements";
import { Task, WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { TaskStatus } from "@/types/worksheet";
import { User } from "@/types/user";
import { ModifiedTasksDialog } from "@/components/worksheets/editor/modified-tasks-dialog";

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
  redirectTo,
  currentUser,
}: WorksheetEditorProps) => {
  // State for modified tasks dialog
  const [modifiedTasks, setModifiedTasks] = useState<
    Array<{
      id: string;
      name: string;
      originalStatus: TaskStatus;
    }>
  >([]);
  const [showModifiedDialog, setShowModifiedDialog] = useState(false);

  // Handle modified tasks detection and continuation
  const handleModifiedTasksDetected = (
    tasks: Array<{
      id: string;
      name: string;
      originalStatus: TaskStatus;
    }>,
  ) => {
    setModifiedTasks(tasks);
    setShowModifiedDialog(true);
    return false; // Don't continue submission yet
  };

  // Handle continuing with selected task status decisions
  const handleContinueWithDecisions = async (tasksToKeepStatus: string[]) => {
    try {
      // Determine which tasks should have their status cleared
      const tasksToClear = modifiedTasks
        .filter((task) => !tasksToKeepStatus.includes(task.id))
        .map((task) => task.id);

      setShowModifiedDialog(false);
      setModifiedTasks([]);

      // Submit the form with current data, passing tasks to clear directly
      await submitWithCurrentData(tasksToClear);
    } catch (error) {
      console.error("Error handling task status decisions:", error);
    }
  };

  // Initialize form with initial data
  const {
    form,
    onSubmit,
    submitWithCurrentData,
    resetModifiedTasksHandling,
    isSubmitting,
  } = useWorksheetForm({
    mode,
    redirectTo,
    initialData,
    currentUser,
    onModifiedTasksDetected: handleModifiedTasksDetected,
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

  // Handle closing dialog
  const handleCloseDialog = () => {
    setShowModifiedDialog(false);
    // Clear modified tasks after dialog is closed
    setTimeout(() => {
      setModifiedTasks([]);
    }, 200);
    resetModifiedTasksHandling(); // Reset the flag so user can try again
  };

  return (
    <DragDropProvider>
      <div
        className="space-y-8 transition-all duration-300relative"
        onKeyDown={handleKeyDown}
      >
        <Form {...form}>
          {/* Worksheet Basic Info */}
          <WorksheetBasicInfo form={form} currentUser={currentUser} />

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
            variant="worksheet"
          />

          {/* Submit Button */}
          <WorksheetSubmitButton
            isSubmitting={isSubmitting}
            onSubmit={onSubmit}
            mode={mode}
            variant="worksheet"
          />
        </Form>

        {/* Modified Tasks Dialog */}
        <ModifiedTasksDialog
          isOpen={showModifiedDialog}
          onClose={handleCloseDialog}
          onContinue={handleContinueWithDecisions}
          modifiedTasks={modifiedTasks}
        />
      </div>
    </DragDropProvider>
  );
};

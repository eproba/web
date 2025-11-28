"use client";

import { Form } from "@/components/ui/form";
import { DragDropProvider } from "@/components/worksheets/editor/drag-drop-provider";
import { useDragDropHandler } from "@/components/worksheets/editor/hooks/use-drag-drop-handler";
import { useMobileTaskMovements } from "@/components/worksheets/editor/hooks/use-mobile-task-movements";
import { useTaskFieldArray } from "@/components/worksheets/editor/hooks/use-task-field-array";
import { useWorksheetForm } from "@/components/worksheets/editor/hooks/use-worksheet-form";
import { ModifiedTasksDialog } from "@/components/worksheets/editor/modified-tasks-dialog";
import { TaskControls } from "@/components/worksheets/editor/task-controls";
import { TasksSection } from "@/components/worksheets/editor/tasks-section";
import { WorksheetBasicInfo } from "@/components/worksheets/editor/worksheet-basic-info";
import { WorksheetSubmitButton } from "@/components/worksheets/editor/worksheet-submit-button";
import { RequiredFunctionLevel } from "@/lib/const";
import { Task, WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { ToastMsg } from "@/lib/toast-msg";
import { Organization } from "@/types/team";
import { User } from "@/types/user";
import { TaskStatus } from "@/types/worksheet";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface WorksheetEditorProps {
  initialData?: Partial<WorksheetWithTasks>;
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
  const [modifiedTasks, setModifiedTasks] = useState<
    Array<{
      id: string;
      name: string;
      originalStatus: TaskStatus;
    }>
  >([]);
  const [showModifiedDialog, setShowModifiedDialog] = useState(false);

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

  const handleContinueWithDecisions = async (tasksToKeepStatus: string[]) => {
    try {
      const tasksToClear = modifiedTasks
        .filter((task) => !tasksToKeepStatus.includes(task.id))
        .map((task) => task.id);

      setShowModifiedDialog(false);
      setModifiedTasks([]);

      await submitWithCurrentData(tasksToClear);
    } catch (error) {
      console.error("Error handling task status decisions:", error);
    }
  };

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

  useDragDropHandler({
    reorderTasks,
    moveTaskBetweenCategories,
  });

  const { handleMoveTaskUp, handleMoveTaskDown, handleMoveTaskToCategory } =
    useMobileTaskMovements({
      form,
      reorderTasks,
      moveTaskBetweenCategories,
    });

  const [showDescriptions, setShowDescriptions] = useState(false);
  const [userToggledDescriptions, setUserToggledDescriptions] = useState(false);
  const [enableCategories, setEnableCategories] = useState(
    currentUser.organization === 0,
  );

  const hasDescriptions = (watchedTasks || []).some((task: Task) =>
    task.description?.trim(),
  );

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

  const handleCloseDialog = () => {
    setShowModifiedDialog(false);
    setTimeout(() => {
      setModifiedTasks([]);
    }, 200);
    resetModifiedTasksHandling();
  };

  useEffect(() => {
    if (
      !initialData &&
      mode === "create" &&
      currentUser.organization === Organization.Male &&
      currentUser.function.numberValue >=
        RequiredFunctionLevel.WORKSHEET_MANAGEMENT
    ) {
      toast.info(
        ToastMsg({
          data: {
            title: "Tworzysz próbę na stopień?",
            description:
              "Skorzystaj z szablonów rekomendowanych przez Organizację Harcerzy ZHR.\nKliknij, aby zobaczyć dostępne szablony.",
            href: "/worksheets/templates#organization-templates",
          },
        }),
        {
          autoClose: 30000,
          toastId: "worksheet-template-hint",
        },
      );
    }
    return () => {
      // Cleanup toast when component unmounts
      toast.dismiss("worksheet-template-hint");
    };
  }, [
    currentUser.function.numberValue,
    currentUser.organization,
    initialData,
    mode,
  ]);

  return (
    <DragDropProvider>
      <Form {...form}>
        <form
          onSubmit={onSubmit}
          className="duration-300relative space-y-8 transition-all"
          onKeyDown={handleKeyDown}
        >
          <WorksheetBasicInfo form={form} currentUser={currentUser} />

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
            variant="worksheet"
          />
          <WorksheetSubmitButton
            isSubmitting={isSubmitting}
            mode={mode}
            variant="worksheet"
          />
        </form>
      </Form>

      <ModifiedTasksDialog
        key={modifiedTasks.map((t) => t.id).join(",")}
        isOpen={showModifiedDialog}
        onClose={handleCloseDialog}
        onContinue={handleContinueWithDecisions}
        modifiedTasks={modifiedTasks}
      />
    </DragDropProvider>
  );
};

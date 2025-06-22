import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Task,
  WorksheetWithTasks,
  worksheetWithTasksSchema,
} from "@/lib/schemas/worksheet";
import { TaskStatus } from "@/types/worksheet";
import { toast } from "react-toastify";
import { useApi } from "@/lib/api-client";
import { v4 as uuid } from "uuid";
import { ToastMsg } from "@/lib/toast-msg";
import { useRouter } from "nextjs-toploader/app";
import { User } from "@/types/user";

interface UseWorksheetFormProps {
  mode: "create" | "edit";
  redirectTo: string;
  initialData?: Partial<WorksheetWithTasks>;
  currentUser: User;
  variant: "template" | "worksheet";
  onModifiedTasksDetected?: (
    modifiedTasks: Array<{
      id: string;
      name: string;
      originalStatus: TaskStatus;
    }>,
  ) => boolean; // Returns true if submission should continue
}

export const useWorksheetForm = ({
  mode,
  redirectTo,
  initialData,
  currentUser,
  variant,
  onModifiedTasksDetected,
}: UseWorksheetFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tasksToClearStatus, setTasksToClearStatus] = useState<string[]>([]);
  const [hasHandledModifiedTasks, setHasHandledModifiedTasks] = useState(false);
  const { apiClient } = useApi();
  const router = useRouter();

  const defaultTasks = [
    ...["general", "individual"].flatMap((category) =>
      Array.from({ length: 3 }, (_, order) => ({
        id: uuid(),
        name: "",
        description: "",
        category,
        order,
      })),
    ),
  ] as Task[];

  const defaultValues: WorksheetWithTasks = {
    name: initialData?.name || "",
    description: initialData?.description || "",
    supervisor: initialData?.supervisor || "",
    userId: initialData?.userId || currentUser.id || "",
    tasks:
      initialData?.tasks && initialData.tasks.length > 0
        ? initialData.tasks
        : defaultTasks,
    templateNotes: initialData?.templateNotes || undefined,
  };

  const form = useForm<WorksheetWithTasks>({
    resolver: zodResolver(worksheetWithTasksSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: WorksheetWithTasks) => {
    await internalSubmit(data, false);
  };

  // Method to set tasks that should have their status cleared
  const setTasksToClear = (taskIds: string[]) => {
    setTasksToClearStatus(taskIds);
  };

  // Method to reset the modified tasks handling flag
  const resetModifiedTasksHandling = () => {
    setHasHandledModifiedTasks(false);
    setTasksToClearStatus([]);
  };

  // Internal submission function that bypasses dialog logic
  const internalSubmit = async (
    data: WorksheetWithTasks,
    skipDialogLogic = false,
    tasksToSkipStatusClear?: string[],
  ) => {
    if (isSubmitting) return;

    try {
      // Check for modified tasks with non-TODO status in edit mode (only if we haven't handled it yet and not skipping)
      if (
        !skipDialogLogic &&
        variant === "worksheet" &&
        mode === "edit" &&
        initialData?.tasks &&
        onModifiedTasksDetected &&
        !hasHandledModifiedTasks
      ) {
        const modifiedTasksWithStatus = data.tasks
          .filter((currentTask) => {
            const originalTask = initialData.tasks?.find(
              (t) => t.id === currentTask.id,
            );
            if (!originalTask) return false;

            const isModified =
              currentTask.name !== originalTask.name ||
              currentTask.description !== originalTask.description;

            const hasNonTodoStatus =
              "status" in originalTask &&
              originalTask.status !== TaskStatus.TODO;

            return isModified && hasNonTodoStatus;
          })
          .map((task) => {
            const originalTask = initialData.tasks?.find(
              (t) => t.id === task.id,
            ) as { status?: TaskStatus } | undefined;
            return {
              id: task.id,
              name: task.name,
              originalStatus: originalTask?.status || TaskStatus.TODO,
            };
          });

        if (modifiedTasksWithStatus.length > 0) {
          setHasHandledModifiedTasks(true);
          const shouldContinue = onModifiedTasksDetected(
            modifiedTasksWithStatus,
          );
          if (!shouldContinue) {
            setIsSubmitting(false);
            return;
          }
        }
      }

      setIsSubmitting(true);

      const validTasks = data.tasks.filter(
        (task) => task.name.trim() !== "" || task.description.trim() !== "",
      );

      if (validTasks.length === 0) {
        toast.error("Dodaj przynajmniej jedno zadanie");
        return;
      }

      const effectiveTasksToClear =
        tasksToSkipStatusClear || tasksToClearStatus;

      const worksheetData = {
        user_id: data.userId || undefined,
        name: data.name.trim(),
        description: data.description.trim(),
        supervisor: data.supervisor || undefined,
        tasks: validTasks.map((task) => ({
          id: task.id,
          task: task.name.trim(),
          description: task.description.trim(),
          category: task.category,
          order: task.order,
          template_notes: task.templateNotes?.trim() || undefined,
          ...(effectiveTasksToClear.includes(task.id) && {
            clear_status: true,
          }),
        })),
      };

      const endpoint = variant === "worksheet" ? "/worksheets/" : "/templates/";
      const url = mode === "edit" ? `${endpoint}${initialData?.id}/` : endpoint;

      await apiClient(url, {
        method: mode === "create" ? "POST" : "PUT",
        body: JSON.stringify(worksheetData),
      });

      toast.success(
        mode === "create"
          ? "Próba została utworzona"
          : "Próba została zaktualizowana",
      );

      router.push(redirectTo);
    } catch (error) {
      console.error("Error creating worksheet:", error);
      toast.error(
        ToastMsg({
          data: {
            title: "Błąd podczas tworzenia próby",
            description: error as Error,
          },
        }),
      );
    } finally {
      setIsSubmitting(false);
      setTasksToClearStatus([]);
      setHasHandledModifiedTasks(false);
    }
  };

  // Method to submit with current form data (for programmatic submission)
  const submitWithCurrentData = async (tasksToSkipStatusClear?: string[]) => {
    const currentData = form.getValues();

    const isValid = await form.trigger();
    if (!isValid) return;

    const effectiveTasksToClear = tasksToSkipStatusClear || tasksToClearStatus;

    try {
      await internalSubmit(currentData, true, effectiveTasksToClear);
    } catch (error) {
      console.error("Error in submitWithCurrentData:", error);
      throw error;
    }
  };

  const isDirty = form.formState.isDirty;
  const isValid = form.formState.isValid;
  const errors = form.formState.errors;
  const tasks = form.watch("tasks");

  const canSubmit = isValid && !isSubmitting && tasks.length > 0;

  return {
    form,
    onSubmit: form.handleSubmit(onSubmit),
    submitWithCurrentData,
    setTasksToClear,
    resetModifiedTasksHandling,
    isSubmitting,
    isDirty,
    isValid,
    canSubmit,
    errors,
  };
};

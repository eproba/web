import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  Task,
  WorksheetWithTasks,
  worksheetWithTasksSchema,
} from "@/lib/schemas/worksheet";
import { toast } from "react-toastify";
import { useApi } from "@/lib/api-client";
import { v4 as uuid } from "uuid";
import { ToastMsg } from "@/lib/toast-msg";
import { ApiError } from "@/lib/api";
import { useRouter } from "nextjs-toploader/app";

interface UseWorksheetFormProps {
  mode: "create" | "edit";
  redirectTo: string;
  initialData?: Partial<WorksheetWithTasks>;
  userId?: string;
}

export const useWorksheetForm = ({
  mode,
  redirectTo,
  initialData,
  userId,
}: UseWorksheetFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    userId: initialData?.userId || userId || "",
    tasks:
      initialData?.tasks && initialData.tasks.length > 0
        ? initialData.tasks
        : defaultTasks,
  };

  const form = useForm<WorksheetWithTasks>({
    resolver: zodResolver(worksheetWithTasksSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: WorksheetWithTasks) => {
    if (isSubmitting) return;

    try {
      setIsSubmitting(true);

      // Validate that we have at least one task with content
      const validTasks = data.tasks.filter(
        (task) => task.name.trim() !== "" || task.description.trim() !== "",
      );
      if (validTasks.length === 0) {
        toast.error("Dodaj przynajmniej jedno zadanie");
        return;
      }

      const worksheetData = {
        user_id: data.userId || undefined,
        name: data.name.trim(),
        description: data.description.trim(),
        supervisor: data.supervisor,
        tasks: validTasks.map((task) => ({
          id: task.id,
          task: task.name.trim(),
          description: task.description.trim(),
          category: task.category,
          order: task.order,
        })),
      };

      await apiClient(
        "/worksheets/" + (mode === "edit" ? `${initialData?.id}/` : ""),
        {
          method: mode === "create" ? "POST" : "PUT",
          body: JSON.stringify(worksheetData),
        },
      );

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
            description:
              error instanceof ApiError ? error.message : "Nieznany błąd",
          },
        }),
      );
    } finally {
      setIsSubmitting(false);
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
    isSubmitting,
    isDirty,
    isValid,
    canSubmit,
    errors,
  };
};

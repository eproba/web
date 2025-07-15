import { useApi } from "@/lib/api-client";
import {
  Task,
  WorksheetWithTasks,
  worksheetWithTasksSchema,
} from "@/lib/schemas/worksheet";
import { ToastMsg } from "@/lib/toast-msg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "nextjs-toploader/app";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuid } from "uuid";

interface UseTemplateFormProps {
  mode: "create" | "edit";
  redirectTo: string;
  initialData?: Partial<WorksheetWithTasks>;
}

export const useTemplateForm = ({
  mode,
  redirectTo,
  initialData,
}: UseTemplateFormProps) => {
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
    scope: initialData?.scope || "team",
    tasks:
      initialData?.tasks && initialData.tasks.length > 0
        ? initialData.tasks
        : defaultTasks,
    templateNotes: initialData?.templateNotes || undefined,
    image:
      (initialData as WorksheetWithTasks & { image?: string | File | null })
        ?.image || undefined,
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
        (task) =>
          task.name.trim() !== "" ||
          task.description.trim() ||
          task.templateNotes?.trim(),
      );
      if (validTasks.length === 0) {
        toast.error("Dodaj przynajmniej jedno zadanie");
        return;
      }

      if (!data.scope) {
        toast.error(
          "Template must be associated with either a team or an organization",
        );
        return;
      }

      const templateData = {
        name: data.name.trim(),
        description: data.description.trim(),
        scope: data.scope,
        tasks: validTasks.map((task) => ({
          id: task.id,
          task: task.name.trim(),
          description: task.description.trim(),
          category: task.category,
          order: task.order,
          template_notes: task.templateNotes?.trim() || undefined,
        })),
      };

      const url =
        mode === "edit" ? `/templates/${initialData?.id}/` : "/templates/";

      // Check if we need to use multipart (file upload or removal)
      if (data.image instanceof File) {
        // Use FormData for multipart request when uploading file or removing image
        const formData = new FormData();

        // Handle image field
        if (data.image instanceof File) {
          // New image file to upload
          formData.append("image", data.image);
        }

        // Add all template data as separate form fields
        formData.append("name", data.name.trim());
        formData.append("description", data.description.trim());

        formData.append("scope", data.scope);

        // Add tasks as JSON string (since it's complex data)
        formData.append("tasks", JSON.stringify(templateData.tasks));

        await apiClient(url, {
          method: mode === "create" ? "POST" : "PUT",
          body: formData,
        });
      } else {
        // Use JSON for regular request when no file changes
        await apiClient(url, {
          method: mode === "create" ? "POST" : "PUT",
          body: JSON.stringify({
            ...templateData,
            image: data.image === null ? null : undefined,
          }),
        });
      }

      toast.success(
        mode === "create"
          ? "Szablon został utworzony"
          : "Szablon został zaktualizowany",
      );

      router.push(redirectTo);
    } catch (error) {
      console.error("Error creating worksheet:", error);
      toast.error(
        ToastMsg({
          data: {
            title: "Błąd podczas tworzenia szablonu",
            description: error as Error,
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

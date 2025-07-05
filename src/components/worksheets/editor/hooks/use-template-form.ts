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
import { useRouter } from "nextjs-toploader/app";
import { User } from "@/types/user";

interface UseTemplateFormProps {
  mode: "create" | "edit";
  redirectTo: string;
  initialData?: Partial<WorksheetWithTasks>;
  currentUser: User;
}

export const useTemplateForm = ({
  mode,
  redirectTo,
  initialData,
  currentUser,
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
    teamId:
      initialData?.teamId ||
      (initialData?.organization == null ? currentUser.team : undefined),
    organization: initialData?.organization,
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

      if (!data.teamId && data.organization === null) {
        toast.error(
          "Template must be associated with either a team or an organization",
        );
        return;
      }

      const templateData = {
        name: data.name.trim(),
        description: data.description.trim(),
        ...(data.teamId || !currentUser.isStaff
          ? { team: data.teamId }
          : { organization: data.organization }),
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

        if (data.teamId) {
          formData.append("team", data.teamId);
        }
        if (data.organization !== null && data.organization !== undefined) {
          formData.append("organization", data.organization.toString());
        }

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

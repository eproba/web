import { toast } from "@/components/ui/toast";
import { useApi } from "@/lib/api-client";
import { WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "nextjs-toploader/app";
import { type BaseSyntheticEvent, useRef, useState } from "react";
import { Resolver, useForm } from "react-hook-form";

import {
  initialTasks,
  templateRequestBody,
  templateSaveSchema,
} from "../editor-model";

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

  const saving = useRef(false);
  const [defaultValues] = useState<WorksheetWithTasks>(() => ({
    name: initialData?.name || "",
    description: initialData?.description || "",
    scope: initialData?.scope || "team",
    tasks: initialTasks(initialData?.tasks),
    templateNotes: initialData?.templateNotes,
    image: initialData?.image,
    priority: initialData?.priority ?? 0,
  }));

  const form = useForm<WorksheetWithTasks>({
    resolver: zodResolver(templateSaveSchema) as Resolver<WorksheetWithTasks>,
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = async (data: WorksheetWithTasks) => {
    if (saving.current) return;
    saving.current = true;

    try {
      setIsSubmitting(true);

      await apiClient(
        mode === "edit" ? `/templates/${initialData?.id}/` : "/templates/",
        {
          method: mode === "create" ? "POST" : "PUT",
          body: templateRequestBody(data),
        },
      );

      toast.add({
        title:
          mode === "create"
            ? "Szablon został utworzony"
            : "Szablon został zaktualizowany",
        type: "success",
      });

      router.push(redirectTo);
    } catch {
      const message =
        "Nie udało się zapisać szablonu. Twoje zmiany pozostają w edytorze. Spróbuj ponownie.";
      form.setError("root.server", { message });
    } finally {
      saving.current = false;
      setIsSubmitting(false);
    }
  };

  return {
    form,
    onSubmit: (event?: BaseSyntheticEvent) =>
      form.handleSubmit(onSubmit)(event),
    isSubmitting,
  };
};

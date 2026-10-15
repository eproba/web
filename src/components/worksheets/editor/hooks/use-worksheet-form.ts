import { toast } from "@/components/ui/toast";
import { useApi } from "@/lib/api-client";
import { WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import { type BaseSyntheticEvent, useRef, useState } from "react";
import { Resolver, useForm } from "react-hook-form";

import {
  EditorInitialData,
  ModifiedTask,
  initialTasks,
  modifiedStatusTasks,
  worksheetPayload,
  worksheetSaveSchema,
} from "../editor-model";

type SaveState =
  | { phase: "editing" }
  | { phase: "confirming"; data: WorksheetWithTasks; tasks: ModifiedTask[] }
  | { phase: "saving" };
interface UseWorksheetFormProps {
  mode: "create" | "edit";
  redirectTo: string;
  initialData?: EditorInitialData;
  currentUser: User;
}

export const useWorksheetForm = ({
  mode,
  redirectTo,
  initialData,
  currentUser,
}: UseWorksheetFormProps) => {
  const [state, setState] = useState<SaveState>({ phase: "editing" });
  const saving = useRef(false);
  const { apiClient } = useApi();
  const router = useRouter();
  const defaultUserId = useSearchParams().get("defaultUserId");
  const [defaultValues] = useState<WorksheetWithTasks>(() => ({
    name: initialData?.name || "",
    description: initialData?.description || "",
    supervisor: initialData?.supervisor || "",
    userId: initialData?.userId || defaultUserId || currentUser.id || "",
    tasks: initialTasks(initialData?.tasks),
    templateNotes: initialData?.templateNotes,
    finalChallenge: initialData?.finalChallenge || "",
    finalChallengeDescription: initialData?.finalChallengeDescription || "",
  }));
  const form = useForm<WorksheetWithTasks>({
    resolver: zodResolver(worksheetSaveSchema) as Resolver<WorksheetWithTasks>,
    defaultValues,
    mode: "onChange",
  });
  const save = async (data: WorksheetWithTasks, clearStatus: string[] = []) => {
    if (saving.current) return;
    saving.current = true;
    setState({ phase: "saving" });
    try {
      await apiClient(
        mode === "edit" ? `/worksheets/${initialData?.id}/` : "/worksheets/",
        {
          method: mode === "edit" ? "PUT" : "POST",
          body: JSON.stringify(
            worksheetPayload(data, initialData?.templateId, clearStatus),
          ),
        },
      );
      toast.add({
        title:
          mode === "create"
            ? "Próba została utworzona"
            : "Próba została zaktualizowana",
        type: "success",
      });
      router.push(redirectTo);
    } catch {
      const message =
        "Nie udało się zapisać próby. Twoje zmiany pozostają w edytorze. Spróbuj ponownie.";
      form.setError("root.server", { message });
    } finally {
      saving.current = false;
      setState({ phase: "editing" });
    }
  };
  const onSubmit = (event?: BaseSyntheticEvent) =>
    form.handleSubmit(async (data) => {
      if (saving.current || state.phase === "confirming") return;
      const tasks =
        mode === "edit"
          ? modifiedStatusTasks(data.tasks, initialData?.tasks || [])
          : [];
      if (tasks.length) {
        setState({ phase: "confirming", data, tasks });
        return;
      }
      await save(data);
    })(event);
  const confirmModifiedTasks = async (keepStatus: string[]) => {
    if (state.phase !== "confirming") return;
    await save(
      state.data,
      state.tasks
        .filter((task) => !keepStatus.includes(task.id))
        .map((task) => task.id),
    );
  };
  return {
    form,
    onSubmit,
    confirmModifiedTasks,
    cancelConfirmation: () => setState({ phase: "editing" }),
    modifiedTasks: state.phase === "confirming" ? state.tasks : [],
    isConfirming: state.phase === "confirming",
    isSubmitting: state.phase === "saving",
  };
};

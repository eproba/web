import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { WorksheetWithTasks } from "@/lib/schemas/worksheet";
import { useFormContext } from "react-hook-form";

function errorMessages(value: unknown): string[] {
  if (!value || typeof value !== "object") return [];
  if ("message" in value && typeof value.message === "string") {
    return [
      value.message === "Invalid input"
        ? "Nieprawidłowe dane zadania. Sprawdź zadania przed ponownym zapisem."
        : value.message,
    ];
  }
  return Object.entries(value)
    .filter(([key]) => key !== "ref")
    .flatMap(([, child]) => errorMessages(child));
}

export function FormErrors({
  showDescriptions,
}: {
  showDescriptions: boolean;
}) {
  const {
    formState: { errors, submitCount },
  } = useFormContext<WorksheetWithTasks>();
  const messages = [...new Set(errorMessages(errors.root))];
  if (!submitCount || !Object.keys(errors).length) return null;
  const hasFieldErrors = Object.keys(errors).some((key) => key !== "root");
  const hasHiddenDescriptions =
    !showDescriptions &&
    Object.values(errors.tasks ?? {}).some(
      (error) =>
        error &&
        typeof error === "object" &&
        ("description" in error || "templateNotes" in error),
    );

  return (
    <Alert variant="destructive">
      <AlertTitle>Nie można zapisać zmian</AlertTitle>
      <AlertDescription>
        {messages.map((message) => (
          <p key={message}>{message}</p>
        ))}
        {hasFieldErrors && <p>Popraw zaznaczone pola i spróbuj ponownie.</p>}
        {hasHiddenDescriptions && (
          <p>Włącz „Opisy zadań”, aby zobaczyć błędy ukrytych pól.</p>
        )}
      </AlertDescription>
    </Alert>
  );
}

import { Task, Worksheet } from "@/types/worksheet";
import { TaskTable } from "@/components/worksheets/task-table";
import { WorksheetActions } from "@/components/worksheets/worksheet-actions";
import { User } from "@/types/user";

export function WorksheetItem({
  worksheet,
  variant = "user",
  updateTask,
  deleteWorksheet,
  currentUser,
}: {
  worksheet: Worksheet;
  variant?: "user" | "managed" | "shared" | "archived" | "review";
  updateTask?: (worksheetId: string, task: Task) => void;
  deleteWorksheet?: (worksheetId: string) => void;
  currentUser?: User;
}) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-md" id={worksheet.id}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-semibold">
            {worksheet.name}
            {(variant === "managed" || variant === "archived") && (
              <a
                href={`/profile/${worksheet.user?.id}`}
                className="text-primary"
              >
                {" "}
                - {worksheet.user?.displayName}
              </a>
            )}
          </h2>
          {worksheet.description && (
            <p className="text-sm text-muted-foreground">
              {worksheet.description}
            </p>
          )}
          {worksheet.supervisor && (
            <p className="text-sm text-muted-foreground">
              Opiekun:{" "}
              <a
                href={`/profile/${worksheet.supervisor}`}
                className="text-primary"
              >
                {worksheet.supervisorName}
              </a>
            </p>
          )}

          <p className="text-sm text-muted-foreground">
            Ostatnia aktualizacja: {worksheet.updatedAt.toLocaleString()}
          </p>
        </div>

        <WorksheetActions
          worksheet={worksheet}
          variant={variant}
          removeWorksheet={deleteWorksheet}
        />
      </div>

      <TaskTable
        worksheet={worksheet}
        variant={variant}
        updateTask={(task) => updateTask?.(worksheet.id, task)}
        currentUser={currentUser}
      />
    </div>
  );
}

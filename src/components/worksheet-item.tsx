import { Task, Worksheet } from "@/types/worksheet";
import { TaskTable } from "@/components/task-table";
import { WorksheetActions } from "@/components/worksheet-actions";

export function WorksheetItem({
  worksheet,
  variant = "user",
  updateWorksheet,
  updateTask,
  deleteWorksheet,
}: {
  worksheet: Worksheet;
  variant?: "user" | "managed" | "shared" | "archived";
  updateWorksheet?: (worksheet: Worksheet) => void;
  updateTask?: (worksheetId: string, task: Task) => void;
  deleteWorksheet?: (worksheetId: string) => void;
}) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-md">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-2xl font-semibold">
            {worksheet.name}
            {(variant === "managed" || variant === "archived") && (
              <span className="">
                {" "}- {worksheet.user?.nickname}
              </span>
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
        </div>

        <WorksheetActions worksheet={worksheet} variant={variant} deleteWorksheet={deleteWorksheet} />
      </div>

      <TaskTable worksheet={worksheet} variant={variant} updateTask={(task) => updateTask?.(worksheet.id, task)} />
    </div>
  );
}

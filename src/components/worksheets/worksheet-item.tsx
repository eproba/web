import { Task, Worksheet } from "@/types/worksheet";
import { TaskTable } from "@/components/worksheets/task-table";
import { WorksheetActions } from "@/components/worksheets/worksheet-actions";
import { User } from "@/types/user";
import Image from "next/image";

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
      <div>
        <div className="flex w-full justify-between items-center gap-2 mb-2">
          <h2 className="text-2xl font-semibold flex items-center">
            {worksheet.template?.image && (
              <Image
                alt={worksheet.template.name}
                className="size-10 rounded-md object-cover inline-block mr-2"
                width={40}
                height={40}
                src={worksheet.template.image}
              />
            )}
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

          <WorksheetActions
            worksheet={worksheet}
            variant={variant}
            removeWorksheet={deleteWorksheet}
          />
        </div>
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

      <TaskTable
        worksheet={worksheet}
        variant={variant}
        updateTask={(task) => updateTask?.(worksheet.id, task)}
        currentUser={currentUser}
      />
    </div>
  );
}

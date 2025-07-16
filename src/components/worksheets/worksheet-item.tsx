"use client";

import { TaskTable } from "@/components/worksheets/task-table";
import { WorksheetActions } from "@/components/worksheets/worksheet-actions";
import { User } from "@/types/user";
import { Task, Worksheet } from "@/types/worksheet";
import Image from "next/image";

export function WorksheetItem({
  worksheet,
  variant = "user",
  updateTask,
  deleteWorksheet,
  updateWorksheet,
  currentUser,
}: {
  worksheet: Worksheet;
  variant?: "user" | "managed" | "shared" | "archived" | "review";
  updateTask?: (worksheetId: string, task: Task) => void;
  deleteWorksheet?: (worksheetId: string) => void;
  updateWorksheet?: (worksheet: Worksheet) => void;
  currentUser?: User;
}) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-md" id={worksheet.id}>
      <div>
        <div className="mb-2 flex w-full items-center justify-between gap-2">
          <h2 className="flex text-2xl font-semibold">
            {worksheet.template?.image && (
              <Image
                alt={worksheet.template.name}
                className={`mr-2 inline-block size-10 rounded-md object-cover ${
                  worksheet.template.image.endsWith(".svg")
                    ? "dark:grayscale dark:invert"
                    : ""
                }`}
                width={40}
                height={40}
                src={worksheet.template.image}
              />
            )}
            <div className="self-center">
              {worksheet.name}
              {variant !== "user" && (
                <a
                  href={`/profile/${worksheet.user.id}`}
                  className="text-primary"
                >
                  {" "}
                  - {worksheet.user.displayName}
                </a>
              )}
            </div>
          </h2>

          <WorksheetActions
            worksheet={worksheet}
            variant={variant}
            removeWorksheet={deleteWorksheet}
            updateWorksheet={updateWorksheet}
            currentUser={currentUser}
          />
        </div>
        {worksheet.description && (
          <p className="text-muted-foreground text-sm whitespace-pre-wrap">
            {worksheet.description}
          </p>
        )}
        {worksheet.supervisor && (
          <p className="text-muted-foreground text-sm">
            Opiekun:{" "}
            <a
              href={`/profile/${worksheet.supervisor}`}
              className="text-primary"
            >
              {worksheet.supervisorName}
            </a>
          </p>
        )}

        <p className="text-muted-foreground text-xs">
          Ostatnia aktualizacja: {worksheet.updatedAt.toLocaleString()}
        </p>
      </div>

      <TaskTable
        worksheet={worksheet}
        variant={variant}
        updateTask={(task) => updateTask?.(worksheet.id, task)}
        removeWorksheet={deleteWorksheet}
        currentUser={currentUser}
      />
    </div>
  );
}

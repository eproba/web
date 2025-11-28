import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { TaskStatusIndicator } from "@/components/worksheets/task-status-indicator";
import { TaskStatus } from "@/types/worksheet";
import React, { useState } from "react";

interface ModifiedTask {
  id: string;
  name: string;
  originalStatus: TaskStatus;
}

interface ModifiedTasksDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue: (tasksToKeepStatus: string[]) => void;
  modifiedTasks: ModifiedTask[];
}

export const ModifiedTasksDialog = ({
  isOpen,
  onClose,
  onContinue,
  modifiedTasks,
}: ModifiedTasksDialogProps) => {
  // State to track which tasks should keep their status (default: all keep status)
  const [tasksToKeepStatus, setTasksToKeepStatus] = useState<Set<string>>(
    () => new Set(modifiedTasks.map((task) => task.id)),
  );

  const handleToggleTask = (taskId: string) => {
    setTasksToKeepStatus((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(taskId)) {
        newSet.delete(taskId);
      } else {
        newSet.add(taskId);
      }
      return newSet;
    });
  };

  const handleSelectAll = () => {
    setTasksToKeepStatus(new Set(modifiedTasks.map((task) => task.id)));
  };

  const handleDeselectAll = () => {
    setTasksToKeepStatus(new Set());
  };

  const handleContinue = () => {
    onContinue(Array.from(tasksToKeepStatus));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex max-h-[80vh] max-w-2xl flex-col">
        <DialogHeader>
          <DialogTitle>Zadania ze statusem zostały zmodyfikowane</DialogTitle>
          <DialogDescription>
            Poniższe zadania mają aktualny status i zostały zmodyfikowane.
            Wybierz, które zadania mają zachować swój status, a które mają być
            zresetowane do &quot;do zrobienia&quot;.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <div className="mb-4 flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSelectAll}
              className="text-xs"
            >
              Zachowaj wszystkie
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDeselectAll}
              className="text-xs"
            >
              Wyczyść wszystkie
            </Button>
          </div>

          <div className="max-h-96 space-y-3 overflow-y-auto pr-2">
            {modifiedTasks.map((task) => {
              const shouldKeepStatus = tasksToKeepStatus.has(task.id);

              return (
                <div key={task.id} className="bg-card rounded-lg border p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0 flex-1 space-y-2">
                      <p className="text-sm leading-relaxed font-medium">
                        {task.name || "Zadanie bez nazwy"}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground text-xs">
                          Aktualny status:
                        </span>
                        <TaskStatusIndicator
                          status={task.originalStatus}
                          format="badge"
                        />
                      </div>
                    </div>

                    <div className="flex shrink-0 items-center space-x-2">
                      <Label
                        htmlFor={`task-${task.id}`}
                        className="text-muted-foreground cursor-pointer text-xs"
                      >
                        Zachowaj status
                      </Label>
                      <Switch
                        id={`task-${task.id}`}
                        checked={shouldKeepStatus}
                        onCheckedChange={() => handleToggleTask(task.id)}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <DialogFooter className="flex-col gap-2 border-t pt-4 sm:flex-row">
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full sm:w-auto"
          >
            Anuluj
          </Button>
          <Button onClick={handleContinue} className="w-full sm:w-auto">
            Kontynuuj
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

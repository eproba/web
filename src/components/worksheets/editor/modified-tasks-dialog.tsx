import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { TaskStatus } from "@/types/worksheet";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { TaskStatusIndicator } from "@/components/worksheets/task-status-indicator";

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
    new Set(),
  );

  // Initialize with all tasks keeping their status when dialog opens
  useEffect(() => {
    if (isOpen && modifiedTasks.length > 0) {
      setTasksToKeepStatus(new Set(modifiedTasks.map((task) => task.id)));
    }
  }, [isOpen, modifiedTasks]);

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
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Zadania ze statusem zostały zmodyfikowane</DialogTitle>
          <DialogDescription>
            Poniższe zadania mają aktualny status i zostały zmodyfikowane.
            Wybierz, które zadania mają zachować swój status, a które mają być
            zresetowane do &quot;do zrobienia&quot;.
          </DialogDescription>
        </DialogHeader>

        <div className="flex-1 overflow-hidden">
          <div className="flex gap-2 mb-4">
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

          <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
            {modifiedTasks.map((task) => {
              const shouldKeepStatus = tasksToKeepStatus.has(task.id);

              return (
                <div key={task.id} className="p-4 border rounded-lg bg-card">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0 space-y-2">
                      <p className="font-medium text-sm leading-relaxed">
                        {task.name || "Zadanie bez nazwy"}
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">
                          Aktualny status:
                        </span>
                        <TaskStatusIndicator
                          status={task.originalStatus}
                          format="badge"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 shrink-0">
                      <Label
                        htmlFor={`task-${task.id}`}
                        className="text-xs text-muted-foreground cursor-pointer"
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

        <DialogFooter className="flex-col sm:flex-row gap-2 pt-4 border-t">
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

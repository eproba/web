"use client";
import React from "react";
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
import { Badge } from "@/components/ui/badge";

interface ModifiedTask {
  id: string;
  name: string;
  originalStatus: TaskStatus;
}

interface ModifiedTasksDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onClearAllStatuses: () => void;
  onContinueWithoutClearing: () => void;
  modifiedTasks: ModifiedTask[];
}

const getStatusDisplay = (
  status: TaskStatus,
): {
  label: string;
  variant: "default" | "secondary" | "destructive" | "outline";
} => {
  switch (status) {
    case TaskStatus.APPROVED:
      return { label: "Zatwierdzone", variant: "default" };
    case TaskStatus.AWAITING_APPROVAL:
      return { label: "Oczekuje na zatwierdzenie", variant: "secondary" };
    case TaskStatus.REJECTED:
      return { label: "Odrzucone", variant: "destructive" };
    case TaskStatus.TODO:
    default:
      return { label: "TODO", variant: "outline" };
  }
};

export const ModifiedTasksDialog = ({
  isOpen,
  onClose,
  onClearAllStatuses,
  onContinueWithoutClearing,
  modifiedTasks,
}: ModifiedTasksDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Zadania ze statusem zostały zmodyfikowane</DialogTitle>
          <DialogDescription>
            Poniższe zadania mają aktualny status i zostały zmodyfikowane. Co
            chcesz zrobić?
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 max-h-60 overflow-y-auto">
          {modifiedTasks.map((task) => {
            const statusDisplay = getStatusDisplay(task.originalStatus);
            return (
              <div key={task.id} className="p-3 border rounded-lg">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">
                      {task.name || "Zadanie bez nazwy"}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <span className="text-xs text-muted-foreground">
                        Status:
                      </span>
                      <Badge
                        variant={statusDisplay.variant}
                        className="text-xs"
                      >
                        {statusDisplay.label}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <DialogFooter className="flex-col sm:flex-row gap-2">
          <Button
            variant="outline"
            onClick={onClearAllStatuses}
            className="w-full sm:w-auto"
          >
            Wyczyść wszystkie statusy
          </Button>
          <Button
            onClick={onContinueWithoutClearing}
            className="w-full sm:w-auto"
          >
            Kontynuuj bez zmian
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

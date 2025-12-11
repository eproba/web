import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { TaskList } from "@/components/worksheets/editor/task-list";
import { type Task, type WorksheetWithTasks } from "@/lib/schemas/worksheet";
import React from "react";
import { UseFormReturn } from "react-hook-form";

interface TaskField extends Task {
  fieldId: string;
  taskIndex: number;
}

interface TasksSectionProps {
  form: UseFormReturn<WorksheetWithTasks>;
  generalTasks: TaskField[];
  individualTasks: TaskField[];
  showDescriptions: boolean;
  enableCategories: boolean;
  onAddTask: (category: string) => string;
  onRemoveTask: (category: string, id: string) => void;
  onMoveTaskUp: (category: string, taskId: string) => void;
  onMoveTaskDown: (category: string, taskId: string) => void;
  onMoveTaskToCategory: (
    taskId: string,
    fromCategory: string,
    toCategory: string,
  ) => void;
  variant: "template" | "worksheet";
}

export const TasksSection: React.FC<TasksSectionProps> = ({
  form,
  generalTasks,
  individualTasks,
  showDescriptions,
  enableCategories,
  onAddTask,
  onRemoveTask,
  onMoveTaskUp,
  onMoveTaskDown,
  onMoveTaskToCategory,
  variant,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        {/* General Tasks */}
        <TaskList
          title={enableCategories ? "Wymagania ogólne" : null}
          tasks={generalTasks}
          category="general"
          showDescriptions={showDescriptions}
          enableCategories={enableCategories}
          onAddTask={onAddTask}
          onRemoveTask={onRemoveTask}
          onMoveTaskUp={onMoveTaskUp}
          onMoveTaskDown={onMoveTaskDown}
          onMoveTaskToCategory={onMoveTaskToCategory}
          form={form}
          variant={variant}
        />

        {/* Individual Tasks (only when categories enabled) */}
        {enableCategories && (
          <TaskList
            title="Zadania indywidualne"
            tasks={individualTasks}
            category="individual"
            showDescriptions={showDescriptions}
            enableCategories={enableCategories}
            onAddTask={onAddTask}
            onRemoveTask={onRemoveTask}
            onMoveTaskUp={onMoveTaskUp}
            onMoveTaskDown={onMoveTaskDown}
            onMoveTaskToCategory={onMoveTaskToCategory}
            form={form}
            variant={variant}
          />
        )}
      </div>

      {/* Tasks validation error message */}
      <FormField
        control={form.control}
        name="tasks"
        render={() => (
          <FormItem>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

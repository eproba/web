import React from "react";
import { TaskList } from "@/components/worksheets/editor/task-list";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { UseFormReturn } from "react-hook-form";
import { type Task, type WorksheetWithTasks } from "@/lib/schemas/worksheet";

interface TasksSectionProps {
  form: UseFormReturn<WorksheetWithTasks>;
  generalTasks: Task[];
  individualTasks: Task[];
  showDescriptions: boolean;
  enableCategories: boolean;
  onUpdateTask: (
    category: string,
    id: string,
    updates: { field: string; value: string }[],
  ) => void;
  onAddTask: (category: string) => void;
  onRemoveTask: (category: string, id: string) => void;
}

export const TasksSection: React.FC<TasksSectionProps> = ({
  form,
  generalTasks,
  individualTasks,
  showDescriptions,
  enableCategories,
  onUpdateTask,
  onAddTask,
  onRemoveTask,
}) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row w-full gap-4">
        {/* General Tasks */}
        <TaskList
          title={enableCategories ? "Zadania ogólne" : null}
          tasks={generalTasks}
          category="general"
          showDescriptions={showDescriptions}
          enableCategories={enableCategories}
          onUpdateTask={onUpdateTask}
          onAddTask={onAddTask}
          onRemoveTask={onRemoveTask}
          form={form}
        />

        {/* Individual Tasks (only when categories enabled) */}
        {enableCategories && (
          <TaskList
            title="Zadania indywidualne"
            tasks={individualTasks}
            category="individual"
            showDescriptions={showDescriptions}
            enableCategories={enableCategories}
            onUpdateTask={onUpdateTask}
            onAddTask={onAddTask}
            onRemoveTask={onRemoveTask}
            form={form}
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

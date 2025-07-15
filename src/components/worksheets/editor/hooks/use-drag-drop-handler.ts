import { Task } from "@/lib/schemas/worksheet";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useCallback, useEffect, useRef } from "react";

interface UseDragDropHandlerProps {
  watchedTasks: Task[];
  updateTasksInForm: (tasks: Task[]) => void;
  reorderTasks: (
    tasks: Task[],
    sourceId: string,
    targetId: string,
    edge: string | null,
  ) => Task[];
  moveTaskBetweenCategories: (
    tasks: Task[],
    sourceId: string,
    destCategory: string,
    targetId: string,
    edge: string | null,
  ) => Task[];
}

export const useDragDropHandler = ({
  watchedTasks,
  updateTasksInForm,
  reorderTasks,
  moveTaskBetweenCategories,
}: UseDragDropHandlerProps) => {
  const cleanupRef = useRef<(() => void) | null>(null);

  // Use refs to store the latest values to avoid recreating the handler
  const watchedTasksRef = useRef(watchedTasks);
  const updateTasksInFormRef = useRef(updateTasksInForm);
  const reorderTasksRef = useRef(reorderTasks);
  const moveTaskBetweenCategoriesRef = useRef(moveTaskBetweenCategories);

  // Performance optimization: Only update refs when the reference changes
  // This prevents unnecessary re-renders when functions are recreated with same logic
  if (watchedTasksRef.current !== watchedTasks) {
    watchedTasksRef.current = watchedTasks;
  }

  if (updateTasksInFormRef.current !== updateTasksInForm) {
    updateTasksInFormRef.current = updateTasksInForm;
  }

  if (reorderTasksRef.current !== reorderTasks) {
    reorderTasksRef.current = reorderTasks;
  }

  if (moveTaskBetweenCategoriesRef.current !== moveTaskBetweenCategories) {
    moveTaskBetweenCategoriesRef.current = moveTaskBetweenCategories;
  }

  // Helper function to move task to category (for empty drops)
  const moveTaskToCategory = useCallback(
    (tasks: Task[], sourceId: string, destCategory: string): Task[] => {
      const newTasks = [...tasks];
      const taskToMoveIndex = newTasks.findIndex(
        (task) => task.id === sourceId,
      );

      if (taskToMoveIndex === -1) return tasks;

      const taskToMove = {
        ...newTasks[taskToMoveIndex],
        category: destCategory as "general" | "individual",
      };
      newTasks.splice(taskToMoveIndex, 1);
      newTasks.push(taskToMove);

      return newTasks.map((task, index) => ({ ...task, order: index }));
    },
    [],
  );

  const dragDropHandler = useCallback(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) return;

        const sourceId = source.data.id as string;
        const sourceCategory = source.data.category as string;
        const destCategory = destination.data.category as string;
        const targetId = destination.data.id as string;

        const closestEdge = (destination.data[Symbol.for("closestEdge")] ||
          extractClosestEdge(destination.data)) as string | null;

        requestAnimationFrame(() => {
          // Same category reordering
          if (sourceCategory === destCategory && targetId) {
            const newTasks = reorderTasksRef.current(
              watchedTasksRef.current,
              sourceId,
              targetId,
              closestEdge,
            );
            updateTasksInFormRef.current(newTasks);
            return;
          }

          // Cross-category movement
          if (sourceCategory !== destCategory) {
            if (targetId) {
              // Drop at specific position relative to another task
              const newTasks = moveTaskBetweenCategoriesRef.current(
                watchedTasksRef.current,
                sourceId,
                destCategory,
                targetId,
                closestEdge,
              );
              updateTasksInFormRef.current(newTasks);
            } else {
              // Drop on empty list or at the end of a list
              const newTasks = moveTaskToCategory(
                watchedTasksRef.current,
                sourceId,
                destCategory,
              );
              updateTasksInFormRef.current(newTasks);
            }
          }
        });
      },
    });
  }, [moveTaskToCategory]);

  useEffect(() => {
    // Clean up previous listeners
    if (cleanupRef.current) {
      cleanupRef.current();
    }

    const cleanup = dragDropHandler();
    cleanupRef.current = cleanup;

    return cleanup;
    /* eslint-disable-next-line react-hooks/exhaustive-deps */
  }, []);

  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);
};

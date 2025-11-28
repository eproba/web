import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useCallback, useEffect, useRef } from "react";

interface UseDragDropHandlerProps {
  reorderTasks: (
    sourceId: string,
    targetId: string,
    edge: string | null,
  ) => void;
  moveTaskBetweenCategories: (
    sourceId: string,
    destCategory: string,
    targetId: string | null,
    edge: string | null,
  ) => void;
}

export const useDragDropHandler = ({
  reorderTasks,
  moveTaskBetweenCategories,
}: UseDragDropHandlerProps) => {
  const cleanupRef = useRef<(() => void) | null>(null);

  const reorderTasksRef = useRef(reorderTasks);
  const moveTaskBetweenCategoriesRef = useRef(moveTaskBetweenCategories);

  useEffect(() => {
    reorderTasksRef.current = reorderTasks;
  }, [reorderTasks]);

  useEffect(() => {
    moveTaskBetweenCategoriesRef.current = moveTaskBetweenCategories;
  }, [moveTaskBetweenCategories]);

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
            reorderTasksRef.current(sourceId, targetId, closestEdge);
            return;
          }

          // Cross-category movement
          if (sourceCategory !== destCategory) {
            moveTaskBetweenCategoriesRef.current(
              sourceId,
              destCategory,
              targetId || null,
              closestEdge,
            );
          }
        });
      },
    });
  }, []);

  useEffect(() => {
    if (cleanupRef.current) {
      cleanupRef.current();
    }

    const cleanup = dragDropHandler();
    cleanupRef.current = cleanup;

    return cleanup;
  }, [dragDropHandler]);

  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);
};

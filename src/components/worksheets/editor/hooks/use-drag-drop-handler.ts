import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect } from "react";

import { DropEdge, TaskCategory } from "../editor-model";

interface UseDragDropHandlerProps {
  reorderTasks: (sourceId: string, targetId: string, edge: DropEdge) => void;
  moveTaskBetweenCategories: (
    sourceId: string,
    category: TaskCategory,
    targetId: string | null,
    edge: DropEdge,
  ) => void;
}
export const useDragDropHandler = ({
  reorderTasks,
  moveTaskBetweenCategories,
}: UseDragDropHandlerProps) => {
  useEffect(
    () =>
      monitorForElements({
        onDrop({ source, location }) {
          const destination = location.current.dropTargets[0];
          if (!destination || typeof source.data.id !== "string") return;
          const category = destination.data.category;
          if (category !== "general" && category !== "individual") return;
          const targetId =
            typeof destination.data.id === "string"
              ? destination.data.id
              : null;
          const rawEdge =
            destination.data[Symbol.for("closestEdge")] ??
            extractClosestEdge(destination.data);
          const edge =
            rawEdge === "top" || rawEdge === "bottom" ? rawEdge : null;
          if (source.data.category === category && targetId)
            reorderTasks(source.data.id, targetId, edge);
          else if (source.data.category !== category)
            moveTaskBetweenCategories(source.data.id, category, targetId, edge);
        },
      }),
    [reorderTasks, moveTaskBetweenCategories],
  );
};

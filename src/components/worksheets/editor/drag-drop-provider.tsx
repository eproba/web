import React, { createContext, useContext, useState } from "react";

interface DragState {
  isDragging: boolean;
  draggedItem: string | null;
  dragOverItem: string | null;
}

interface DragDropContextType {
  dragState: DragState;
  setDragState: React.Dispatch<React.SetStateAction<DragState>>;
}

const DragDropContext = createContext<DragDropContextType | null>(null);

export const useDragDrop = () => {
  const context = useContext(DragDropContext);
  if (!context) {
    throw new Error("useDragDrop must be used within DragDropProvider");
  }
  return context;
};

interface DragDropProviderProps {
  children: React.ReactNode;
}

export const DragDropProvider: React.FC<DragDropProviderProps> = ({
  children,
}) => {
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    draggedItem: null,
    dragOverItem: null,
  });

  return (
    <DragDropContext.Provider value={{ dragState, setDragState }}>
      {children}
    </DragDropContext.Provider>
  );
};

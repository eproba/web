import React from "react";
import { Button } from "@/components/ui/button";
import { AlignLeftIcon, InfoIcon, TagsIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface TaskControlsProps {
  showDescriptions: boolean;
  enableCategories: boolean;
  onToggleDescriptions: () => void;
  onToggleCategories: () => void;
}

export const TaskControls: React.FC<TaskControlsProps> = ({
  showDescriptions,
  enableCategories,
  onToggleDescriptions,
  onToggleCategories,
}) => {
  return (
    <div className="flex flex-row flex-wrap gap-4 items-start sm:items-center justify-between p-4 bg-muted/30 rounded-lg border">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-foreground">Zadania</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="size-4 text-muted-foreground" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              Dodaj zadania do swojej próby. Możesz je przeciągać, aby zmienić
              kolejność i kategorie.
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="flex flex-wrap gap-3">
        <Button
          type="button"
          variant={enableCategories ? "default" : "outline"}
          size="sm"
          onClick={onToggleCategories}
        >
          <TagsIcon className="size-4" />
          <span className="text-sm hidden sm:block">Kategorie</span>
        </Button>

        <Button
          type="button"
          variant={showDescriptions ? "default" : "outline"}
          size="sm"
          onClick={onToggleDescriptions}
        >
          <AlignLeftIcon className="size-4" />
          <span className="text-sm hidden sm:block">Opisy zadań</span>
        </Button>
      </div>
    </div>
  );
};

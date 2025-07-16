import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AlignLeftIcon, InfoIcon, TagsIcon } from "lucide-react";
import React from "react";

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
    <div className="bg-muted/30 flex flex-row flex-wrap items-start justify-between gap-4 rounded-lg border p-4 sm:items-center">
      <div className="flex items-center gap-2">
        <h2 className="text-foreground text-xl font-semibold">Zadania</h2>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <InfoIcon className="text-muted-foreground size-4" />
            </TooltipTrigger>
            <TooltipContent className="max-w-xs">
              Dodaj zadania do tej próby. Możesz je przeciągać, aby zmienić
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
          <span className="hidden text-sm sm:block">Kategorie</span>
        </Button>

        <Button
          type="button"
          variant={showDescriptions ? "default" : "outline"}
          size="sm"
          onClick={onToggleDescriptions}
        >
          <AlignLeftIcon className="size-4" />
          <span className="hidden text-sm sm:block">Opisy zadań</span>
        </Button>
      </div>
    </div>
  );
};

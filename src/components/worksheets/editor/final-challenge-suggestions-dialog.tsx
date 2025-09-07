import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FilterableList } from "@/components/worksheets/editor/filterable-list";
import finalChallengeIdeasData from "@/data/final-challenge-ideas.json";
import { SparklesIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface FinalChallengeIdea {
  name: string;
  description: string;
  tags: string[];
}

interface FinalChallengeSuggestionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddFinalChallenge: (finalChallenge: {
    name: string;
    description: string;
  }) => void;
}

export const FinalChallengeSuggestionsDialog: React.FC<
  FinalChallengeSuggestionsDialogProps
> = ({ open, onOpenChange, onAddFinalChallenge }) => {
  const [finalChallengeIdeas, setFinalChallengeIdeas] = useState<
    FinalChallengeIdea[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load final challenge ideas from the imported JSON data
  useEffect(() => {
    const loadFinalChallengeIdeas = async () => {
      try {
        setIsLoading(true);
        // Use the imported JSON data
        setFinalChallengeIdeas(finalChallengeIdeasData as FinalChallengeIdea[]);
      } catch (error) {
        console.error("Failed to load final challenge ideas:", error);
        setFinalChallengeIdeas([]);
      } finally {
        setIsLoading(false);
      }
    };

    if (open) {
      loadFinalChallengeIdeas();
    }
  }, [open]);

  const handleAddFinalChallengeIdea = (idea: FinalChallengeIdea) => {
    onAddFinalChallenge({
      name: idea.name,
      description: idea.description,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex h-[85vh] flex-col sm:h-[70vh] sm:max-w-2xl"
        aria-describedby={undefined}
      >
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <SparklesIcon className="h-5 w-5 text-blue-500" />
            Pomysły na próby końcowe
          </DialogTitle>
        </DialogHeader>

        <FilterableList
          items={finalChallengeIdeas}
          isLoading={isLoading}
          searchPlaceholder="Szukaj pomysłów na próby końcowe..."
          emptyStateMessage="Nie znaleziono pomysłów pasujących do kryteriów"
          onItemSelect={handleAddFinalChallengeIdea}
          selectButtonText="Wybierz"
          showMaxAgeFilter={false}
          loadingMessage="Ładowanie pomysłów na próby końcowe..."
          className="data-[state=active]:flex"
        />
      </DialogContent>
    </Dialog>
  );
};

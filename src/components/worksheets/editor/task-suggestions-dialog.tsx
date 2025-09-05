import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { FilterableList } from "@/components/worksheets/editor/filterable-list";
import taskIdeasData from "@/data/task-ideas.json";
import { SparklesIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Tag {
  name: string;
  description: string;
}

interface TagGroup {
  name: string;
  tags: Tag[];
}

interface TaskIdea {
  name: string;
  description: string;
  tags: string[];
  minAge?: number;
}

interface TaskSuggestionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (task: { name: string; description: string }) => void;
}

export const TaskSuggestionsDialog: React.FC<TaskSuggestionsDialogProps> = ({
  open,
  onOpenChange,
  onAddTask,
}) => {
  const [taskIdeas, setTaskIdeas] = useState<{
    tagGroups: TagGroup[];
    ideas: TaskIdea[];
  }>({ tagGroups: [], ideas: [] });
  const [isLoading, setIsLoading] = useState(true);

  // Load task ideas from JSON file
  useEffect(() => {
    const loadTaskIdeas = async () => {
      try {
        setIsLoading(true);
        // Use the imported JSON data
        setTaskIdeas(taskIdeasData);
      } catch (error) {
        console.error("Failed to load task ideas:", error);
        setTaskIdeas({ tagGroups: [], ideas: [] });
      } finally {
        setIsLoading(false);
      }
    };

    if (open) {
      loadTaskIdeas();
    }
  }, [open]);

  const handleAddTaskIdea = (idea: TaskIdea) => {
    onAddTask({
      name: idea.name,
      description: idea.description,
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex h-[85vh] flex-col pb-2 sm:h-[70vh] sm:max-w-2xl"
        aria-describedby={undefined}
      >
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <SparklesIcon className="h-5 w-5 text-blue-500" />
            Pomysły na zadania indywidualne
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="browse"
          className="flex min-h-0 w-full flex-1 flex-col"
        >
          {/*<TabsList className="grid w-full flex-shrink-0 grid-cols-2">*/}
          {/*  <TabsTrigger value="browse" className="flex items-center gap-2">*/}
          {/*    <SearchIcon className="size-4" />*/}
          {/*    Przeglądaj pomysły*/}
          {/*  </TabsTrigger>*/}
          {/*  <TabsTrigger value="ai-chat" className="flex items-center gap-2">*/}
          {/*    <SparklesIcon className="size-4" />*/}
          {/*    Czat z AI*/}
          {/*  </TabsTrigger>*/}
          {/*</TabsList>*/}

          <TabsContent
            value="browse"
            className="flex min-h-0 flex-1 flex-col space-y-2 data-[state=active]:flex"
          >
            <FilterableList
              tagGroups={taskIdeas.tagGroups}
              items={taskIdeas.ideas}
              isLoading={isLoading}
              searchPlaceholder="Szukaj pomysłów na zadania..."
              emptyStateMessage="Nie znaleziono pomysłów pasujących do kryteriów"
              onItemSelect={handleAddTaskIdea}
              selectButtonText="Wybierz"
              loadingMessage="Ładowanie pomysłów na zadania..."
              className="data-[state=active]:flex"
            />
            <span className="m-0 p-0 text-center text-xs text-gray-500">
              pomysły na zadania pochodzą od Organizacji Harcerzy ZHR
            </span>
          </TabsContent>

          {/*<TabsContent*/}
          {/*  value="ai-chat"*/}
          {/*  className="min-h-0 flex-1 data-[state=active]:flex"*/}
          {/*>*/}
          {/*  <TaskSuggestionsChat*/}
          {/*    onAddTask={(suggestion: {*/}
          {/*      name: string;*/}
          {/*      description: string;*/}
          {/*    }) => {*/}
          {/*      onAddTask(suggestion);*/}
          {/*      onOpenChange(false);*/}
          {/*    }}*/}
          {/*  />*/}
          {/*</TabsContent>*/}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { FilterableList } from "@/components/worksheets/editor/filterable-list";
import { SparklesIcon } from "lucide-react";
import taskIdeasData from "@/data/task-ideas.json";

// interface Message {
//   id: string;
//   role: "user" | "assistant";
//   content: string;
//   timestamp: Date;
//   suggestions?: TaskSuggestion[];
// }

// interface TaskSuggestion {
//   name: string;
//   description: string;
// }

interface TaskIdea {
  name: string;
  description: string;
  tags: string[];
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
  const [taskIdeas, setTaskIdeas] = useState<TaskIdea[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load task ideas from JSON file
  useEffect(() => {
    const loadTaskIdeas = async () => {
      try {
        setIsLoading(true);
        // Use the imported JSON data
        setTaskIdeas(taskIdeasData as TaskIdea[]);
      } catch (error) {
        console.error("Failed to load task ideas:", error);
        setTaskIdeas([]);
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
        className="max-w-4xl sm:h-[70vh] h-[85vh] flex flex-col"
        aria-describedby={undefined}
      >
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-blue-500" />
            Pomysły na zadania indywidualne
          </DialogTitle>
        </DialogHeader>

        <Tabs
          defaultValue="browse"
          className="w-full flex flex-col flex-1 min-h-0"
        >
          {/*<TabsList className="grid w-full grid-cols-2 flex-shrink-0">*/}
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
            className="flex flex-col flex-1 min-h-0 space-y-4 data-[state=active]:flex"
          >
            <FilterableList
              items={taskIdeas}
              isLoading={isLoading}
              searchPlaceholder="Szukaj pomysłów na zadania..."
              emptyStateMessage="Nie znaleziono pomysłów pasujących do kryteriów"
              onItemSelect={handleAddTaskIdea}
              selectButtonText="Wybierz"
              loadingMessage="Ładowanie pomysłów na zadania..."
              className="data-[state=active]:flex"
            />
          </TabsContent>

          {/*<TabsContent*/}
          {/*  value="ai-chat"*/}
          {/*  className="flex-1 min-h-0 data-[state=active]:flex"*/}
          {/*>*/}
          {/*  <TaskSuggestionsChat*/}
          {/*    onAddTask={(suggestion: {*/}
          {/*      name: string;*/}
          {/*      description: string;*/}
          {/*    }) => {*/}
          {/*      onAddTask(suggestion);*/}
          {/*      onOpenChange(false);*/}
          {/*    }}*/}
          {/*    messages={chatMessages}*/}
          {/*    setMessages={setChatMessages}*/}
          {/*    inputMessage={chatInputMessage}*/}
          {/*    setInputMessage={setChatInputMessage}*/}
          {/*    isLoading={chatIsLoading}*/}
          {/*    setIsLoading={setChatIsLoading}*/}
          {/*  />*/}
          {/*</TabsContent>*/}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PlusIcon, SearchIcon, SparklesIcon, TagIcon } from "lucide-react";
import { TaskSuggestionsChat } from "./task-suggestions-chat";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: TaskSuggestion[];
}

interface TaskSuggestion {
  id: string;
  name: string;
  description: string;
}

interface TaskIdea {
  id: string;
  title: string;
  description: string;
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
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
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Chat state - persists across tab changes
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: `Cześć! Jestem tutaj, aby pomóc Ci w tworzeniu zadań indywidualnych. Opowiedz mi o temacie zajęć lub aktywności, a zasugeruję odpowiednie zadania.`,
      timestamp: new Date(),
    },
  ]);
  const [chatInputMessage, setChatInputMessage] = useState("");
  const [chatIsLoading, setChatIsLoading] = useState(false);

  // Mock data - this will come from API
  const mockTaskIdeas: TaskIdea[] = [
    {
      id: "1",
      title: "Rozpoznawanie śladów zwierząt",
      description:
        "Znajdź i zidentyfikuj co najmniej 5 różnych śladów zwierząt w okolicy",
      tags: ["natura", "obserwacja", "outdoor"],
      difficulty: "medium",
    },
    {
      id: "2",
      title: "Budowa schronienia w lesie",
      description:
        "Zbuduj tymczasowe schronienie używając tylko materiałów naturalnych",
      tags: ["bushcraft", "przetrwanie", "outdoor"],
      difficulty: "hard",
    },
    {
      id: "3",
      title: "Orientacja w terenie",
      description:
        "Znajdź drogę do wyznaczonego punktu używając mapy i kompasu",
      tags: ["orientacja", "mapa", "outdoor"],
      difficulty: "medium",
    },
    {
      id: "4",
      title: "Pierwsza pomoc",
      description:
        "Przeprowadź symulację udzielenia pierwszej pomocy w sytuacji wypadku",
      tags: ["pierwsza pomoc", "bezpieczeństwo", "medycyna"],
      difficulty: "easy",
    },
  ];

  const availableTags = [
    "natura",
    "obserwacja",
    "outdoor",
    "bushcraft",
    "przetrwanie",
    "orientacja",
    "mapa",
    "pierwsza pomoc",
    "bezpieczeństwo",
    "medycyna",
    "sport",
    "teamwork",
    "kreatywność",
    "historia",
    "kultura",
  ];

  const filteredIdeas = mockTaskIdeas.filter((idea) => {
    const matchesSearch =
      idea.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      idea.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every((tag) => idea.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const handleAddTaskIdea = (idea: TaskIdea) => {
    onAddTask({
      name: idea.title,
      description: idea.description,
    });
    onOpenChange(false);
  };

  const getDifficultyVariant = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "success";
      case "medium":
        return "warning";
      case "hard":
        return "destructive";
      default:
        return "default";
    }
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
          <TabsList className="grid w-full grid-cols-2 flex-shrink-0">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <SearchIcon className="w-4 h-4" />
              Przeglądaj pomysły
            </TabsTrigger>
            <TabsTrigger value="ai-chat" className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4" />
              Czat z AI
            </TabsTrigger>
          </TabsList>

          <TabsContent
            value="browse"
            className="flex flex-col flex-1 min-h-0 space-y-4 data-[state=active]:flex"
          >
            {/* Search and Filters */}
            <div className="space-y-3 flex-shrink-0">
              <Input
                placeholder="Szukaj pomysłów na zadania..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                startIcon={SearchIcon}
              />

              {/* Tag filters */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <TagIcon className="w-4 h-4" />
                  Filtry tagów:
                </div>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <Badge
                      key={tag}
                      variant={
                        selectedTags.includes(tag) ? "default" : "outline"
                      }
                      className="cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Task Ideas List */}
            <div className="flex-1 min-h-0">
              <ScrollArea className="h-full w-full pr-4">
                <div className="space-y-3">
                  {filteredIdeas.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <SearchIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Nie znaleziono pomysłów pasujących do kryteriów</p>
                    </div>
                  ) : (
                    filteredIdeas.map((idea) => (
                      <div
                        key={idea.id}
                        className="border rounded-lg p-4 hover:bg-muted transition-colors"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">
                            {idea.title}
                          </h3>
                          <Button
                            size="sm"
                            onClick={() => handleAddTaskIdea(idea)}
                            className="ml-2 flex-shrink-0"
                          >
                            <PlusIcon className="w-4 h-4 mr-1" />
                            Wybierz
                          </Button>
                        </div>

                        <p className="text-gray-600 mb-3">{idea.description}</p>

                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant={getDifficultyVariant(idea.difficulty)}
                          >
                            {idea.difficulty === "easy"
                              ? "Łatwe"
                              : idea.difficulty === "medium"
                                ? "Średnie"
                                : "Trudne"}
                          </Badge>
                          {idea.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </ScrollArea>
            </div>
          </TabsContent>

          <TabsContent
            value="ai-chat"
            className="flex-1 min-h-0 data-[state=active]:flex"
          >
            <TaskSuggestionsChat
              onAddTask={(suggestion: {
                name: string;
                description: string;
              }) => {
                onAddTask(suggestion);
                onOpenChange(false);
              }}
              messages={chatMessages}
              setMessages={setChatMessages}
              inputMessage={chatInputMessage}
              setInputMessage={setChatInputMessage}
              isLoading={chatIsLoading}
              setIsLoading={setChatIsLoading}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

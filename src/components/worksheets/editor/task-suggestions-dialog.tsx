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

interface TaskIdea {
  id: string;
  title: string;
  description: string;
  category: "general" | "individual";
  tags: string[];
  difficulty: "easy" | "medium" | "hard";
}

interface TaskSuggestionsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddTask: (task: { name: string; description: string }) => void;
  category: "general" | "individual";
}

export const TaskSuggestionsDialog: React.FC<TaskSuggestionsDialogProps> = ({
  open,
  onOpenChange,
  onAddTask,
  category,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Mock data - this will come from API
  const mockTaskIdeas: TaskIdea[] = [
    {
      id: "1",
      title: "Rozpoznawanie śladów zwierząt",
      description:
        "Znajdź i zidentyfikuj co najmniej 5 różnych śladów zwierząt w okolicy",
      category: "general",
      tags: ["natura", "obserwacja", "outdoor"],
      difficulty: "medium",
    },
    {
      id: "2",
      title: "Budowa schronienia w lesie",
      description:
        "Zbuduj tymczasowe schronienie używając tylko materiałów naturalnych",
      category: "individual",
      tags: ["bushcraft", "przetrwanie", "outdoor"],
      difficulty: "hard",
    },
    {
      id: "3",
      title: "Orientacja w terenie",
      description:
        "Znajdź drogę do wyznaczonego punktu używając mapy i kompasu",
      category: "general",
      tags: ["orientacja", "mapa", "outdoor"],
      difficulty: "medium",
    },
    {
      id: "4",
      title: "Pierwsza pomoc",
      description:
        "Przeprowadź symulację udzielenia pierwszej pomocy w sytuacji wypadku",
      category: "individual",
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
      selectedTags.some((tag) => idea.tags.includes(tag));
    const matchesCategory = idea.category === category;

    return matchesSearch && matchesTags && matchesCategory;
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "easy":
        return "bg-green-100 text-green-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "hard":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl h-[70vh]"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <SparklesIcon className="w-5 h-5 text-blue-500" />
            Pomysły na zadania{" "}
            {category === "general" ? "ogólne" : "indywidualne"}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse" className="flex items-center gap-2">
              <SearchIcon className="w-4 h-4" />
              Przeglądaj pomysły
            </TabsTrigger>
            <TabsTrigger value="ai-chat" className="flex items-center gap-2">
              <SparklesIcon className="w-4 h-4" />
              Czat z AI
            </TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4 h-full">
            {/* Search and Filters */}
            <div className="space-y-3">
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Szukaj pomysłów na zadania..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                  startIcon={SearchIcon}
                />
              </div>

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
                      className="cursor-pointer hover:bg-blue-100"
                      onClick={() => handleTagToggle(tag)}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Task Ideas List */}
            <ScrollArea className="w-full">
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
                        <h3 className="font-semibold text-lg">{idea.title}</h3>
                        <Button
                          size="sm"
                          onClick={() => handleAddTaskIdea(idea)}
                          className="ml-2"
                        >
                          <PlusIcon className="w-4 h-4 mr-1" />
                          Wybierz
                        </Button>
                      </div>

                      <p className="text-gray-600 mb-3">{idea.description}</p>

                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={getDifficultyColor(idea.difficulty)}>
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
          </TabsContent>

          <TabsContent value="ai-chat" className="space-y-4">
            <TaskSuggestionsChat
              category={category}
              onAddTask={(suggestion: {
                name: string;
                description: string;
              }) => {
                onAddTask(suggestion);
                onOpenChange(false);
              }}
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

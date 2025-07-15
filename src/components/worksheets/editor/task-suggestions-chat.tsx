import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  BotIcon,
  LoaderCircleIcon,
  PlusIcon,
  SendIcon,
  SparklesIcon,
  UserIcon,
} from "lucide-react";
import React, { useEffect, useRef } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  suggestions?: TaskSuggestion[];
}

interface TaskSuggestion {
  name: string;
  description: string;
}

interface TaskSuggestionsChatProps {
  onAddTask: (task: { name: string; description: string }) => void;
  messages: Message[];
  setMessages: React.Dispatch<React.SetStateAction<Message[]>>;
  inputMessage: string;
  setInputMessage: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TaskSuggestionsChat: React.FC<TaskSuggestionsChatProps> = ({
  onAddTask,
  messages,
  setMessages,
  inputMessage,
  setInputMessage,
  isLoading,
  setIsLoading,
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    // Auto-scroll to bottom when new messages are added
    if (scrollAreaRef.current) {
      const viewport = scrollAreaRef.current.querySelector(
        '[data-slot="scroll-area-viewport"]',
      );
      if (viewport) {
        viewport.scrollTop = viewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage("");
    setIsLoading(true);

    try {
      // Simulate AI response (replace with actual OpenAI API call)
      await simulateAIResponse(inputMessage.trim());
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      const errorMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content:
          "Przepraszam, wystąpił błąd podczas przetwarzania Twojej wiadomości. Spróbuj ponownie.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const simulateAIResponse = async (userInput: string) => {
    try {
      const response = await fetch("/ai/api/task-suggestions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userInput,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: data.content,
        timestamp: new Date(),
        suggestions: data.suggestions || [],
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error calling AI API:", error);

      // Fallback to mock response
      const mockSuggestions: TaskSuggestion[] = [
        {
          name: "Obserwacja ptaków w okolicy",
          description:
            "Zanotuj co najmniej 5 różnych gatunków ptaków wraz z ich zachowaniami",
        },
        {
          name: "Identyfikacja drzew liściastych",
          description:
            "Znajdź i opisz 3 różne gatunki drzew, zwracając uwagę na kształt liści",
        },
        {
          name: "Pomiar temperatury w różnych miejscach",
          description:
            "Zmierz temperaturę w słońcu, w cieniu i przy wodzie, porównaj wyniki",
        },
      ];

      const aiMessage: Message = {
        id: Date.now().toString(),
        role: "assistant",
        content: `Na podstawie Twojego zapytania: "${userInput}", oto kilka pomysłów na zadania indywidualne:`,
        timestamp: new Date(),
        suggestions: mockSuggestions,
      };

      setMessages((prev) => [...prev, aiMessage]);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleAddSuggestion = (suggestion: TaskSuggestion) => {
    onAddTask({
      name: suggestion.name,
      description: suggestion.description,
    });
  };

  return (
    <div className="flex h-full flex-col">
      {/* Chat Messages */}
      <div className="min-h-0 flex-1">
        <ScrollArea ref={scrollAreaRef} className="h-full p-4">
          <div className="space-y-4">
            {/* Messages */}
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start",
                )}
              >
                {message.role === "assistant" && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <BotIcon className="size-4 text-blue-600" />
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[80%] space-y-2",
                    message.role === "user" ? "items-end" : "items-start",
                  )}
                >
                  <Card
                    className={cn(
                      "p-3",
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-muted",
                    )}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {message.content}
                    </p>
                  </Card>

                  {/* Task Suggestions */}
                  {message.suggestions && message.suggestions.length > 0 && (
                    <div className="w-full space-y-2">
                      {message.suggestions.map((suggestion) => (
                        <Card
                          key={suggestion.name}
                          className="border-dashed p-3"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 space-y-1">
                              <h4 className="text-sm font-medium">
                                {suggestion.name}
                              </h4>
                              <p className="text-muted-foreground text-xs">
                                {suggestion.description}
                              </p>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleAddSuggestion(suggestion)}
                              className="flex-shrink-0"
                            >
                              <PlusIcon className="mr-1 h-3 w-3" />
                              Dodaj
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>
                  )}

                  <span className="text-muted-foreground text-xs">
                    {message.timestamp.toLocaleTimeString("pl-PL", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>

                {message.role === "user" && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                    <UserIcon className="size-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex justify-start gap-3">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
                  <BotIcon className="size-4 text-blue-600" />
                </div>
                <Card className="bg-muted p-3">
                  <div className="flex items-center gap-2">
                    <LoaderCircleIcon className="size-4 animate-spin" />
                    <span className="text-muted-foreground text-sm">
                      AI pracuje nad odpowiedzią...
                    </span>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Textarea
              ref={textareaRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Opisz tematykę zajęć lub zapytaj o konkretne zadania..."
              className="min-h-[80px] resize-none pr-12"
              disabled={isLoading}
            />
            <div className="absolute right-2 bottom-2 flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="h-8 w-8 p-0"
              >
                <SendIcon className="size-4" />
              </Button>
            </div>
          </div>
        </div>
        <div className="text-muted-foreground mt-2 text-xs">
          <SparklesIcon className="mr-1 inline h-3 w-3" />
          Przycisk Enter wysyła wiadomość, Shift+Enter nowa linia
        </div>
      </div>
    </div>
  );
};

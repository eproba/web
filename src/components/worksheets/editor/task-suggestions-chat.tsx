import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport, UIMessage } from "ai";
import {
  BotIcon,
  LoaderCircleIcon,
  PlusIcon,
  SendIcon,
  SparklesIcon,
  UserIcon,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

interface TaskSuggestion {
  name: string;
  description: string;
}

interface TaskSuggestionsChatProps {
  onAddTask: (task: { name: string; description: string }) => void;
}

function parseTaskSuggestions(
  responseText: string,
): Array<{ id: string; name: string; description: string }> {
  const suggestions: Array<{ id: string; name: string; description: string }> =
    [];
  // Only parse after ---zadania---
  const split = responseText.split("---zadania---");
  if (split.length < 2) return suggestions;
  const tasksText = split[1];
  const taskPattern = /\*\*([^*]+)\*\*\s*[-–]\s*([^\n]+)/g;
  let match;
  let index = 0;
  while ((match = taskPattern.exec(tasksText)) !== null && index < 5) {
    const taskName = match[1].trim();
    const description = match[2].trim();
    if (taskName && description) {
      suggestions.push({
        id: `ai-suggestion-${index + 1}`,
        name: taskName,
        description: description,
      });
      index++;
    }
  }
  return suggestions;
}

function removeTasksFromResponse(responseText: string): string {
  // Remove task suggestions from the response text
  return responseText.split("---zadania---")[0].trim();
}

export const TaskSuggestionsChat: React.FC<TaskSuggestionsChatProps> = ({
  onAddTask,
}) => {
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: "/ai/api/task-suggestions",
    }),
    messages: [
      {
        id: "welcome",
        role: "assistant",
        parts: [
          {
            type: "text",
            text: "Cześć! Jestem tutaj, aby pomóc Ci w tworzeniu zadań indywidualnych. Powiedz mi w jakiej kategorii szukasz zadań, a ja postaram się coś wymyślić.",
          },
        ],
      } as UIMessage,
    ],
  });

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
    if (!input.trim()) return;

    await sendMessage({
      text: input.trim(),
    });
    setInput("");
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
    <div className="flex h-full w-full flex-col">
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
                  {(() => {
                    const text = message.parts
                      .map((part) => (part.type === "text" ? part.text : ""))
                      .join(" ");
                    const suggestions = parseTaskSuggestions(text);
                    const mainText = removeTasksFromResponse(text);
                    return (
                      <>
                        <Card
                          className={cn(
                            "p-3",
                            message.role === "user"
                              ? "bg-blue-500 text-white"
                              : "bg-muted",
                          )}
                        >
                          {status !== "ready" &&
                          message.role === "assistant" &&
                          !mainText ? (
                            <div className="flex items-center gap-2">
                              <LoaderCircleIcon className="size-4 animate-spin" />
                              <span className="text-muted-foreground text-sm">
                                AI pracuje nad odpowiedzią...
                              </span>
                            </div>
                          ) : (
                            <p className="text-sm leading-relaxed whitespace-pre-line">
                              {mainText}
                            </p>
                          )}
                        </Card>
                        {/* Task Suggestions */}
                        {suggestions.length > 0 && (
                          <div className="w-full space-y-2">
                            {suggestions.map((suggestion) => (
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
                                    onClick={() =>
                                      handleAddSuggestion(suggestion)
                                    }
                                    className="flex-shrink-0"
                                  >
                                    <PlusIcon className="mr-1 h-3 w-3" />
                                    Wstaw
                                  </Button>
                                </div>
                              </Card>
                            ))}
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>

                {message.role === "user" && (
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gray-100">
                    <UserIcon className="size-4 text-gray-600" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Input Area */}
      <div className="flex-shrink-0 border-t p-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Opisz tematykę zajęć lub zapytaj o konkretne zadania..."
              className="min-h-[80px] resize-none pr-12"
              disabled={status !== "ready"}
            />
            <div className="absolute right-2 bottom-2 flex gap-1">
              <Button
                size="icon"
                variant="ghost"
                onClick={handleSendMessage}
                disabled={!input.trim() || status !== "ready"}
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

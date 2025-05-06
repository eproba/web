"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Task, TaskStatus } from "@/types/worksheet";
import { PenOffIcon, SendIcon, SignatureIcon, TicketXIcon } from "lucide-react";
import { toast } from "react-toastify";

export function TaskActions({
  worksheetId,
  task,
  variant,
}: {
  worksheetId: string;
  task: Task;
  variant: "user" | "managed";
}) {
  async function handleTaskAction(
    action: "submit" | "unsubmit" | "accept" | "reject",
  ) {
    console.log(action);
    toast(action, {
      type: "info",
    });
  }

  switch (variant) {
    case "user":
      switch (task.status) {
        case TaskStatus.TODO:
        case TaskStatus.REJECTED:
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <SendIcon
                    size={20}
                    className="text-blue-500"
                    onClick={() => handleTaskAction("submit")}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>
                    {task.status === TaskStatus.TODO
                      ? "Zgłoś wykonanie"
                      : "Wyślij ponownie"}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );

        case TaskStatus.AWAITING_APPROVAL:
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <TicketXIcon
                    size={20}
                    className="text-red-500"
                    onClick={() => handleTaskAction("unsubmit")}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Wycofaj zgłoszenie</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );

        default:
          return null;
      }
    case "managed":
      switch (task.status) {
        case TaskStatus.TODO:
        case TaskStatus.REJECTED:
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <SignatureIcon
                    size={20}
                    className="text-green-500"
                    onClick={() => handleTaskAction("accept")}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Podpisz zadanie</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );

        case TaskStatus.APPROVED:
          return (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <PenOffIcon
                    size={20}
                    className="text-red-500"
                    onClick={() => handleTaskAction("reject")}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Anuluj wykonanie zadania</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          );

        case TaskStatus.AWAITING_APPROVAL:
          return (
            <div className="flex gap-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <SignatureIcon
                      size={20}
                      className="text-green-500"
                      onClick={() => handleTaskAction("accept")}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Zatwierdź zadanie</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <PenOffIcon
                      size={20}
                      className="text-red-500"
                      onClick={() => handleTaskAction("reject")}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Odrzuć zadanie</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          );

        default:
          return null;
      }
    default:
      return null;
  }
}

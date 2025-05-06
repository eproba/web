import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Task, TaskStatus } from "@/types/worksheet";
import { CircleCheckBigIcon, CircleXIcon, ClockIcon } from "lucide-react";

export function TaskStatusIndicator({ task }: { task: Task }) {
  switch (task.status) {
    case TaskStatus.AWAITING_APPROVAL:
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <ClockIcon size={20} />
            </TooltipTrigger>
            <TooltipContent>
              {task.approver ? (
                <p>
                  Zgłoszenie wysłane do {task.approverName} -{" "}
                  {task.approvalDate?.toLocaleString()}
                </p>
              ) : (
                <p>
                  Oczekuje na akceptację - wysłane{" "}
                  {task.approvalDate?.toLocaleString()}
                </p>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

    case TaskStatus.APPROVED:
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CircleCheckBigIcon size={20} />
            </TooltipTrigger>
            <TooltipContent>
              {task.approver ? (
                <p>
                  Zaakceptowane przez {task.approverName} -{" "}
                  {task.approvalDate?.toLocaleString()}
                </p>
              ) : (
                <p>Zaakceptowane - {task.approvalDate?.toLocaleString()}</p>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

    case TaskStatus.REJECTED:
      return (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <CircleXIcon size={20} />
            </TooltipTrigger>
            <TooltipContent>
              {task.approver ? (
                <p>
                  Odrzucone przez {task.approverName} -{" "}
                  {task.approvalDate?.toLocaleString()}
                </p>
              ) : (
                <p>Odrzucone - {task.approvalDate?.toLocaleString()}</p>
              )}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      );

    default:
      return null;
  }
}

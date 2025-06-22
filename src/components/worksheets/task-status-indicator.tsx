import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { Task, TaskStatus } from "@/types/worksheet";
import {
  CalendarIcon,
  CircleCheckBigIcon,
  CircleIcon,
  CircleXIcon,
  ClockIcon,
  UserCheckIcon,
} from "lucide-react";

export function TaskStatusIndicator({
  task,
  status,
  tooltip,
  format = "icon",
}:
  | {
      task?: Task;
      status: TaskStatus;
      tooltip?: boolean;
      format?: "icon" | "badge";
    }
  | {
      task: Task;
      status?: TaskStatus;
      tooltip?: boolean;
      format?: "icon" | "badges";
    }) {
  if (task === undefined && status === undefined) {
    return null;
  }

  const currentStatus = (status || task?.status) as TaskStatus;

  const statusConfig = {
    [TaskStatus.AWAITING_APPROVAL]: {
      Icon: ClockIcon,
      getText: () =>
        task?.approver
          ? `Zgłoszenie wysłane do ${task.approverName} - ${task.approvalDate?.toLocaleString()}`
          : `Oczekuje na akceptację - wysłane ${task?.approvalDate?.toLocaleString()}`,
      shortText: "Zgłoszone",
    },
    [TaskStatus.APPROVED]: {
      Icon: CircleCheckBigIcon,
      getText: () =>
        task?.approver
          ? `Zaliczone przez ${task.approverName} - ${task.approvalDate?.toLocaleString()}`
          : `Zaliczone - ${task?.approvalDate?.toLocaleString()}`,
      shortText: "Zaliczone",
    },
    [TaskStatus.REJECTED]: {
      Icon: CircleXIcon,
      getText: () =>
        task?.approver
          ? `Odrzucone przez ${task.approverName} - ${task.approvalDate?.toLocaleString()}`
          : `Odrzucone - ${task?.approvalDate?.toLocaleString()}`,
      shortText: "Odrzucone",
    },
    [TaskStatus.TODO]: {
      Icon: CircleIcon,
      getText: () => "Do zrobienia",
      shortText: "Do zrobienia",
    },
  };

  const config = statusConfig[currentStatus];

  if (!config || (currentStatus === TaskStatus.TODO && format === "icon")) {
    return null;
  }

  const { Icon, getText, shortText } = config;

  if (!task || format === "badge") {
    return (
      <TooltipProvider>
        <Tooltip open={task !== undefined ? undefined : false}>
          <TooltipTrigger>
            {format === "badge" ? (
              <Badge variant="secondary" className="[&>svg]:size-auto">
                <Icon size={16} />
                {shortText}
              </Badge>
            ) : (
              <Icon size={20} />
            )}
          </TooltipTrigger>
          <TooltipContent>
            <p>{getText()}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <TooltipProvider>
      <Tooltip open={tooltip !== false ? undefined : false}>
        <TooltipTrigger>
          {format === "badges" ? (
            <div className="flex items-center gap-2 flex-wrap">
              <Badge variant="secondary" className="text-md [&>svg]:size-auto">
                <Icon size={16} />
                {shortText}
              </Badge>
              {task.status !== TaskStatus.TODO && (
                <>
                  <Badge
                    variant="secondary"
                    className="text-md font-normal  [&>svg]:size-auto"
                  >
                    <CalendarIcon size={16} />
                    {task.approvalDate?.toLocaleString()}
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="text-md font-normal  [&>svg]:size-auto"
                  >
                    <UserCheckIcon size={16} />
                    {task.approverName}
                  </Badge>
                </>
              )}
            </div>
          ) : (
            <Icon size={20} />
          )}{" "}
        </TooltipTrigger>
        <TooltipContent>
          <p>{getText()}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

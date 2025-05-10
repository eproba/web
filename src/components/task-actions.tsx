"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Task, TaskStatus } from "@/types/worksheet";
import {
  CloudUploadIcon,
  EraserIcon,
  PenOffIcon,
  SendIcon,
  SignatureIcon,
  TicketXIcon,
} from "lucide-react";
import { toast } from "react-toastify";
import { ApiError } from "@/lib/api";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState, useTransition } from "react";
import { PublicUser } from "@/types/user";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { publicUserSerializer } from "@/lib/serializers/user";
import { ToastMsg } from "@/lib/toast-msg";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/api-client";

export function TaskActions({
  worksheetId,
  task,
  variant,
}: {
  worksheetId: string;
  task: Task;
  variant: "user" | "managed";
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [availableApprovers, setAvailableApprovers] = useState<PublicUser[]>(
    [],
  );
  const [selectedApprover, setSelectedApprover] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const apiClient = useApi();

  async function fetchAvailableApprovers() {
    setLoading(true);
    try {
      const response = await apiClient(
        `/worksheets/${worksheetId}/tasks/${task.id}/approvers/`,
      );
      const data = (await response.json()).map(publicUserSerializer);
      setAvailableApprovers(data);
      if (data.length === 1) setSelectedApprover(data[0].id);
    } catch (error) {
      handleApiError(error);
    } finally {
      setLoading(false);
    }
  }

  async function handleTaskAction(
    action: "submit" | "unsubmit" | "accept" | "reject" | "clear",
  ) {
    setLoading(true);
    try {
      const options: RequestInit = {
        method: "POST",
        body:
          action === "submit"
            ? JSON.stringify({ approver: selectedApprover })
            : undefined,
      };

      await apiClient(
        `/worksheets/${worksheetId}/tasks/${task.id}/${action}/`,
        options,
      );

      const messages = {
        submit: "Zgłoszenie wysłane",
        unsubmit: "Zgłoszenie wycofane",
        accept: "Zadanie zatwierdzone",
        reject: "Zadanie odrzucone",
        clear: "Status zadania wyczyszczony",
      };
      toast.success(messages[action]);
      if (action === "submit") {
        setDialogOpen(false);
        // Workaround for the dialog flashing open after closing
        setTimeout(() => {
          startTransition(() => {
            setSelectedApprover(null);
            router.refresh();
          });
        }, 300);
      } else {
        startTransition(() => {
          router.refresh();
        });
      }
    } catch (error) {
      handleApiError(error, action);
    } finally {
      setLoading(false);
    }
  }

  function handleApiError(
    error: unknown,
    action?: "submit" | "unsubmit" | "accept" | "reject" | "clear",
  ) {
    if (error instanceof ApiError) {
      toast.error(ToastMsg, {
        data: {
          title: getErrorMessage(action),
          description: error.message,
        },
      });
    } else {
      toast.error("Wystąpił nieoczekiwany błąd");
    }
  }

  function getErrorMessage(
    action?: "submit" | "unsubmit" | "accept" | "reject" | "clear",
  ) {
    const messages = {
      submit: "Nie udało się zgłosić zadania",
      unsubmit: "Nie udało się wycofać zgłoszenia",
      accept: "Nie udało się zatwierdzić zadania",
      reject: "Nie udało się odrzucić zadania",
      clear: "Nie udało się wyczyścić statusu zadania",
    };
    return action ? messages[action] : "Nie udało się wykonać operacji";
  }

  if (
    (loading || isPending) &&
    !(
      variant === "user" &&
      (task.status === TaskStatus.TODO || task.status === TaskStatus.REJECTED)
    )
  ) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger className="relative">
            <>
              <CloudUploadIcon
                size={20}
                className="absolute text-gray-500 animate-ping"
              />
              <CloudUploadIcon size={20} className="text-gray-500" />
            </>
          </TooltipTrigger>
          <TooltipContent>
            <p>Akcja w toku...</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  switch (variant) {
    case "user":
      switch (task.status) {
        case TaskStatus.TODO:
        case TaskStatus.REJECTED:
          return (
            <Dialog
              open={dialogOpen}
              onOpenChange={async (open) => {
                setDialogOpen(open);
                if (open) {
                  await fetchAvailableApprovers();
                } else {
                  setSelectedApprover(null);
                }
              }}
            >
              <DialogTrigger disabled={loading || isPending}>
                <TooltipProvider>
                  <Tooltip>
                    {loading || isPending ? (
                      <>
                        <TooltipTrigger className="relative" asChild>
                          <div>
                            <CloudUploadIcon
                              size={20}
                              className="absolute text-gray-500 animate-ping"
                            />
                            <CloudUploadIcon
                              size={20}
                              className="text-gray-500"
                            />
                          </div>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Akcja w toku...</p>
                        </TooltipContent>
                      </>
                    ) : (
                      <>
                        <TooltipTrigger asChild>
                          <SendIcon size={20} className="text-blue-500" />
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>
                            {task.status === TaskStatus.TODO
                              ? "Zgłoś wykonanie"
                              : "Wyślij ponownie"}
                          </p>
                        </TooltipContent>
                      </>
                    )}
                  </Tooltip>
                </TooltipProvider>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Do kogo chcesz zgłosić to zadanie?</DialogTitle>
                  <DialogDescription>
                    Wybierz osobę, do której chcesz zgłosić wykonanie zadania{" "}
                    <q>{task.name}</q>.
                  </DialogDescription>
                  <Select
                    onValueChange={(value) => setSelectedApprover(value)}
                    value={selectedApprover || ""}
                    disabled={availableApprovers.length === 0}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={
                          availableApprovers.length > 0
                            ? "Wybierz osobę"
                            : loading
                              ? "Ładowanie..."
                              : "Brak dostępnych osób"
                        }
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {availableApprovers.map((approver) => (
                        <SelectItem key={approver.id} value={approver.id}>
                          {`${approver.nickname} ${approver.lastName}`}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <div className="flex justify-end mt-4 gap-2">
                    <DialogClose asChild>
                      <Button variant="outline">Anuluj</Button>
                    </DialogClose>
                    <Button
                      onClick={() => handleTaskAction("submit")}
                      disabled={!selectedApprover || loading}
                    >
                      {loading ? (
                        "Ładowanie..."
                      ) : (
                        <>
                          Wyślij
                          <SendIcon size={20} />
                        </>
                      )}
                    </Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
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

        case TaskStatus.REJECTED:
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
                    <p>Podpisz zadanie</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <EraserIcon
                      size={20}
                      className="text-gray-500"
                      onClick={() => handleTaskAction("clear")}
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Wyczyść status</p>
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

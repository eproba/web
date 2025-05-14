"use client";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Worksheet } from "@/types/worksheet";
import {
  ArchiveIcon,
  PrinterIcon,
  QrCodeIcon,
  Share2Icon,
  SquarePenIcon,
  TrashIcon,
} from "lucide-react";
import { toast } from "react-toastify";
import { ApiError } from "@/lib/api";
import { ToastMsg } from "@/lib/toast-msg";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/api-client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export function WorksheetActions({
  worksheet,
  variant,
  deleteWorksheet,
}: {
  worksheet: Worksheet;
  variant: "user" | "managed" | "shared" | "archived";
  deleteWorksheet?: (worksheetId: string) => void;
}) {
  const router = useRouter();
  const apiClient = useApi();

  async function handleDeleteWorksheet() {
    try {
      await apiClient(`/worksheets/${worksheet.id}/`, {
        method: "DELETE",
      });
      toast.success("Próba została usunięta");
      if (deleteWorksheet) {
        deleteWorksheet(worksheet.id);
      } else {
        router.refresh();
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(
          ToastMsg({
            data: { title: "Nie można usunąć arkusza", description: error },
          }),
        );
      } else {
        toast.error("Wystąpił nieznany błąd");
      }
    } finally {
    }
  }

  switch (variant) {
    case "managed":
    case "archived":
      return (
        <div className="flex gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Share2Icon size={20} className="text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Skopiuj link</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <QrCodeIcon size={20} className="text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Zobacz kod QR</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <a
                  href={`${process.env.NEXT_PUBLIC_SERVER_URL}/worksheets/${worksheet.id}/print`}
                >
                  <PrinterIcon size={20} className="text-muted-foreground" />
                </a>
              </TooltipTrigger>
              <TooltipContent>
                <p>Drukuj</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <ArchiveIcon size={20} className="text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Przenieś do archiwum</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <SquarePenIcon size={20} className="text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Edytuj</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <AlertDialog>
            <AlertDialogTrigger>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <TrashIcon size={20} className="text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Usuń</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Czy na pewno chcesz usunąć tę próbę?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Próba <q>{worksheet.name}</q> zostanie usunięta na stałe i nie
                  będzie można jej przywrócić.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Anuluj</AlertDialogCancel>
                <AlertDialogAction
                  variant="destructive"
                  onClick={handleDeleteWorksheet}
                >
                  Usuń
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      );

    default:
      return null;
  }
}

"use client";
import { QRCodeCanvas, QRCodeSVG } from "qrcode.react";
import { ComponentType, useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Worksheet } from "@/types/worksheet";
import {
  ArchiveIcon,
  ArchiveRestoreIcon,
  EllipsisVerticalIcon,
  PrinterIcon,
  QrCodeIcon,
  Share2Icon,
  SquareArrowOutUpRightIcon,
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
} from "@/components/ui/alert-dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import ReactDOM from "react-dom/client";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type WorksheetAction = {
  id: string;
  label: string;
  icon: ComponentType<{
    className?: string;
    size?: number;
    onClick?: () => void;
  }>;
  handler?: () => void;
  href?: string;
  requiresConfirmation?: boolean;
  variant: ("managed" | "archived" | "user" | "review")[];
  renderContent?: (action: WorksheetAction, baseUrl: string) => React.ReactNode;
};

export function WorksheetActions({
  worksheet,
  variant,
  removeWorksheet,
}: {
  worksheet: Worksheet;
  variant: "user" | "managed" | "shared" | "archived" | "review";
  removeWorksheet?: (worksheetId: string) => void;
}) {
  const router = useRouter();
  const { apiClient } = useApi();
  const [baseUrl, setBaseUrl] = useState("");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  function copyLink() {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(`${baseUrl}/worksheets/${worksheet.id}`);
      toast.success("Link skopiowany do schowka");
    }
  }

  function handleDownloadQR() {
    const qrValue = `${baseUrl}/worksheets/${worksheet.id}`;

    // Create temporary container div
    const containerRef = document.createElement("div");
    containerRef.style.position = "absolute";
    containerRef.style.top = "-9999px";
    document.body.appendChild(containerRef);

    // Render QR code into the container
    const qrCodeComponent = (
      <QRCodeCanvas
        value={qrValue}
        size={512}
        level="H"
        bgColor="#ffffff"
        fgColor="#000000"
      />
    );

    // Use ReactDOM to render
    const root = ReactDOM.createRoot(containerRef);
    root.render(qrCodeComponent);

    // Need a small delay for rendering to complete
    setTimeout(() => {
      try {
        // Find the canvas in the container
        const canvasElement = containerRef.querySelector("canvas");
        if (!canvasElement) return;

        // Convert to data URL and download
        const dataURL = canvasElement.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = dataURL;
        link.download = `${worksheet.name.replace(/\s+/g, "-")}-kod-QR.png`;
        document.body.appendChild(link);
        link.click();

        // Clean up
        document.body.removeChild(link);
        root.unmount();
        document.body.removeChild(containerRef);
      } catch (error) {
        console.error("Error downloading QR code:", error);
        toast.error("Nie udało się pobrać kodu QR");
      }
    }, 100);
  }

  async function handleDeleteWorksheet() {
    try {
      await apiClient(`/worksheets/${worksheet.id}/`, {
        method: "DELETE",
      });
      toast.success("Próba została usunięta");
      if (removeWorksheet) {
        removeWorksheet(worksheet.id);
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
        toast.error(
          ToastMsg({
            data: {
              title: "Nie można usunąć arkusza",
              description: "Nieznany błąd",
            },
          }),
        );
      }
    } finally {
      setShowDeleteAlert(false);
    }
  }

  async function handleArchiveWorksheet() {
    try {
      await apiClient(`/worksheets/${worksheet.id}/`, {
        method: "PATCH",
        body: JSON.stringify({ is_archived: true }),
      });
      toast.success("Próba została przeniesiona do archiwum");
      if (removeWorksheet) {
        removeWorksheet(worksheet.id);
      } else {
        router.refresh();
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(
          ToastMsg({
            data: {
              title: "Nie można przenieść arkusza do archiwum",
              description: error,
            },
          }),
        );
      } else {
        toast.error(
          ToastMsg({
            data: {
              title: "Nie można przenieść arkusza do archiwum",
              description: "Nieznany błąd",
            },
          }),
        );
      }
    }
  }

  async function handleUnarchiveWorksheet() {
    try {
      await apiClient(`/worksheets/${worksheet.id}/?archived`, {
        method: "PATCH",
        body: JSON.stringify({ is_archived: false }),
      });
      toast.success("Próba została przywrócona z archiwum");
      if (removeWorksheet) {
        removeWorksheet(worksheet.id);
      } else {
        router.refresh();
      }
    } catch (error) {
      if (error instanceof ApiError) {
        toast.error(
          ToastMsg({
            data: {
              title: "Nie można przywrócić arkusza z archiwum",
              description: error,
            },
          }),
        );
      } else {
        toast.error(
          ToastMsg({
            data: {
              title: "Nie można przywrócić arkusza z archiwum",
              description: "Nieznany błąd",
            },
          }),
        );
      }
    }
  }

  const worksheetActions: WorksheetAction[] = [
    {
      id: "share",
      label: "Skopiuj link",
      icon: Share2Icon,
      handler: copyLink,
      variant: ["managed", "archived", "user"],
    },
    {
      id: "qr",
      label: "Zobacz kod QR",
      icon: QrCodeIcon,
      variant: ["managed", "archived", "user"],
      renderContent: (action, baseUrl) => (
        <Popover>
          <Tooltip>
            <TooltipTrigger asChild>
              <PopoverTrigger>
                <action.icon
                  className="text-muted-foreground cursor-pointer"
                  size={20}
                />
              </PopoverTrigger>
            </TooltipTrigger>
            <TooltipContent>Zobacz kod QR</TooltipContent>
          </Tooltip>
          <PopoverContent>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="p-2 bg-white rounded-md">
                {baseUrl && (
                  <QRCodeSVG
                    value={`${baseUrl}/worksheets/${worksheet.id}`}
                    size={240}
                    className="rounded-md"
                  />
                )}
              </div>
              <Button onClick={handleDownloadQR} disabled={!baseUrl}>
                Pobierz kod QR
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      ),
    },
    {
      id: "print",
      label: "Drukuj",
      icon: PrinterIcon,
      href: `${process.env.NEXT_PUBLIC_SERVER_URL}/worksheets/${worksheet.id}/print`,
      variant: ["managed", "archived", "user"],
    },
    {
      id: "archive",
      label:
        variant === "archived" ? "Przywróć z archiwum" : "Przenieś do archiwum",
      icon: worksheet.isArchived ? ArchiveRestoreIcon : ArchiveIcon,
      handler: worksheet.isArchived
        ? handleUnarchiveWorksheet
        : handleArchiveWorksheet,
      variant: ["managed", "archived"],
    },
    {
      id: "edit",
      label: "Edytuj",
      icon: SquarePenIcon,
      href: `/worksheets/edit/${worksheet.id}`,
      variant: ["managed"],
    },
    {
      id: "delete",
      label: "Usuń",
      icon: TrashIcon,
      requiresConfirmation: true,
      handler: () => setShowDeleteAlert(true),
      variant: ["managed", "archived"],
    },
    {
      id: "open-in-manage",
      label: "Skocz do próby",
      icon: SquareArrowOutUpRightIcon,
      href: `/worksheets/manage#${worksheet.id}`,
      variant: ["review"],
    },
  ];

  const filteredActions = worksheetActions.filter((action) =>
    action.variant.includes(
      variant as "managed" | "archived" | "user" | "review",
    ),
  );

  const renderActionIcon = (action: WorksheetAction) => {
    if (action.renderContent) {
      return action.renderContent(action, baseUrl);
    }

    if (action.href) {
      return (
        <Link href={action.href}>
          <action.icon className="text-muted-foreground" size={20} />
        </Link>
      );
    }

    return (
      <action.icon
        className="text-muted-foreground cursor-pointer"
        size={20}
        onClick={action.handler}
      />
    );
  };

  const renderDesktopIcons = () => (
    <div className="hidden md:flex gap-2">
      {filteredActions.map((action) => (
        <TooltipProvider key={action.id}>
          <Tooltip>
            <TooltipTrigger asChild>{renderActionIcon(action)}</TooltipTrigger>
            <TooltipContent>
              <p>{action.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </div>
  );

  const renderMobileMenu = () =>
    // Only show dropdown when there are multiple actions
    filteredActions.length > 1 ? (
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="size-8 p-0 data-[state=open]:bg-muted"
            >
              <EllipsisVerticalIcon className="size-5" />
              <span className="sr-only">Otwórz menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {filteredActions.map((action) => {
              // Special case for QR in mobile view - download directly
              if (action.id === "qr") {
                return (
                  <DropdownMenuItem key={action.id} onSelect={handleDownloadQR}>
                    <QrCodeIcon className="h-4 w-4" />
                    Pobierz kod QR
                  </DropdownMenuItem>
                );
              }

              return (
                <DropdownMenuItem
                  key={action.id}
                  onSelect={action.handler}
                  asChild={!!action.href}
                >
                  {action.href ? (
                    <Link href={action.href} className="flex items-center">
                      <action.icon className="h-4 w-4" />
                      {action.label}
                    </Link>
                  ) : (
                    <div className="flex items-center">
                      <action.icon className="mr-2 h-4 w-4" />
                      {action.label}
                    </div>
                  )}
                </DropdownMenuItem>
              );
            })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    ) : (
      // For single action on mobile, render the icon directly
      <div className="md:hidden">
        {filteredActions.map((action) => (
          <TooltipProvider key={action.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                {renderActionIcon(action)}
              </TooltipTrigger>
              <TooltipContent>
                <p>{action.label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>
    );

  // Only render for managed or archived variants
  if (!["managed", "archived", "user", "review"].includes(variant)) {
    return null;
  }

  return (
    <>
      <div className="flex gap-2">
        {renderDesktopIcons()}
        {renderMobileMenu()}
      </div>

      <AlertDialog open={showDeleteAlert} onOpenChange={setShowDeleteAlert}>
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
    </>
  );
}

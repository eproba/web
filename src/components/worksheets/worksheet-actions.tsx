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
import { Button, buttonVariants } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { WorksheetNotesDialog } from "@/components/worksheets/worksheet-notes-dialog";
import { API_URL } from "@/lib/api";
import { useApi } from "@/lib/api-client";
import { RequiredFunctionLevel } from "@/lib/const";
import { ToastMsg } from "@/lib/toast-msg";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/state/user";
import { User } from "@/types/user";
import { Worksheet } from "@/types/worksheet";
import {
  ArchiveIcon,
  ArchiveRestoreIcon,
  EllipsisVerticalIcon,
  LucideIcon,
  PrinterIcon,
  Share2Icon,
  SquareArrowOutUpRightIcon,
  SquarePenIcon,
  StickyNoteIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type WorksheetAction = {
  id: string;
  label: string;
  icon: LucideIcon;
  handler?: () => void;
  href?: string;
  variant: ("managed" | "archived" | "user" | "review")[];
  userFilter?: (user: User) => boolean;
  renderContent?: (action: WorksheetAction) => React.ReactElement;
};

export function WorksheetActions({
  worksheet,
  variant,
  removeWorksheet,
  updateWorksheet,
}: {
  worksheet: Worksheet;
  variant: "user" | "managed" | "shared" | "archived" | "review";
  removeWorksheet?: (worksheetId: string) => void;
  updateWorksheet?: (worksheet: Worksheet) => void;
}) {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const { apiClient } = useApi();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [showDesktopNotes, setShowDesktopNotes] = useState(false);
  const [showMobileNotes, setShowMobileNotes] = useState(false);

  function copyLink() {
    if (typeof window !== "undefined" && typeof navigator !== "undefined") {
      navigator.clipboard.writeText(
        `${window.location.origin}/worksheets/${worksheet.id}`,
      );
      toast.add({ title: "Link skopiowany do schowka", type: "success" });
    }
  }

  async function handleDeleteWorksheet() {
    try {
      await apiClient(
        `/worksheets/${worksheet.id}/${worksheet.isArchived ? "?archived" : ""}`,
        {
          method: "DELETE",
        },
      );
      toast.add({ title: "Próba została usunięta", type: "success" });
      if (removeWorksheet) {
        removeWorksheet(worksheet.id);
      } else {
        router.refresh();
      }
    } catch (error) {
      toast.add({
        ...ToastMsg({
          data: {
            title: "Nie można usunąć próby",
            description: error as Error,
          },
        }),
        type: "error",
      });
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
      toast.add({
        title: "Próba została przeniesiona do archiwum",
        type: "success",
      });
      if (removeWorksheet) {
        removeWorksheet(worksheet.id);
      } else {
        router.refresh();
      }
    } catch (error) {
      toast.add({
        ...ToastMsg({
          data: {
            title: "Nie można przenieść próby do archiwum",
            description: error as Error,
          },
        }),
        type: "error",
      });
    }
  }

  async function handleUnarchiveWorksheet() {
    try {
      await apiClient(`/worksheets/${worksheet.id}/?archived`, {
        method: "PATCH",
        body: JSON.stringify({ is_archived: false }),
      });
      toast.add({
        title: "Próba została przywrócona z archiwum",
        type: "success",
      });
      if (removeWorksheet) {
        removeWorksheet(worksheet.id);
      } else {
        router.refresh();
      }
    } catch (error) {
      toast.add({
        ...ToastMsg({
          data: {
            title: "Nie można przywrócić próby z archiwum",
            description: error as Error,
          },
        }),
        type: "error",
      });
    }
  }

  const worksheetActions: WorksheetAction[] = [
    {
      id: "notes",
      label: "Notatka",
      icon: StickyNoteIcon,
      variant: ["managed", "archived", "user"],
      userFilter: (user) =>
        (user.function.numberValue >=
          RequiredFunctionLevel.WORKSHEET_NOTES_ACCESS ||
          user.id === worksheet.supervisor) &&
        user.id !== worksheet.user.id,
      renderContent: (action) => (
        <Tooltip>
          <WorksheetNotesDialog
            worksheet={worksheet}
            updateWorksheet={updateWorksheet || (() => {})}
            format="overlay"
            open={showDesktopNotes}
            onOpenChange={setShowDesktopNotes}
          >
            <TooltipTrigger
              render={
                <Button
                  variant="ghost"
                  size="icon-sm"
                  aria-label={action.label}
                >
                  <action.icon
                    className={cn(
                      "size-5",
                      worksheet.notes
                        ? "text-amber-600 hover:text-amber-700"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  />
                </Button>
              }
            />
          </WorksheetNotesDialog>
          <TooltipContent>
            <p>{action.label}</p>
          </TooltipContent>
        </Tooltip>
      ),
    },
    {
      id: "edit",
      label: "Edytuj",
      icon: SquarePenIcon,
      href: `/worksheets/${worksheet.id}/edit`,
      variant: ["managed"],
      userFilter: (user) =>
        (user.function.numberValue >= worksheet.user.function.numberValue &&
          user.id !== worksheet.user.id) ||
        user.function.numberValue >= RequiredFunctionLevel.TEAM_ADMIN ||
        user.id === worksheet.supervisor,
    },
    {
      id: "share",
      label: "Skopiuj link",
      icon: Share2Icon,
      handler: copyLink,
      variant: ["managed", "archived", "user"],
    },
    {
      id: "print",
      label: "Drukuj",
      icon: PrinterIcon,
      href: `${API_URL}/worksheets/${worksheet.id}/pdf/`,
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
      userFilter: (user) =>
        (user.function.numberValue >= worksheet.user.function.numberValue &&
          user.id !== worksheet.user.id) ||
        user.function.numberValue >= RequiredFunctionLevel.TEAM_ADMIN ||
        user.id === worksheet.supervisor,
    },
    {
      id: "delete",
      label: "Usuń",
      icon: TrashIcon,
      handler: () => setShowDeleteAlert(true),
      variant: ["managed", "archived"],
      userFilter: (user) =>
        (user.function.numberValue >= worksheet.user.function.numberValue &&
          user.id !== worksheet.user.id) ||
        user.function.numberValue >= RequiredFunctionLevel.TEAM_ADMIN ||
        user.id === worksheet.supervisor,
    },
    {
      id: "open-in-manage",
      label: "Skocz do próby",
      icon: SquareArrowOutUpRightIcon,
      href: `/worksheets/manage#${worksheet.id}`,
      variant: ["review"],
    },
  ];

  const filteredActions = worksheetActions.filter(
    (action) =>
      action.variant.includes(
        variant as "managed" | "archived" | "user" | "review",
      ) &&
      (!action.userFilter || (currentUser && action.userFilter(currentUser))),
  );

  const renderActionIcon = (action: WorksheetAction) => {
    if (action.renderContent) {
      return action.renderContent(action);
    }

    if (action.href) {
      return (
        <Link
          href={action.href}
          className={buttonVariants({ variant: "ghost", size: "icon-sm" })}
        >
          <action.icon className="text-muted-foreground size-5" />
        </Link>
      );
    }

    return (
      <Button
        variant="ghost"
        size="icon-sm"
        aria-label={action.label}
        onClick={action.handler}
      >
        <action.icon className="text-muted-foreground size-5" />
      </Button>
    );
  };

  const renderDesktopIcons = () => (
    <ButtonGroup className="hidden md:flex">
      {filteredActions.map((action) => (
        <TooltipProvider key={action.id}>
          <Tooltip>
            <TooltipTrigger render={renderActionIcon(action)} />
            <TooltipContent>
              <p>{action.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </ButtonGroup>
  );

  const renderMobileMenu = () =>
    // Only show dropdown when there are multiple actions
    filteredActions.length > 1 ? (
      <div className="md:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="data-popup-open:bg-muted size-8 p-0"
              />
            }
          >
            <EllipsisVerticalIcon className="size-5" />
            <span className="sr-only">Otwórz menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-50" align="end">
            {filteredActions.map((action) => {
              // Keep the controlled drawer mounted outside the closing menu.
              if (action.id === "notes") {
                return (
                  <DropdownMenuItem
                    key={action.id}
                    onClick={() => setShowMobileNotes(true)}
                  >
                    <StickyNoteIcon className="size-4" />
                    {worksheet.notes ? "Notatka" : "Dodaj notatkę"}
                  </DropdownMenuItem>
                );
              }

              return action.href ? (
                <DropdownMenuItem
                  key={action.id}
                  nativeButton={false}
                  render={<Link href={action.href} />}
                >
                  <action.icon className="size-4" />
                  {action.label}
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem key={action.id} onClick={action.handler}>
                  <action.icon className="size-4" />
                  {action.label}
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
              <TooltipTrigger render={renderActionIcon(action)} />
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

      {filteredActions.some((action) => action.id === "notes") && (
        <WorksheetNotesDialog
          worksheet={worksheet}
          updateWorksheet={updateWorksheet || (() => {})}
          format="mobile"
          open={showMobileNotes}
          onOpenChange={setShowMobileNotes}
        />
      )}

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

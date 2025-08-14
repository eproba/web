"use client";

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
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { API_URL } from "@/lib/api";
import { useApi } from "@/lib/api-client";
import { RequiredFunctionLevel } from "@/lib/const";
import { ToastMsg } from "@/lib/toast-msg";
import { useCurrentUser } from "@/state/user";
import { TemplateWorksheet } from "@/types/template";
import { User } from "@/types/user";
import {
  EllipsisVerticalIcon,
  LucideIcon,
  PrinterIcon,
  SquarePenIcon,
  TrashIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

type TemplateAction = {
  id: string;
  label: string;
  icon: LucideIcon;
  handler?: () => void;
  href?: string;
  userFilter?: (user: User) => boolean;
};

const allowEdit = (scope: string, user?: User) => {
  switch (scope) {
    case "team":
      return (
        !!user &&
        user.function.numberValue >=
          RequiredFunctionLevel.TEAM_TEMPLATE_MANAGEMENT
      );
    case "organization":
      return !!user?.isStaff;
    default:
      return false;
  }
};

export function TemplateActions({
  template,
  removeTemplate,
}: {
  template: TemplateWorksheet;
  removeTemplate?: (templateId: string) => void;
}) {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const { apiClient } = useApi();
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);

  async function handleDeleteTemplate() {
    try {
      await apiClient(`/templates/${template.id}/`, {
        method: "DELETE",
      });
      toast.success("Szablon został usunięty");
      if (removeTemplate) {
        removeTemplate(template.id);
      } else {
        router.refresh();
      }
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie można usunąć szablonu",
            description: error as Error,
          },
        }),
      );
    } finally {
      setShowDeleteAlert(false);
    }
  }

  const templateActions: TemplateAction[] = [
    {
      id: "print",
      label: "Drukuj",
      icon: PrinterIcon,
      href: `${API_URL}/templates/${template.id}/pdf/`,
    },
    {
      id: "edit",
      label: "Edytuj",
      icon: SquarePenIcon,
      href: `/worksheets/templates/${template.id}/edit`,
      userFilter: (user) => allowEdit(template.scope, user),
    },
    {
      id: "delete",
      label: "Usuń",
      icon: TrashIcon,
      handler: () => setShowDeleteAlert(true),
      userFilter: (user) => allowEdit(template.scope, user),
    },
  ];

  const renderActionIcon = (action: TemplateAction) => {
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

  const filteredActions = templateActions.filter(
    (action) =>
      !action.userFilter || (currentUser && action.userFilter(currentUser)),
  );

  const renderDesktopIcons = () => (
    <div className="hidden gap-2 md:flex">
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

  const renderMobileMenu = () => (
    <div className="md:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="data-[state=open]:bg-muted size-8 p-0"
          >
            <EllipsisVerticalIcon className="size-5" />
            <span className="sr-only">Otwórz menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {filteredActions.map((action) => {
            return (
              <DropdownMenuItem
                key={action.id}
                onSelect={action.handler}
                asChild={!!action.href}
              >
                {action.href ? (
                  <Link href={action.href} className="flex items-center">
                    <action.icon className="size-4" />
                    {action.label}
                  </Link>
                ) : (
                  <div className="flex items-center">
                    <action.icon className="mr-2 size-4" />
                    {action.label}
                  </div>
                )}
              </DropdownMenuItem>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );

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
              Czy na pewno chcesz usunąć ten szablon?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Szablon <q>{template.name}</q> zostanie usunięty na stałe i nie
              będzie można go przywrócić.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Anuluj</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={handleDeleteTemplate}
            >
              Usuń
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}

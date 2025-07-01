import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { useApi } from "@/lib/api-client";
import { Worksheet } from "@/types/worksheet";
import { ToastMsg } from "@/lib/toast-msg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  CheckIcon,
  EditIcon,
  StickyNoteIcon,
  TrashIcon,
  XIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Textarea } from "@/components/ui/textarea";

interface WorksheetNotesDialogProps {
  worksheet: Worksheet;
  updateWorksheet: (worksheet: Worksheet) => void;
  format?: "overlay" | "mobile";
  children: React.ReactNode;
}

export function WorksheetNotesDialog({
  worksheet,
  updateWorksheet,
  format = "overlay",
  children,
}: WorksheetNotesDialogProps) {
  const { apiClient } = useApi();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(worksheet.notes || "");
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Effect to set cursor position to end when editing starts
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      const textarea = textareaRef.current;
      // Set cursor to end of text
      const length = textarea.value.length;
      textarea.setSelectionRange(length, length);
      textarea.focus();
    }
  }, [isEditing]);

  const handleSaveNote = async () => {
    if (editValue.trim() === worksheet.notes?.trim()) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      await apiClient(`/worksheets/${worksheet.id}/note/`, {
        method: worksheet.notes ? "PUT" : "POST",
        body: JSON.stringify({ notes: editValue.trim() }),
      });

      const updatedWorksheet = { ...worksheet, notes: editValue.trim() };
      updateWorksheet(updatedWorksheet);
      setIsEditing(false);
      toast.success(
        worksheet.notes ? "Notatka zaktualizowana" : "Notatka dodana",
      );
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się zapisać notatki",
            description: error as Error,
          },
        }),
      );
    } finally {
      setIsLoading(false);
      setIsFirstRender(false);
    }
  };

  const handleDeleteNote = async () => {
    setIsLoading(true);
    try {
      await apiClient(`/worksheets/${worksheet.id}/note/`, {
        method: "DELETE",
      });

      const updatedWorksheet = { ...worksheet, notes: "" };
      updateWorksheet(updatedWorksheet);
      toast.success("Notatka usunięta");
      setIsDeleteDialogOpen(false);
      setIsOpen(false);
      setEditValue("");
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się usunąć notatki",
            description: error as Error,
          },
        }),
      );
    } finally {
      setIsLoading(false);
      setIsFirstRender(true);
    }
  };

  const handleStartEditing = () => {
    setEditValue(worksheet.notes || "");
    setIsEditing(true);
    setIsFirstRender(false);
  };

  const handleCancelEditing = () => {
    setEditValue(worksheet.notes || "");
    setIsEditing(false);
    setIsFirstRender(false);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setIsFirstRender(true);
    } else {
      // If opening and there's no note, start in edit mode
      if (!worksheet.notes) {
        setIsEditing(true);
      }
    }
  };

  const renderNoteContent = () => (
    <AnimatePresence>
      {!isEditing ? (
        <motion.div
          key="display-note"
          initial={{
            opacity: isFirstRender ? 1 : 0,
            height: isFirstRender ? "auto" : 0,
          }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1],
            height: { duration: 0.35, ease: [0.4, 0.0, 0.2, 1] },
          }}
          className="overflow-hidden"
        >
          <div className="flex items-center justify-between p-4 pb-2">
            <div className="flex items-center gap-2">
              <StickyNoteIcon className="size-4 text-muted-foreground" />
              <h3 className="text-sm font-medium">Notatka do próby</h3>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleStartEditing}
                disabled={isLoading}
                className="h-6 w-6 p-0"
              >
                <EditIcon className="w-3 h-3" />
              </Button>
              <Dialog
                open={isDeleteDialogOpen}
                onOpenChange={setIsDeleteDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    disabled={isLoading}
                    className="h-6 w-6 p-0"
                  >
                    <TrashIcon className="w-3 h-3" />
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Usuń notatkę</DialogTitle>
                    <DialogDescription>
                      Czy na pewno chcesz usunąć tę notatkę? Ta operacja nie
                      może być cofnięta.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsDeleteDialogOpen(false)}
                      disabled={isLoading}
                    >
                      Anuluj
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={handleDeleteNote}
                      disabled={isLoading}
                    >
                      Usuń
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          <div className="px-4 pb-4">
            <p className="text-sm text-muted-foreground whitespace-pre-wrap max-h-40 overflow-y-auto">
              {worksheet.notes}
            </p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="edit-note"
          initial={{
            opacity: isFirstRender ? 1 : 0,
            height: isFirstRender ? "auto" : 0,
          }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{
            duration: 0.3,
            ease: [0.4, 0.0, 0.2, 1],
            height: { duration: 0.35, ease: [0.4, 0.0, 0.2, 1] },
          }}
          className="overflow-hidden"
        >
          <div className="flex items-center gap-2 p-4 pb-2">
            <StickyNoteIcon className="size-4 text-muted-foreground" />
            <h3 className="text-sm font-medium">
              {worksheet.notes ? "Edytuj notatkę" : "Dodaj notatkę"}
            </h3>
          </div>
          <div className="px-4 pb-4 space-y-3">
            <Textarea
              ref={textareaRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              placeholder="Wpisz notatkę do próby..."
              disabled={isLoading}
              rows={3}
            />
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancelEditing}
                disabled={isLoading}
              >
                <XIcon className="w-3 h-3 mr-1" />
                Anuluj
              </Button>
              <Button
                size="sm"
                onClick={handleSaveNote}
                disabled={isLoading || editValue.trim() === ""}
              >
                <CheckIcon className="w-3 h-3 mr-1" />
                Zapisz
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // Mobile format - render as drawer
  if (format === "mobile") {
    return (
      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              {worksheet.notes ? "Notatka do próby" : "Dodaj notatkę do próby"}
            </DrawerTitle>
            <DrawerDescription>
              {worksheet.notes
                ? "Zarządzaj notatką do tej próby"
                : "Dodaj notatkę do tej próby"}
            </DrawerDescription>
          </DrawerHeader>

          <div className="px-4 pb-4">{renderNoteContent()}</div>

          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Zamknij</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  // Desktop format - render as popover
  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="w-80 p-0" align="start" side="right">
        {renderNoteContent()}
      </PopoverContent>
    </Popover>
  );
}

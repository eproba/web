"use client";

import ContactForm from "@/app/contact/contact-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";

interface BugReportDialogProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function BugReportDialog({
  children,
  open,
  onOpenChange,
}: BugReportDialogProps) {
  const [internalOpen, setInternalOpen] = useState(open);
  const setOpen = (isOpen: boolean) => {
    setInternalOpen(isOpen);
    onOpenChange?.(isOpen);
  };

  useEffect(() => {
    if (open !== undefined) {
      setInternalOpen(open);
    }
  }, [open]);

  return (
    <Dialog open={internalOpen} onOpenChange={setOpen}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Zgłoś błąd</DialogTitle>
          <DialogDescription>
            Jeśli znalazłeś błąd lub masz jakąś sugestię, daj nam znać!
          </DialogDescription>
        </DialogHeader>
        <ContactForm type="bug" onSuccess={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

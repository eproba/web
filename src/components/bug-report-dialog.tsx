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
import { useState } from "react";

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
  const isControlled = open !== undefined;
  const [uncontrolledOpen, setUncontrolledOpen] = useState(false);

  const isOpen = isControlled ? open : uncontrolledOpen;

  const handleOpenChange = (newOpen: boolean) => {
    if (!isControlled) {
      setUncontrolledOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Zgłoś błąd</DialogTitle>
          <DialogDescription>
            Jeśli znalazłeś błąd lub masz jakąś sugestię, daj nam znać!
          </DialogDescription>
        </DialogHeader>
        <ContactForm type="bug" onSuccess={() => handleOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
}

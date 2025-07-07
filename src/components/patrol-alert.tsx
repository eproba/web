"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PatrolSelectDialog } from "@/components/profile/patrol-select-dialog";
import { AlertCircleIcon } from "lucide-react";
import { User } from "@/types/user";
import { useState } from "react";

interface PatrolAlertProps {
  user: User;
}

export function PatrolAlert({ user }: PatrolAlertProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isOpenSelectPatrolDialog, setIsOpenSelectPatrolDialog] = useState(
    searchParams.get("openSelectPatrolDialog") === "true",
  );

  if (user.patrol || pathname === "/team/request") {
    return null;
  }

  const handleDialogOpen = (open: boolean) => {
    setIsOpenSelectPatrolDialog(open);
    if (!open) {
      const url = new URL(pathname, window.location.origin);
      url.searchParams.delete("openSelectPatrolDialog");
      window.history.replaceState({}, "", url.toString());
    }
  };

  return (
    <Alert
      variant="destructive"
      className="mx-auto container mt-4 bg-red-500/10 border-red-500/20"
    >
      <AlertCircleIcon className="size-4" />
      <AlertTitle className="font-semibold">
        Nie jesteś przypisany do żadnej drużyny!
      </AlertTitle>
      <AlertDescription className="text-sm text-gray-500">
        <PatrolSelectDialog
          userGender={user.gender}
          variant="set"
          open={isOpenSelectPatrolDialog}
          onOpenChange={handleDialogOpen}
        >
          <Button variant="outline" size="sm" className="mt-1">
            Wybierz swoją drużynę
          </Button>
        </PatrolSelectDialog>
      </AlertDescription>
    </Alert>
  );
}

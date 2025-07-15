"use client";

import { PatrolSelectDialog } from "@/components/profile/patrol-select-dialog";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { User } from "@/types/user";
import { AlertCircleIcon } from "lucide-react";
import { usePathname, useSearchParams } from "next/navigation";
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
      className="container mx-auto mt-4 border-red-500/20 bg-red-500/10"
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

"use client";

import React, { useState } from "react";
import { useApi } from "@/lib/api-client";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PatrolSelector } from "@/components/patrol-selector";
import { FieldInfo } from "@/types/user";
import { toast } from "react-toastify";
import { ToastMsg } from "@/lib/toast-msg";
import { useRouter } from "next/navigation";

export const PatrolSelectDialog = ({
  variant = "change",
  userGender,
  children,
}: {
  variant?: "change" | "set";
  userGender: FieldInfo | null;
  children: React.ReactNode;
}) => {
  const { apiClient } = useApi();
  const router = useRouter();
  const [selectedPatrol, setSelectedPatrol] = useState<string>("");

  const handleSubmit = async () => {
    if (!selectedPatrol) return;

    try {
      await apiClient(`/user/`, {
        method: "PATCH",
        body: JSON.stringify({ patrol: selectedPatrol }),
      });
      toast.success(
        variant === "change"
          ? "Drużyna została zmieniona"
          : "Zostałeś przypisany do drużyny",
      );
      router.refresh();
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się zmienić drużyny",
            description: error as Error,
          },
        }),
      );
    } finally {
      setSelectedPatrol("");
    }
  };
  return (
    <Dialog onOpenChange={(open) => open && setSelectedPatrol("")}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>
            {variant === "change" ? "Zmień drużynę" : "Wybierz drużynę"}
          </DialogTitle>
          <DialogDescription>
            {variant === "change"
              ? "Wybierz drużynę, do której chcesz się przenieść. Po zmianie drużyny twoja obecna funkcja zostanie zresetowana."
              : "Wybierz drużynę, do której chcesz dołączyć."}
          </DialogDescription>
        </DialogHeader>
        <PatrolSelector
          userGender={userGender}
          selectedPatrol={selectedPatrol}
          setSelectedPatrol={setSelectedPatrol}
        />
        <DialogFooter className="flex flex-row justify-end gap-2 mt-4">
          <DialogClose asChild>
            <Button variant="outline">Anuluj</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button onClick={handleSubmit} disabled={!selectedPatrol}>
              Zapisz
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

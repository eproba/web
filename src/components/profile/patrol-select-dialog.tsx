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
import { PatrolSelector } from "@/components/profile/patrol-selector";
import { FieldInfo } from "@/types/user";
import { toast } from "react-toastify";
import { ToastMsg } from "@/lib/toast-msg";
import { useRouter } from "next/navigation";
import Link from "next/link";

export const PatrolSelectDialog = ({
  variant = "change",
  userGender,
  children,
  ...props
}: {
  variant?: "change" | "set";
  userGender: FieldInfo | null;
  children: React.ReactNode;
} & React.ComponentProps<typeof Dialog>) => {
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
    <Dialog
      {...props}
      onOpenChange={(open) => {
        if (open) {
          setSelectedPatrol("");
        }
        props.onOpenChange?.(open);
      }}
    >
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
        <span className="text-xs text-gray-500">
          Chcesz dodać swoją drużynę? Jeśli należysz do kadry, możesz to zrobić
          klikając{" "}
          <DialogClose asChild>
            <Link
              href="/team/request"
              className="text-blue-500 hover:underline"
            >
              tutaj
            </Link>
          </DialogClose>
          .
        </span>
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

"use client";

import { PatrolSelector } from "@/components/profile/patrol-selector";
import { Button } from "@/components/ui/button";
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
import { toast } from "@/components/ui/toast";
import { useApi } from "@/lib/api-client";
import { ToastMsg } from "@/lib/toast-msg";
import { FieldInfo } from "@/types/user";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export const PatrolSelectDialog = ({
  variant = "change",
  userGender,
  children,
  ...props
}: {
  variant?: "change" | "set";
  userGender: FieldInfo | null;
  children: React.ReactElement;
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
      toast.add({
        title:
          variant === "change"
            ? "Drużyna została zmieniona"
            : "Zostałeś przypisany do drużyny",
        type: "success",
      });
      router.refresh();
    } catch (error) {
      toast.add({
        ...ToastMsg({
          data: {
            title: "Nie udało się zmienić drużyny",
            description: error as Error,
          },
        }),
        type: "error",
      });
    } finally {
      setSelectedPatrol("");
    }
  };
  return (
    <Dialog
      {...props}
      onOpenChange={(open, eventDetails) => {
        if (open) {
          setSelectedPatrol("");
        }
        props.onOpenChange?.(open, eventDetails);
      }}
    >
      <DialogTrigger render={children} />
      <DialogContent>
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
          <DialogClose
            nativeButton={false}
            render={
              <Link
                href="/team/request"
                className="text-blue-500 hover:underline"
              >
                tutaj
              </Link>
            }
          />
          .
        </span>
        <DialogFooter className="mt-4 flex flex-row justify-end gap-2">
          <DialogClose render={<Button variant="outline">Anuluj</Button>} />
          <DialogClose
            render={
              <Button onClick={handleSubmit} disabled={!selectedPatrol}>
                Zapisz
              </Button>
            }
          />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

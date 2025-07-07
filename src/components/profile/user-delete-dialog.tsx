"use client";

import React, { useState } from "react";
import { useApi } from "@/lib/api-client";
import { User } from "@/types/user";
import { toast } from "react-toastify";
import { ToastMsg } from "@/lib/toast-msg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signOut } from "next-auth/react";

export const UserDeleteDialog = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) => {
  const CONFIRMATION_MESSAGE = "USUŃ KONTO";

  const { apiClient } = useApi();

  const [inputValue, setInputValue] = useState("");

  const handleSubmit = async () => {
    if (inputValue !== CONFIRMATION_MESSAGE) {
      toast.error("Wpisz 'USUŃ KONTO' aby potwierdzić");
      return;
    }

    try {
      await apiClient(`/user/`, {
        method: "DELETE",
      });
      toast.success("Twoje konto zostało usunięte");
      await signOut({ redirectTo: "/signout" });
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title:
              "Nie udało się usunąć twojego konta, skontaktuj się z administratorem",
            description: error as Error,
          },
        }),
      );
    }
  };

  return (
    <AlertDialog onOpenChange={(open) => open && setInputValue("")}>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>Usuń konto</AlertDialogTitle>
          <AlertDialogDescription>
            Czy na pewno chcesz usunąć swoje konto ({user.email})? Ta operacja
            jest nieodwracalna. Jeśli usuniesz swoje konto, nie będziesz mógł
            się zalogować ponownie. Zawsze możesz założyć nowe konto, ale nie
            będziesz mógł odzyskać swoich danych.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <Label>Wpisz &#34;USUŃ KONTO&#34; aby potwierdzić</Label>
        <Input
          type="text"
          placeholder={CONFIRMATION_MESSAGE}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <AlertDialogFooter className="flex flex-row justify-end gap-2 mt-4">
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
            variant="destructive"
            disabled={inputValue !== CONFIRMATION_MESSAGE}
          >
            Usuń konto
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

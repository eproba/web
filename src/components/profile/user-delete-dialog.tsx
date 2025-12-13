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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApi } from "@/lib/api-client";
import { authClient } from "@/lib/auth-client";
import { ToastMsg } from "@/lib/toast-msg";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

export const UserDeleteDialog = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) => {
  const CONFIRMATION_MESSAGE = "USUŃ KONTO";

  const { apiClient } = useApi();
  const router = useRouter();

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
      await authClient.signOut();
      router.push("/");
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
        <AlertDialogFooter className="mt-4 flex flex-row justify-end gap-2">
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

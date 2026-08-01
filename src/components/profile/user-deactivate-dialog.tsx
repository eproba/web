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
import { toast } from "@/components/ui/toast";
import { useApi } from "@/lib/api-client";
import { ToastMsg } from "@/lib/toast-msg";
import { User } from "@/types/user";
import { signOut } from "next-auth/react";
import React from "react";

export const UserDeactivateDialog = ({
  children,
  user,
}: {
  children: React.ReactElement;
  user: User;
}) => {
  const { apiClient } = useApi();

  const handleSubmit = async () => {
    try {
      await apiClient(`/user/`, {
        method: "PATCH",
        body: JSON.stringify({ is_active: false }),
      });
      toast.add({
        title: "Twoje konto zostało dezaktywowane",
        type: "success",
      });
      await signOut({ redirectTo: "/signout" });
    } catch (error) {
      toast.add({
        ...ToastMsg({
          data: {
            title:
              "Nie udało się dezaktywować twojego konta, skontaktuj się z administratorem",
            description: error as Error,
          },
        }),
        type: "error",
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger render={children} />
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>Dezaktywuj konto</AlertDialogTitle>
          <AlertDialogDescription>
            Czy na pewno chcesz dezaktywować swoje konto ({user.email})?
            Będziesz mógł je przywrócić kontaktując się z administratorem lub
            twoim drużynowym.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 flex flex-row justify-end gap-2">
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} variant="destructive">
            Dezaktywuj konto
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

"use client";

import React from "react";
import { useApi } from "@/lib/api-client";
import { User } from "@/types/user";
import { toast } from "react-toastify";
import { ToastMsg } from "@/lib/toast-msg";
import { useRouter } from "next/navigation";
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
import { signOut } from "next-auth/react";

export const UserDeactivateDialog = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) => {
  const { apiClient } = useApi();
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      await apiClient(`/user/`, {
        method: "PATCH",
        body: JSON.stringify({ is_active: false }),
      });
      toast.success("Twoje konto zostało dezaktywowane");
      await signOut({ redirectTo: "/" });
      router.refresh();
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title:
              "Nie udało się dezaktywować twojego konta, skontaktuj się z administratorem",
            description: error as Error,
          },
        }),
      );
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>Dezaktywuj konto</AlertDialogTitle>
          <AlertDialogDescription>
            Czy na pewno chcesz dezaktywować swoje konto ({user.email})?
            Będziesz mógł je przywrócić kontaktując się z administratorem lub
            twoim drużynowym.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-row justify-end gap-2 mt-4">
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction onClick={handleSubmit} variant="destructive">
            Dezaktywuj konto
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

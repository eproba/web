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
import { useApi } from "@/lib/api-client";
import { ToastMsg } from "@/lib/toast-msg";
import { User } from "@/types/user";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useDebouncedCallback } from "use-debounce";

interface UserPasswordResetDialogProps {
  user: User;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}

export function UserPasswordResetDialog({
  user,
  isLoading,
  setIsLoading,
  children,
}: UserPasswordResetDialogProps) {
  const { apiClient } = useApi();
  const [newPassword, setNewPassword] = useState<string>("");
  const debouncedClearNewPassword = useDebouncedCallback(() => {
    setNewPassword("");
  }, 500);

  const onPasswordReset = async () => {
    setIsLoading(true);
    try {
      const response = await apiClient(`/users/${user.id}/reset-password/`, {
        method: "POST",
      });
      const data = await response.json();
      setNewPassword(data.new_password);
      setIsLoading(false);
      toast.success(
        `Hasło zostało zresetowane${!user.email.endsWith("@eproba.zhr.pl") && "i wysłane na email użytkownika"}`,
      );
    } catch (error) {
      setIsLoading(false);
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się zresetować hasła",
            description: error as Error,
          },
        }),
      );
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) {
          debouncedClearNewPassword();
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Zresetuj hasło użytkownika</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          {newPassword ? (
            <span>
              Nowe hasło: <span className="font-semibold">{newPassword}</span>
            </span>
          ) : (
            <span>
              Czy na pewno chcesz zresetować hasło{" "}
              {user.displayName || user.email}?
              <br />
              <br />
              {!user.email.endsWith("@eproba.zhr.pl") ? (
                <span>
                  {user.nickname || user.firstName || user.email} otrzyma na
                  maila nowe hasło oraz wyświetli się ono tutaj.
                </span>
              ) : (
                <span>
                  {user.nickname || user.firstName || user.email} otrzyma nowe
                  hasło, które będzie widoczne tutaj.
                </span>
              )}
            </span>
          )}
        </DialogDescription>
        <DialogFooter className="mt-4 flex flex-row justify-end gap-2">
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isLoading}>
              {newPassword ? "Zamknij" : "Anuluj"}
            </Button>
          </DialogClose>
          {newPassword ? (
            <Button
              type="button"
              variant="info"
              onClick={() => {
                navigator.clipboard.writeText(newPassword);
                toast.success("Hasło skopiowane do schowka");
              }}
              disabled={isLoading}
            >
              Skopiuj hasło
            </Button>
          ) : (
            <Button
              variant="info"
              onClick={onPasswordReset}
              disabled={isLoading}
            >
              Zresetuj hasło
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

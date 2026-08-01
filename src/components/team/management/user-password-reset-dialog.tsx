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
import { User } from "@/types/user";
import React, { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface UserPasswordResetDialogProps {
  user: User;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactElement;
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
      toast.add({
        title: `Hasło zostało zresetowane${!user.email.endsWith("@eproba.zhr.pl") && "i wysłane na email użytkownika"}`,
        type: "success",
      });
    } catch (error) {
      setIsLoading(false);
      toast.add({
        ...ToastMsg({
          data: {
            title: "Nie udało się zresetować hasła",
            description: error as Error,
          },
        }),
        type: "error",
      });
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
      <DialogTrigger render={children} />
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
          <DialogClose
            render={
              <Button type="button" variant="outline" disabled={isLoading}>
                {newPassword ? "Zamknij" : "Anuluj"}
              </Button>
            }
          />
          {newPassword ? (
            <Button
              type="button"
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(newPassword);
                toast.add({
                  title: "Hasło skopiowane do schowka",
                  type: "success",
                });
              }}
              disabled={isLoading}
            >
              Skopiuj hasło
            </Button>
          ) : (
            <Button
              variant="secondary"
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

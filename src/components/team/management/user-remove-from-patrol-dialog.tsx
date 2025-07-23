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
import { Organization } from "@/types/team";
import { User } from "@/types/user";
import React from "react";

interface UserRemoveFromPatrolDialogProps {
  user: User;
  currentUser: User;
  isLoading: boolean;
  onPatrolClear: () => void;
  children: React.ReactNode;
}

export function UserRemoveFromPatrolDialog({
  user,
  currentUser,
  isLoading,
  onPatrolClear,
  children,
}: UserRemoveFromPatrolDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent className="">
        <AlertDialogHeader>
          <AlertDialogTitle>Usuń użytkownika z drużyny</AlertDialogTitle>
          <AlertDialogDescription>
            Czy na pewno chcesz usunąć {user.displayName || user.email} z
            drużyny? Nie będziesz
            {currentUser.organization === Organization.Female
              ? " miała"
              : " miał"}{" "}
            możliwości samodzielnego przypisania{" "}
            {user.organization === Organization.Female ? "jej" : "go"} z
            powrotem do drużyny oraz utracisz dostęp do{" "}
            {user.organization === Organization.Female ? "jej" : "jego"} prób
            oraz danych.
            <br />
            <br />
            {user.nickname || user.firstName || user.email} będzie{" "}
            {user.organization === Organization.Female ? "mogła" : "mógł"}{" "}
            ponownie dołączyć do tej drużyny lub wybrać inną z poziomu edycji
            swojego profilu.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="mt-4 flex flex-row justify-end gap-2">
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={onPatrolClear}
            disabled={isLoading}
          >
            Usuń
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

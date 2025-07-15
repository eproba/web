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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ApiUserResponse } from "@/lib/serializers/user";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { Organization, Patrol } from "@/types/team";
import { InstructorRank, ScoutRank, User, UserFunction } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCheckIcon, UserLockIcon, UserXIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  nickname: z.string().optional(),
  email: z.email({
    error: (issue) =>
      !issue.input ? "Email jest wymagany" : "Nieprawidłowy adres email",
  }),
  patrol: z.string().optional(),
  function: z.coerce.number().min(0).max(5),
  scoutRank: z.coerce.number().min(0).max(6),
  instructorRank: z.coerce.number().min(0).max(3),
  isActive: z.boolean(),
});

interface UserEditDialogProps {
  user: User;
  patrols: Patrol[];
  onUserUpdate: (
    userId: string,
    updatedUser: Partial<ApiUserResponse>,
  ) => Promise<boolean>;
  children: React.ReactNode;
  currentUser: User;
  allowEditForLowerFunction: boolean;
}

export function UserEditDialog({
  user,
  patrols,
  onUserUpdate,
  children,
  currentUser,
  allowEditForLowerFunction,
}: UserEditDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      nickname: user.nickname ?? "",
      email: user.email,
      patrol: user.patrol ?? undefined,
      function: (user.function.numberValue ?? 0).toString(),
      scoutRank: (user.scoutRank.numberValue ?? 0).toString(),
      instructorRank: (user.instructorRank.numberValue ?? 0).toString(),
      isActive: user.isActive ?? true,
    },
  });

  const onSubmit = async (values: z.output<typeof formSchema>) => {
    setIsLoading(true);
    const updated = await onUserUpdate(user.id, {
      first_name: values.firstName ?? null,
      last_name: values.lastName ?? null,
      nickname: values.nickname ?? null,
      email: values.email,
      patrol: values.patrol ?? undefined,
      function: values.function,
      scout_rank: values.scoutRank,
      instructor_rank: values.scoutRank >= 5 ? values.instructorRank : 0,
      is_active: values.isActive,
    });
    if (updated) {
      setIsOpen(false);
    }
    setIsLoading(false);
  };

  const onPatrolClear = async () => {
    setIsLoading(true);
    const updated = await onUserUpdate(user.id, {
      patrol: null,
    });
    if (updated) {
      setIsOpen(false);
      toast.success(`Usunięto ${user.displayName || user.email} z drużyny`);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    form.reset({
      firstName: user.firstName ?? "",
      lastName: user.lastName ?? "",
      nickname: user.nickname ?? "",
      email: user.email,
      patrol: user.patrol ?? undefined,
      function: user.function.numberValue ?? 0,
      scoutRank: user.scoutRank.numberValue ?? 0,
      instructorRank: user.instructorRank.numberValue ?? 0,
      isActive: user.isActive ?? true,
    });
  }, [user, form]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        form.reset();
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                Edytuj{" "}
                {user.organization === Organization.Female
                  ? "harcerkę"
                  : "harcerza"}
              </DialogTitle>
              {user.function.numberValue > currentUser.function.numberValue &&
                currentUser.function.numberValue < 4 &&
                !allowEditForLowerFunction && (
                  <DialogDescription>
                    Nie możesz edytować tego użytkownika: Ta osoba ma wyższą
                    funkcję niż Ty.
                  </DialogDescription>
                )}
              {!user.isActive && (
                <DialogDescription>
                  Konto jest dezaktywowane: Ta osoba nie ma dostępu do
                  aplikacji. Możesz aktywować konto, aby przywrócić dostęp.
                </DialogDescription>
              )}
            </DialogHeader>
            <div
              className={cn(
                "flex flex-col gap-4 py-4",
                user.function.numberValue > currentUser.function.numberValue &&
                  currentUser.function.numberValue < 4 &&
                  !allowEditForLowerFunction &&
                  "pointer-events-none opacity-50",
              )}
            >
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Imię i nazwisko</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwisko</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="nickname"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pseudonim</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="patrol"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Zastęp</FormLabel>
                    <FormControl>
                      <div>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Wybierz zastęp" />
                          </SelectTrigger>
                          <SelectContent>
                            {patrols.map((patrol) => (
                              <SelectItem key={patrol.id} value={patrol.id}>
                                {patrol.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="function"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Funkcja</FormLabel>
                    <FormControl>
                      <div>
                        <Select
                          onValueChange={field.onChange}
                          value={String(form.watch("function"))} // Watch this field as it can be changed programmatically
                          disabled={
                            !form.watch("isActive") && field.value === 0
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Wybierz zastęp" />
                          </SelectTrigger>
                          <SelectContent>
                            {UserFunction.values.map((fn) => (
                              <SelectItem
                                key={fn.value}
                                value={fn.value.toString()}
                                disabled={
                                  fn.value > currentUser.function.numberValue &&
                                  currentUser.function.value < 4 &&
                                  !allowEditForLowerFunction
                                }
                              >
                                {user.organization === Organization.Female
                                  ? fn.female
                                  : fn.male}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex w-full flex-row gap-2">
                <FormField
                  control={form.control}
                  name="scoutRank"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel className="truncate">
                        Stopień harcerski
                      </FormLabel>
                      <FormControl className="overflow-hidden">
                        <div>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={String(field.value)}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Wybierz stopień" />
                            </SelectTrigger>
                            <SelectContent>
                              {ScoutRank.values.map((rank) => (
                                <SelectItem
                                  key={rank.value}
                                  value={rank.value.toString()}
                                >
                                  {capitalizeFirstLetter(
                                    user.organization === Organization.Female
                                      ? rank.female
                                      : rank.male,
                                  )}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {Number(form.watch("scoutRank")) >= 5 && (
                  <FormField
                    control={form.control}
                    name="instructorRank"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel className="truncate">
                          Stopień instruktorski
                        </FormLabel>
                        <FormControl className="overflow-hidden">
                          <div>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={String(field.value)}
                            >
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Wybierz stopień" />
                              </SelectTrigger>
                              <SelectContent>
                                {InstructorRank.values.map((rank) => (
                                  <SelectItem
                                    key={rank.value}
                                    value={rank.value.toString()}
                                  >
                                    {capitalizeFirstLetter(
                                      user.organization === Organization.Female
                                        ? rank.female
                                        : rank.male,
                                    )}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}
              </div>
            </div>
            <DialogFooter>
              {form.watch("isActive") !== user.isActive && (
                <span className="text-muted-foreground text-sm sm:hidden">
                  {form.watch("isActive")
                    ? "Zapisz aby aktywować"
                    : "Zapisz aby dezaktywować"}
                </span>
              )}
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <AlertDialog>
                    <Tooltip>
                      <AlertDialogTrigger asChild>
                        <TooltipTrigger asChild>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            disabled={
                              isLoading ||
                              (user.function.numberValue >
                                currentUser.function.numberValue &&
                                currentUser.function.numberValue < 4 &&
                                !allowEditForLowerFunction)
                            }
                          >
                            <UserXIcon className="size-4" />
                          </Button>
                        </TooltipTrigger>
                      </AlertDialogTrigger>
                      <TooltipContent>
                        Usuń użytkownika z drużyny
                      </TooltipContent>
                    </Tooltip>
                    <AlertDialogContent className="">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Usuń użytkownika z drużyny
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Czy na pewno chcesz usunąć{" "}
                          {user.displayName || user.email} z drużyny? Nie
                          będziesz
                          {currentUser.organization === Organization.Female
                            ? " miała"
                            : " miał"}{" "}
                          możliwości samodzielnego przypisania{" "}
                          {user.organization === Organization.Female
                            ? "jej"
                            : "go"}{" "}
                          z powrotem do drużyny oraz utracisz dostęp do{" "}
                          {user.organization === Organization.Female
                            ? "jej"
                            : "jego"}{" "}
                          prób oraz danych.
                          <br />
                          <br />
                          {user.nickname ||
                            user.firstName ||
                            user.email} będzie{" "}
                          {user.organization === Organization.Female
                            ? "mogła"
                            : "mógł"}{" "}
                          ponownie dołączyć do tej drużyny lub wybrać inną z
                          poziomu edycji swojego profilu.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter className="mt-4 flex flex-row justify-end gap-2">
                        <AlertDialogCancel>Anuluj</AlertDialogCancel>
                        <AlertDialogAction
                          variant="destructive"
                          onClick={onPatrolClear}
                        >
                          Usuń
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {form.watch("isActive") ? (
                        <Button
                          type="button"
                          variant="warning"
                          size="icon"
                          onClick={() => {
                            form.setValue("isActive", false);
                            form.setValue("function", 0);
                          }}
                          disabled={
                            isLoading ||
                            (user.function.numberValue >
                              currentUser.function.numberValue &&
                              currentUser.function.numberValue < 4 &&
                              !allowEditForLowerFunction)
                          }
                        >
                          <UserLockIcon className="size-4" />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          variant="info"
                          size="icon"
                          onClick={() => {
                            form.setValue("isActive", true);
                            form.setValue(
                              "function",
                              user.function.numberValue,
                            );
                          }}
                          disabled={
                            isLoading ||
                            (user.function.numberValue >
                              currentUser.function.numberValue &&
                              currentUser.function.numberValue < 4 &&
                              !allowEditForLowerFunction)
                          }
                        >
                          <UserCheckIcon className="size-4" />
                        </Button>
                      )}
                    </TooltipTrigger>
                    <TooltipContent>
                      {form.watch("isActive")
                        ? "Dezaktywuj konto użytkownika"
                        : "Aktywuj konto użytkownika"}
                    </TooltipContent>
                  </Tooltip>
                  {form.watch("isActive") !== user.isActive && (
                    <span className="text-muted-foreground hidden text-sm sm:inline">
                      {form.watch("isActive")
                        ? "Zapisz aby aktywować"
                        : "Zapisz aby dezaktywować"}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="outline"
                      disabled={isLoading}
                    >
                      Anuluj
                    </Button>
                  </DialogClose>
                  <Button
                    type="submit"
                    disabled={
                      isLoading ||
                      (user.function.numberValue >
                        currentUser.function.numberValue &&
                        currentUser.function.numberValue < 4 &&
                        !allowEditForLowerFunction)
                    }
                  >
                    {isLoading ? "Zapisywanie..." : "Zapisz"}
                  </Button>
                </div>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

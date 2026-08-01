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
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/toast";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ApiUserResponse } from "@/lib/serializers/user";
import { capitalizeFirstLetter, cn } from "@/lib/utils";
import { useCurrentUser } from "@/state/user";
import { Organization, Patrol } from "@/types/team";
import { InstructorRank, ScoutRank, User, UserFunction } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RotateCcwKeyIcon,
  UserCheckIcon,
  UserLockIcon,
  UserXIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import * as z from "zod";

import { UserPasswordResetDialog } from "./user-password-reset-dialog";
import { UserRemoveFromPatrolDialog } from "./user-remove-from-patrol-dialog";

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
  children: React.ReactElement;
  allowEditForLowerFunction: boolean;
}

export function UserEditDialog({
  user,
  patrols,
  onUserUpdate,
  children,
  allowEditForLowerFunction,
}: UserEditDialogProps) {
  const currentUser = useCurrentUser();
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

  const {
    function: functionValue,
    isActive,
    scoutRank,
  } = useWatch({
    control: form.control,
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
      toast.add({
        title: `Usunięto ${user.displayName || user.email} z drużyny`,
        type: "success",
      });
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
      <DialogTrigger nativeButton={false} render={children} />
      <DialogContent>
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                Edytuj{" "}
                {user.organization === Organization.Female
                  ? "harcerkę"
                  : "harcerza"}
              </DialogTitle>
              {currentUser &&
                user.function.numberValue > currentUser.function.numberValue &&
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
                currentUser &&
                  user.function.numberValue >
                    currentUser.function.numberValue &&
                  currentUser.function.numberValue < 4 &&
                  !allowEditForLowerFunction &&
                  "pointer-events-none opacity-50",
              )}
            >
              <Controller
                control={form.control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Imię</FieldLabel>

                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Nazwisko</FieldLabel>

                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="nickname"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Pseudonim</FieldLabel>

                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="email"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>

                    <Input
                      type="email"
                      {...field}
                      aria-invalid={fieldState.invalid}
                      id={field.name}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="patrol"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Zastęp</FieldLabel>

                    <Select
                      items={patrols.map((patrol) => ({
                        label: patrol.name,
                        value: patrol.id,
                      }))}
                      onValueChange={(value) => {
                        if (value !== null) {
                          field.onChange(value);
                        }
                      }}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                        id={field.name}
                      >
                        <SelectValue placeholder="Wybierz zastęp" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {patrols.map((patrol) => (
                            <SelectItem key={patrol.id} value={patrol.id}>
                              {patrol.name}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <Controller
                control={form.control}
                name="function"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Funkcja</FieldLabel>

                    <Select
                      items={UserFunction.values.map((fn) => ({
                        label:
                          user.organization === Organization.Female
                            ? fn.female
                            : fn.male,
                        value: fn.value.toString(),
                      }))}
                      onValueChange={(value) => {
                        if (value !== null) {
                          field.onChange(value);
                        }
                      }}
                      value={String(functionValue)} // Watch this field as it can be changed programmatically
                      disabled={!isActive && field.value === 0}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                        id={field.name}
                      >
                        <SelectValue placeholder="Wybierz zastęp" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {UserFunction.values.map((fn) => (
                            <SelectItem
                              key={fn.value}
                              value={fn.value.toString()}
                              disabled={
                                !!currentUser &&
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
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
              <div className="flex w-full flex-row gap-2">
                <Controller
                  control={form.control}
                  name="scoutRank"
                  render={({ field, fieldState }) => (
                    <Field className="flex-1" data-invalid={fieldState.invalid}>
                      <FieldLabel className="truncate" htmlFor={field.name}>
                        Stopień harcerski
                      </FieldLabel>

                      <Select
                        items={ScoutRank.values.map((rank) => ({
                          label: capitalizeFirstLetter(
                            user.organization === Organization.Female
                              ? rank.female
                              : rank.male,
                          ),
                          value: rank.value.toString(),
                        }))}
                        onValueChange={(value) => {
                          if (value !== null) {
                            field.onChange(value);
                          }
                        }}
                        defaultValue={String(field.value)}
                      >
                        <SelectTrigger
                          className="w-full"
                          aria-invalid={fieldState.invalid}
                          id={field.name}
                        >
                          <SelectValue placeholder="Wybierz stopień" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
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
                          </SelectGroup>
                        </SelectContent>
                      </Select>

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
                {Number(scoutRank) >= 5 && (
                  <Controller
                    control={form.control}
                    name="instructorRank"
                    render={({ field, fieldState }) => (
                      <Field
                        className="flex-1"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldLabel className="truncate" htmlFor={field.name}>
                          Stopień instruktorski
                        </FieldLabel>

                        <Select
                          items={InstructorRank.values.map((rank) => ({
                            label: capitalizeFirstLetter(
                              user.organization === Organization.Female
                                ? rank.female
                                : rank.male,
                            ),
                            value: rank.value.toString(),
                          }))}
                          onValueChange={(value) => {
                            if (value !== null) {
                              field.onChange(value);
                            }
                          }}
                          defaultValue={String(field.value)}
                        >
                          <SelectTrigger
                            className="w-full"
                            aria-invalid={fieldState.invalid}
                            id={field.name}
                          >
                            <SelectValue placeholder="Wybierz stopień" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
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
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        {fieldState.invalid && (
                          <FieldError errors={[fieldState.error]} />
                        )}
                      </Field>
                    )}
                  />
                )}
              </div>
            </div>
            <DialogFooter>
              {isActive !== user.isActive && (
                <span className="text-muted-foreground text-xs sm:hidden">
                  {isActive
                    ? "Zapisz aby aktywować"
                    : "Zapisz aby dezaktywować"}
                </span>
              )}
              <div className="flex w-full items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Tooltip>
                    <UserRemoveFromPatrolDialog
                      user={user}
                      isLoading={isLoading}
                      onPatrolClear={onPatrolClear}
                    >
                      <TooltipTrigger
                        render={
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            disabled={
                              isLoading ||
                              (!!currentUser &&
                                user.function.numberValue >
                                  currentUser.function.numberValue &&
                                currentUser.function.numberValue < 4 &&
                                !allowEditForLowerFunction)
                            }
                          >
                            <UserXIcon className="size-4" />
                          </Button>
                        }
                      />
                    </UserRemoveFromPatrolDialog>
                    <TooltipContent>Usuń użytkownika z drużyny</TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger
                      render={
                        isActive ? (
                          <Button
                            type="button"
                            variant="outline"
                            size="icon"
                            onClick={() => {
                              form.setValue("isActive", false);
                              form.setValue("function", 0);
                            }}
                            disabled={
                              isLoading ||
                              (!!currentUser &&
                                user.function.numberValue >
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
                            variant="secondary"
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
                              (!!currentUser &&
                                user.function.numberValue >
                                  currentUser.function.numberValue &&
                                currentUser.function.numberValue < 4 &&
                                !allowEditForLowerFunction)
                            }
                          >
                            <UserCheckIcon className="size-4" />
                          </Button>
                        )
                      }
                    />
                    <TooltipContent>
                      {isActive
                        ? "Dezaktywuj konto użytkownika"
                        : "Aktywuj konto użytkownika"}
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <UserPasswordResetDialog
                      user={user}
                      isLoading={isLoading}
                      setIsLoading={setIsLoading}
                    >
                      <TooltipTrigger
                        render={
                          <Button
                            type="button"
                            variant="secondary"
                            size="icon"
                            disabled={isLoading}
                          >
                            <RotateCcwKeyIcon className="size-4" />
                          </Button>
                        }
                      />
                    </UserPasswordResetDialog>
                    <TooltipContent>Zresetuj hasło</TooltipContent>
                  </Tooltip>
                  {isActive !== user.isActive && (
                    <span className="text-muted-foreground hidden text-xs sm:inline">
                      {isActive
                        ? "Zapisz aby aktywować"
                        : "Zapisz aby dezaktywować"}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <DialogClose
                    render={
                      <Button
                        type="button"
                        variant="outline"
                        disabled={isLoading}
                      >
                        Anuluj
                      </Button>
                    }
                  />
                  <Button
                    type="submit"
                    disabled={
                      isLoading ||
                      (!!currentUser &&
                        user.function.numberValue >
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
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
}

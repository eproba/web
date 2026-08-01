"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/toast";
import { useApi } from "@/lib/api-client";
import { ToastMsg } from "@/lib/toast-msg";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

const getFormSchema = (variant: "change" | "set") => {
  const baseSchema = {
    oldPassword: z.string().min(variant === "change" ? 8 : 0, {
      error: "Hasło musi zawierać co najmniej 8 znaków",
    }),
    newPassword: z
      .string()
      .min(8, { error: "Hasło musi zawierać co najmniej 8 znaków" })
      .refine((val) => !/^\d+$/.test(val), {
        error: "Hasło nie może składać się wyłącznie z cyfr",
      }),
    confirmPassword: z.string(),
  };

  return z
    .object({
      ...baseSchema,
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      error: "Hasła nie są identyczne",
      path: ["confirmPassword"],
    });
};

type FormValues = z.infer<ReturnType<typeof getFormSchema>>;

export const PasswordChangeDialog = ({
  variant = "change",
  children,
}: {
  variant?: "change" | "set";
  children: React.ReactElement;
}) => {
  const { apiClient } = useApi();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(getFormSchema(variant)),
    defaultValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
  });
  const onSubmit = async (values: FormValues) => {
    try {
      const body: Record<string, string> = {
        new_password: values.newPassword,
      };

      if (variant === "change" && "oldPassword" in values) {
        body.old_password = values.oldPassword as string;
      }

      await apiClient(`/user/password/`, {
        method: "POST",
        body: JSON.stringify(body),
      });

      toast.add({
        title:
          variant === "change"
            ? "Hasło zostało zmienione"
            : "Hasło zostało ustawione",
        type: "success",
      });
      setOpen(false);
      router.refresh();
    } catch (error) {
      let hasFieldErrors = false;

      if (error && typeof error === "object" && "response" in error) {
        const errorData = error.response as Record<string, unknown>;

        const fieldMapping: Record<string, keyof FormValues> = {
          old_password: "oldPassword",
          new_password: "newPassword",
        };

        for (const [apiField, formField] of Object.entries(fieldMapping)) {
          if (errorData[apiField]) {
            const errorMessage = Array.isArray(errorData[apiField])
              ? errorData[apiField].join("\n")
              : String(errorData[apiField]);

            form.setError(formField, { message: errorMessage });
            hasFieldErrors = true;
          }
        }
      }

      if (!hasFieldErrors) {
        toast.add({
          ...ToastMsg({
            data: {
              title: "Nie udało się zmienić hasła",
              description: error as Error,
            },
          }),
          type: "error",
        });
      }
    } finally {
      if (form.formState.isSubmitSuccessful) {
        form.reset();
      }
    }
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(newOpen) => {
        setOpen(newOpen);
        if (newOpen) {
          form.reset();
        }
      }}
    >
      <DialogTrigger render={children} />
      <DialogContent className="sm:max-w-md">
        <FormProvider {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <DialogHeader>
              <DialogTitle>
                {variant === "change" ? "Zmień hasło" : "Ustaw hasło"}
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4 py-4">
              {variant === "change" && (
                <Controller
                  control={form.control}
                  name="oldPassword"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel htmlFor="oldPassword">
                        Obecne hasło
                      </FieldLabel>

                      <Input
                        id="oldPassword"
                        type="password"
                        {...field}
                        aria-invalid={fieldState.invalid}
                      />

                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              )}

              <Controller
                control={form.control}
                name="newPassword"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="newPassword">Nowe hasło</FieldLabel>

                    <Input
                      id="newPassword"
                      type="password"
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="confirmPassword"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">
                      Powtórz hasło
                    </FieldLabel>

                    <Input
                      id="confirmPassword"
                      type="password"
                      {...field}
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>

            <DialogFooter className="mt-4 flex flex-row justify-end gap-2">
              <DialogClose
                render={
                  <Button type="button" variant="outline">
                    Anuluj
                  </Button>
                }
              />
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? "Zapisywanie..." : "Zapisz"}
              </Button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

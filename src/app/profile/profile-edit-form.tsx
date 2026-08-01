"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
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
import { useApi } from "@/lib/api-client";
import { teamSerializer } from "@/lib/serializers/team";
import { userSerializer } from "@/lib/serializers/user";
import { ToastMsg } from "@/lib/toast-msg";
import { setCurrentUserAtom } from "@/state/user";
import { Patrol } from "@/types/team";
import { User } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSetAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, FormProvider, useForm } from "react-hook-form";
import * as z from "zod";

const formSchema = z.object({
  firstName: z.string().min(1, { error: "Imię jest wymagane" }),
  lastName: z.string().min(1, { error: "Nazwisko jest wymagane" }),
  nickname: z.string().optional(),
  email: z.email({
    error: (issue) =>
      !issue.input ? "Email jest wymagany" : "Nieprawidłowy adres email",
  }),
  patrol: z.string().optional(),
});

type ProfileFormValues = z.infer<typeof formSchema>;

export function ProfileEditForm({ user }: { user: User }) {
  const [patrols, setPatrols] = useState<Patrol[]>([
    {
      id: user.patrol ?? "",
      name: user.patrolName ?? "",
      team: user.team ?? "",
    },
  ]);
  const { apiClient, isApiReady, updateSession } = useApi();
  const router = useRouter();
  const setCurrentUser = useSetAtom(setCurrentUserAtom);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      nickname: user.nickname || "",
      email: user.email || "",
      patrol: user.patrol || "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const response = await apiClient("/user/", {
        method: "PATCH",
        body: JSON.stringify({
          first_name: data.firstName,
          last_name: data.lastName,
          nickname: data.nickname,
          email: data.email,
          patrol: data.patrol,
        }),
      });
      const updated = userSerializer(await response.json());
      setCurrentUser(updated);
      await updateSession(updated);
      toast.add({ title: "Profil został zaktualizowany", type: "success" });
      router.refresh();
    } catch (error) {
      toast.add({
        ...ToastMsg({
          data: {
            title: "Nie udało się zaktualizować profilu",
            description: error as Error,
          },
        }),
        type: "error",
      });
    }
  };

  useEffect(() => {
    async function fetchPatrols() {
      if (!user.team) {
        return;
      }
      try {
        const response = await apiClient(`/teams/${user.team}/`);
        setPatrols(
          (teamSerializer(await response.json()).patrols || []).sort((a, b) =>
            a.name.localeCompare(b.name),
          ),
        );
      } catch (error) {
        toast.add({
          ...ToastMsg({
            data: {
              title: "Nie udało się pobrać zastępów",
              description: error as Error,
            },
          }),
          type: "error",
        });
      }
    }

    if (isApiReady) {
      fetchPatrols();
    }
  }, [isApiReady, apiClient, user.team]);

  useEffect(() => {
    if (
      user.patrol &&
      !patrols.some((patrol) => patrol.id === form.getValues("patrol"))
    ) {
      form.setValue("patrol", user.patrol);
    }
  }, [user, patrols, form]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          control={form.control}
          name="firstName"
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={field.name}>Imię</FieldLabel>

              <Input
                placeholder="Podaj imię"
                {...field}
                aria-invalid={fieldState.invalid}
                id={field.name}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                placeholder="Podaj nazwisko"
                {...field}
                aria-invalid={fieldState.invalid}
                id={field.name}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                placeholder="Podaj twój pseudonim (jeśli masz)"
                {...field}
                aria-invalid={fieldState.invalid}
                id={field.name}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
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
                placeholder="twoj.mail@zhr.pl"
                {...field}
                aria-invalid={fieldState.invalid}
                id={field.name}
              />

              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {user.patrol && (
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
                  inputRef={field.ref}
                  name={field.name}
                  onValueChange={(value) => field.onChange(value ?? "")}
                  value={field.value || null}
                  disabled={!patrols.length}
                >
                  <SelectTrigger
                    className="w-full"
                    aria-invalid={fieldState.invalid}
                    id={field.name}
                  >
                    <SelectValue placeholder="Wybierz twój zastęp" />
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
                {[1, 2].includes(user.function.numberValue) && (
                  <FieldDescription>
                    Po zmianie zastępu twoja funkcja ({user.function.fullName})
                    zostanie zresetowana.
                  </FieldDescription>
                )}
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        )}

        <div className="flex items-center gap-4 pt-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Zapisuję..." : "Zapisz"}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
}

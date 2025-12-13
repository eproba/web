"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

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
      await updateSession();
      toast.success("Profil został zaktualizowany");
      router.refresh();
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się zaktualizować profilu",
            description: error as Error,
          },
        }),
      );
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
        toast.error(
          ToastMsg({
            data: {
              title: "Nie udało się pobrać zastępów",
              description: error as Error,
            },
          }),
        );
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Imię</FormLabel>
              <FormControl>
                <Input placeholder="Podaj imię" {...field} />
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
                <Input placeholder="Podaj nazwisko" {...field} />
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
                <Input
                  placeholder="Podaj twój pseudonim (jeśli masz)"
                  {...field}
                />
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
                <Input type="email" placeholder="twoj.mail@zhr.pl" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {user.patrol && (
          <FormField
            control={form.control}
            name="patrol"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Zastęp</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  disabled={!patrols.length}
                  {...field}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Wybierz twój zastęp" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {patrols.map((patrol) => (
                      <SelectItem key={patrol.id} value={patrol.id || "null"}>
                        {patrol.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {[1, 2].includes(user.function.numberValue) && (
                  <FormDescription>
                    Po zmianie zastępu twoja funkcja ({user.function.fullName})
                    zostanie zresetowana.
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <div className="flex items-center gap-4 pt-2">
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Zapisuję..." : "Zapisz"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

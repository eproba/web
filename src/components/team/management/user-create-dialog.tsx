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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiError } from "@/lib/api";
import { ApiUserResponse } from "@/lib/serializers/user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Organization, Patrol } from "@/types/team";
import { InstructorRank, ScoutRank, User, UserFunction } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDebouncedCallback } from "use-debounce";
import { z } from "zod";

const formSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  nickname: z.string().optional(),
  email: z.email({
    error: (issue) =>
      !issue.input ? "Email jest wymagany" : "Nieprawidłowy adres email",
  }),
  password: z.string().optional(),
  patrol: z.uuidv4({ error: "Zastęp jest wymagany" }),
  function: z.coerce.number().min(0).max(5),
  scoutRank: z.coerce.number().min(0).max(6),
  instructorRank: z.coerce.number().min(0).max(3),
});

interface UserEditDialogProps {
  patrols: Patrol[];
  onUserCreate: (
    createdUser: Partial<ApiUserResponse>,
  ) => Promise<(User & { newPassword: string }) | Error>;
  children: React.ReactNode;
  currentUser: User;
}

export function UserCreateDialog({
  patrols,
  onUserCreate,
  children,
  currentUser,
}: UserEditDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [createdUser, setCreatedUser] = useState<
    (User & { newPassword: string }) | null
  >(null);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      nickname: "",
      email: "",
      patrol: undefined,
      function: "0",
      scoutRank: "0",
      instructorRank: "0",
    },
  });

  const onSubmit = async (values: z.output<typeof formSchema>) => {
    console.log("Submitting user creation with values:", values);
    setIsLoading(true);
    const result = await onUserCreate({
      first_name: values.firstName ?? null,
      last_name: values.lastName ?? null,
      nickname: values.nickname ?? null,
      email: values.email,
      patrol: values.patrol ?? undefined,
      function: values.function,
      scout_rank: values.scoutRank,
      instructor_rank: values.scoutRank >= 5 ? values.instructorRank : 0,
    });
    if (!(result instanceof Error)) {
      setCreatedUser(result);
    }
    if (result instanceof ApiError) {
      if ("email" in result.response) {
        form.setError("email", {
          type: "manual",
          message:
            (result.response.email as string) || "Nieprawidłowy adres email",
        });
      }
    }
    setIsLoading(false);
  };

  const debouncedReset = useDebouncedCallback(() => {
    form.reset();
    setCreatedUser(null);
  }, 500);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        setIsOpen(open);
        if (!open) {
          debouncedReset();
        }
      }}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        {createdUser ? (
          <>
            <DialogHeader>
              <DialogTitle>Konto zostało utworzone</DialogTitle>
            </DialogHeader>
            <DialogDescription>
              Konto dla {createdUser.displayName || createdUser.email} zostało
              pomyślnie utworzone.
              <br />
              <br />
              Dane logowania to:
              <br />
              <strong>Email:</strong> {createdUser.email}
              <br />
              <strong>Hasło:</strong> {createdUser.newPassword}
              <br />
              <br />
              {createdUser.email.endsWith("@eproba.zhp.pl")
                ? "Pamiętaj, aby przekazać je nowemu członkowi drużyny. Ich kopie znajdziesz na swoim mailu."
                : "Dane logowania zostały również wysłane na podany adres email."}
            </DialogDescription>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isLoading}>
                  Zamknij
                </Button>
              </DialogClose>
            </DialogFooter>
          </>
        ) : (
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>
                  Załóż konto dla{" "}
                  {currentUser.organization === Organization.Female
                    ? "harcerki"
                    : "harcerza"}
                </DialogTitle>
                <DialogDescription>
                  Możesz ręcznie utworzyć konto dla nowego członka drużyny.
                  <br />
                  Zalecamy użycie tej opcji tylko jeśli{" "}
                  {currentUser.organization === Organization.Female
                    ? "harcerka"
                    : "harcerz"}{" "}
                  nie ma możliwości zarejestrowania się samodzielnie.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Imię</FormLabel>
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
                      <FormLabel>Email *</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
                      </FormControl>
                      <FormDescription>
                        <Popover>
                          <PopoverTrigger className="text-xs">
                            Brak adresu email? Kliknij aby wygenerować.
                          </PopoverTrigger>
                          <PopoverContent align="start">
                            Place content for the popover here.
                          </PopoverContent>
                        </Popover>
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="patrol"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zastęp *</FormLabel>
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
                            defaultValue={String(field.value)}
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
                                    fn.value >
                                      currentUser.function.numberValue &&
                                    currentUser.function.value < 4
                                  }
                                >
                                  {currentUser.organization ===
                                  Organization.Female
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
                                      currentUser.organization ===
                                        Organization.Female
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
                                        currentUser.organization ===
                                          Organization.Female
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
                <div className="flex w-full items-center justify-end gap-4">
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
                        isLoading || currentUser.function.numberValue < 4
                      }
                    >
                      {isLoading ? "Tworzenie..." : "Utwórz"}
                    </Button>
                  </div>
                </div>
              </DialogFooter>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}

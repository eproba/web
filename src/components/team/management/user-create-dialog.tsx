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
import { useApi } from "@/lib/api-client";
import { ApiUserResponse } from "@/lib/serializers/user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Organization, Patrol } from "@/types/team";
import { InstructorRank, ScoutRank, User, UserFunction } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { PopoverClose } from "@radix-ui/react-popover";
import React, { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useDebounce, useDebouncedCallback } from "use-debounce";
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
  const { apiClient } = useApi();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [internalEmailLogin, setInternalEmailLogin] = useState("");
  const [internalEmailLoginState, setIsInternalEmailLoginState] = useState<
    "valid" | "invalid" | "checking"
  >("invalid");
  const [debouncedInternalEmailLoginState] = useDebounce(
    internalEmailLoginState,
    500,
  );
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

  const emailAvailabilityCache = useMemo(() => new Map<string, boolean>(), []);

  const checkEmailAvailability = useCallback(
    async (email: string) => {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!email || email.split("@")[0].length < 5 || !re.test(email)) {
        setIsInternalEmailLoginState("invalid");
        return;
      }

      if (emailAvailabilityCache.has(email)) {
        setIsInternalEmailLoginState(
          emailAvailabilityCache.get(email) ? "valid" : "invalid",
        );
        return;
      }

      setIsInternalEmailLoginState("checking");

      try {
        const result = (await (
          await apiClient(
            `/users/email-available/?email=${encodeURIComponent(email)}`,
          )
        ).json()) as { available: boolean };
        emailAvailabilityCache.set(email, result.available || false);
        setIsInternalEmailLoginState(result.available ? "valid" : "invalid");
      } catch (error) {
        emailAvailabilityCache.set(email, false);
        setIsInternalEmailLoginState("invalid");
        console.error("Error checking email availability:", error);
      }
    },
    [apiClient, emailAvailabilityCache],
  );

  const debouncedReset = useDebouncedCallback(() => {
    form.reset();
    setCreatedUser(null);
    setInternalEmailLogin("");
    emailAvailabilityCache.clear();
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
              {createdUser.email.endsWith("@eproba.zhr.pl")
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
                          <PopoverContent
                            align="start"
                            className="text-sm sm:w-96"
                          >
                            <div className="flex flex-col gap-2">
                              <p>
                                Jeśli nie masz adresu email, możesz wygenerować
                                tymczasowy email, który będzie działał tylko do
                                logowania do Epróby.
                              </p>
                              <div className="flex items-center">
                                <Input
                                  type="text"
                                  placeholder="np. antoni.czaplicki"
                                  className="rounded-r-none"
                                  value={internalEmailLogin}
                                  onChange={(e) => {
                                    setInternalEmailLogin(
                                      e.target.value.trim(),
                                    );
                                    checkEmailAvailability(
                                      `${e.target.value.trim()}@eproba.zhr.pl`,
                                    );
                                  }}
                                />
                                <Input
                                  type="email"
                                  value="@eproba.zhr.pl"
                                  readOnly
                                  disabled
                                  containerClassName="w-fit"
                                  className="rounded-l-none px-2"
                                />
                              </div>
                              {internalEmailLoginState === "invalid" &&
                              internalEmailLogin.length >= 5 ? (
                                <p className="text-xs text-red-500">
                                  Adres email jest nieprawidłowy lub już zajęty.
                                </p>
                              ) : debouncedInternalEmailLoginState ===
                                "checking" ? (
                                <p className="text-xs text-gray-500">
                                  Sprawdzanie dostępności adresu email...
                                </p>
                              ) : (
                                <p className="text-xs text-gray-500">
                                  Co najmniej 5 znaków, bez spacji.
                                </p>
                              )}
                              <PopoverClose asChild>
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={async () => {
                                    form.setValue(
                                      "email",
                                      `${internalEmailLogin.trim()}@eproba.zhr.pl`,
                                    );
                                    setInternalEmailLogin("");
                                  }}
                                  disabled={
                                    isLoading ||
                                    !internalEmailLogin.trim() ||
                                    internalEmailLoginState !== "valid"
                                  }
                                >
                                  Użyj tego adresu
                                </Button>
                              </PopoverClose>
                            </div>
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

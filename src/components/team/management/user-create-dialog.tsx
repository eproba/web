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
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ApiError } from "@/lib/api";
import { useApi } from "@/lib/api-client";
import { ApiUserResponse } from "@/lib/serializers/user";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useCurrentUser } from "@/state/user";
import { Organization, Patrol } from "@/types/team";
import { InstructorRank, ScoutRank, User, UserFunction } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";
import { useDebounce, useDebouncedCallback } from "use-debounce";
import * as z from "zod";

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
  children: React.ReactElement;
}

export function UserCreateDialog({
  patrols,
  onUserCreate,
  children,
}: UserEditDialogProps) {
  const currentUser = useCurrentUser();
  const { apiClient } = useApi();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailPopoverOpen, setIsEmailPopoverOpen] = useState(false);
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

  const scoutRank = useWatch({
    control: form.control,
    name: "scoutRank",
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

  const emailAvailabilityCache = React.useRef(new Map<string, boolean>());

  const checkEmailAvailability = useCallback(
    async (email: string) => {
      const re =
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      if (!email || email.split("@")[0].length < 5 || !re.test(email)) {
        setIsInternalEmailLoginState("invalid");
        return;
      }

      if (emailAvailabilityCache.current.has(email)) {
        setIsInternalEmailLoginState(
          emailAvailabilityCache.current.get(email) ? "valid" : "invalid",
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
        emailAvailabilityCache.current.set(email, result.available || false);
        setIsInternalEmailLoginState(result.available ? "valid" : "invalid");
      } catch (error) {
        emailAvailabilityCache.current.set(email, false);
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
    emailAvailabilityCache.current.clear();
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
      <DialogTrigger render={children} />
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
              <DialogClose
                render={
                  <Button type="button" variant="outline" disabled={isLoading}>
                    Zamknij
                  </Button>
                }
              />
            </DialogFooter>
          </>
        ) : (
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <DialogHeader>
                <DialogTitle>
                  Załóż konto dla{" "}
                  {currentUser?.organization === Organization.Female
                    ? "harcerki"
                    : "harcerza"}
                </DialogTitle>
                <DialogDescription>
                  Możesz ręcznie utworzyć konto dla nowego członka drużyny.
                  <br />
                  Zalecamy użycie tej opcji tylko jeśli{" "}
                  {currentUser?.organization === Organization.Female
                    ? "harcerka"
                    : "harcerz"}{" "}
                  nie ma możliwości zarejestrowania się samodzielnie.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col gap-4 py-4">
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
                      <FieldLabel htmlFor={field.name}>Email *</FieldLabel>

                      <Input
                        type="email"
                        {...field}
                        aria-invalid={fieldState.invalid}
                        id={field.name}
                      />

                      <FieldDescription>
                        <Popover
                          open={isEmailPopoverOpen}
                          onOpenChange={setIsEmailPopoverOpen}
                        >
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
                                  className="w-fit rounded-l-none px-2"
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
                              <Button
                                type="button"
                                variant="outline"
                                onClick={() => {
                                  form.setValue(
                                    "email",
                                    `${internalEmailLogin.trim()}@eproba.zhr.pl`,
                                    {
                                      shouldValidate: true,
                                      shouldDirty: true,
                                    },
                                  );
                                  setInternalEmailLogin("");
                                  setIsEmailPopoverOpen(false);
                                }}
                                disabled={
                                  isLoading ||
                                  !internalEmailLogin.trim() ||
                                  internalEmailLoginState !== "valid"
                                }
                              >
                                Użyj tego adresu
                              </Button>
                            </div>
                          </PopoverContent>
                        </Popover>
                      </FieldDescription>
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
                      <FieldLabel htmlFor={field.name}>Zastęp *</FieldLabel>

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
                            currentUser?.organization === Organization.Female
                              ? fn.female
                              : fn.male,
                          value: fn.value.toString(),
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
                                  currentUser.function.value < 4
                                }
                              >
                                {currentUser?.organization ===
                                Organization.Female
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
                      <Field
                        className="flex-1"
                        data-invalid={fieldState.invalid}
                      >
                        <FieldLabel className="truncate" htmlFor={field.name}>
                          Stopień harcerski
                        </FieldLabel>

                        <Select
                          items={ScoutRank.values.map((rank) => ({
                            label: capitalizeFirstLetter(
                              currentUser?.organization === Organization.Female
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
                                    currentUser?.organization ===
                                      Organization.Female
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

                          <div
                            aria-invalid={fieldState.invalid}
                            id={field.name}
                          >
                            <Select
                              items={InstructorRank.values.map((rank) => ({
                                label: capitalizeFirstLetter(
                                  currentUser?.organization ===
                                    Organization.Female
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
                              <SelectTrigger className="w-full">
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
                                        currentUser?.organization ===
                                          Organization.Female
                                          ? rank.female
                                          : rank.male,
                                      )}
                                    </SelectItem>
                                  ))}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </div>

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
                <div className="flex w-full items-center justify-end gap-4">
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
                        (!!currentUser && currentUser.function.numberValue < 4)
                      }
                    >
                      {isLoading ? "Tworzenie..." : "Utwórz"}
                    </Button>
                  </div>
                </div>
              </DialogFooter>
            </form>
          </FormProvider>
        )}
      </DialogContent>
    </Dialog>
  );
}

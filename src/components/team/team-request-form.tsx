"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useApi } from "@/lib/api-client";
import {
  TeamRequestFormData,
  teamRequestSchema,
} from "@/lib/schemas/team-request";
import { districtSerializer } from "@/lib/serializers/team";
import { ToastMsg } from "@/lib/toast-msg";
import { useCurrentUser } from "@/state/user";
import { District } from "@/types/team";
import { ORGANIZATION_CHOICES } from "@/types/team-request";
import { UserFunction } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, TrashIcon, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, FormProvider, useForm, useWatch } from "react-hook-form";

export function TeamRequestForm() {
  const { apiClient, isApiReady } = useApi();
  const router = useRouter();
  const currentUser = useCurrentUser();
  const [districts, setDistricts] = useState<District[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TeamRequestFormData>({
    resolver: zodResolver(teamRequestSchema),
    defaultValues: {
      district: "",
      organization: 0,
      teamName: "",
      teamShortName: "",
      functionLevel: 4,
      patrols: ["Kadra", "Bez zastępu", ""],
      userPatrol: "Kadra",
    },
  });

  // Track user patrol by index instead of name to handle duplicate names
  const [userPatrolIndex, setUserPatrolIndex] = useState(0);

  // Fetch districts on component mount
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!isApiReady) return;

      try {
        const response = await apiClient("/districts/");
        const data = (await response.json()).map(districtSerializer);
        setDistricts(
          data.sort((a: District, b: District) => a.name.localeCompare(b.name)),
        );
      } catch (error) {
        toast.add({
          ...ToastMsg({
            data: {
              title: "Nie udało się pobrać okręgów",
              description: error as Error,
            },
          }),
          type: "error",
        });
      }
    };

    fetchDistricts();
  }, [isApiReady, apiClient]);

  const watchedPatrols = useWatch({
    control: form.control,
    name: "patrols",
  });
  const watchedOrganization = useWatch({
    control: form.control,
    name: "organization",
  });

  const addPatrol = () => {
    const currentPatrols = form.getValues("patrols");
    form.setValue("patrols", [...currentPatrols, ""]);
  };

  const removePatrol = (index: number) => {
    const currentPatrols = form.getValues("patrols");
    const newPatrols = currentPatrols.filter((_, i) => i !== index);

    form.setValue("patrols", newPatrols);

    let nextUserPatrolIndex = userPatrolIndex;
    if (index === userPatrolIndex) {
      nextUserPatrolIndex = 0;
    } else if (index < userPatrolIndex) {
      nextUserPatrolIndex = userPatrolIndex - 1;
    }

    setUserPatrolIndex(nextUserPatrolIndex);
    form.setValue("userPatrol", newPatrols[nextUserPatrolIndex] ?? "");
  };

  const updatePatrolName = (index: number, value: string) => {
    const currentPatrols = form.getValues("patrols");
    const newPatrols = [...currentPatrols];
    newPatrols[index] = value;

    form.setValue("patrols", newPatrols);

    if (index === userPatrolIndex) {
      form.setValue("userPatrol", value);
    }
  };

  const setUserPatrol = (index: number) => {
    setUserPatrolIndex(index);
    const patrolName = watchedPatrols[index];
    if (patrolName !== undefined) {
      form.setValue("userPatrol", patrolName);
    }
  };

  const onSubmit = async (data: TeamRequestFormData) => {
    setIsSubmitting(true);

    try {
      const validPatrols = data.patrols.filter(
        (patrol) => patrol.trim() !== "",
      );

      if (validPatrols.length === 0) {
        toast.add({ title: "Dodaj przynajmniej jeden zastęp.", type: "error" });
        setIsSubmitting(false);
        return;
      }

      const userPatrol =
        validPatrols[Math.min(userPatrolIndex, validPatrols.length - 1)] ||
        validPatrols[0];

      const submissionData = {
        district: data.district,
        organization: data.organization,
        team_name: data.teamName,
        team_short_name: data.teamShortName,
        function_level: data.functionLevel,
        patrols: validPatrols,
        user_patrol: userPatrol,
      };

      await apiClient("/team-requests/", {
        method: "POST",
        body: JSON.stringify(submissionData),
      });

      router.push("/team/request/success");
    } catch (error) {
      toast.add({
        ...ToastMsg({
          data: {
            title: "Nie udało się wysłać zgłoszenia",
            description: error as Error,
          },
        }),
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Zgłoszenie drużyny
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentUser?.patrol && (
            <Alert className="mb-6 border-yellow-500/40 bg-yellow-500/10">
              <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                Jesteś obecnie przypisany do zastępu &quot;
                {currentUser.patrolName}&quot; w &quot;{currentUser.teamName}
                &quot;. Jeśli zgłosisz swoją drużynę, zostaniesz automatycznie
                usunięty z tego zastępu i przypisany do nowej drużyny.
              </AlertDescription>
            </Alert>
          )}

          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Controller
                control={form.control}
                name="organization"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Twoja organizacja
                    </FieldLabel>
                    <Select
                      items={ORGANIZATION_CHOICES.map((org) => ({
                        label: org.label,
                        value: org.value.toString(),
                      }))}
                      onValueChange={(value) => {
                        if (value !== null) {
                          field.onChange(Number(value));
                        }
                      }}
                      value={field.value.toString()}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                        id={field.name}
                      >
                        <SelectValue placeholder="Wybierz organizację" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {ORGANIZATION_CHOICES.map((org) => (
                            <SelectItem
                              key={org.value}
                              value={org.value.toString()}
                            >
                              {org.label}
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
                name="district"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Okręg</FieldLabel>
                    <Select
                      items={districts.map((district) => ({
                        label: district.name,
                        value: district.id,
                      }))}
                      onValueChange={(value) => {
                        if (value !== null) {
                          field.onChange(value);
                        }
                      }}
                      value={field.value}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                        id={field.name}
                      >
                        <SelectValue placeholder="Wybierz okręg" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {districts.map((district) => (
                            <SelectItem key={district.id} value={district.id}>
                              {district.name}
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
                name="teamName"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Nazwa drużyny</FieldLabel>

                    <Input
                      placeholder="np. 30 Zielonogórska Drużyna Harcerzy Orlęta im. Cichociemnych"
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
                name="teamShortName"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>
                      Skrócona nazwa drużyny
                    </FieldLabel>

                    <Input
                      placeholder="np. 30 ZDH"
                      maxLength={10}
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
                name="functionLevel"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Twoja funkcja</FieldLabel>
                    <Select
                      items={UserFunction.values
                        .filter((func) => func.value >= 3)
                        .map((func) => ({
                          label:
                            watchedOrganization === 0 ? func.male : func.female,
                          value: func.value.toString(),
                        }))}
                      onValueChange={(value) => {
                        if (value !== null) {
                          field.onChange(Number(value));
                        }
                      }}
                      value={field.value.toString()}
                    >
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={fieldState.invalid}
                        id={field.name}
                      >
                        <SelectValue placeholder="Wybierz funkcję" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectGroup>
                          {UserFunction.values
                            .filter((func) => func.value >= 3)
                            .map((func) => (
                              <SelectItem
                                key={func.value}
                                value={func.value.toString()}
                              >
                                {watchedOrganization === 0
                                  ? func.male
                                  : func.female}
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

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-8">
                  <FieldLabel className="text-sm font-medium">
                    Zastępy
                  </FieldLabel>
                  <span className="text-muted-foreground max-w-xs truncate text-xs">
                    {watchedPatrols[userPatrolIndex] &&
                      `Twój zastęp: ${watchedPatrols[userPatrolIndex]}`}
                  </span>
                </div>

                <div className="space-y-3">
                  {watchedPatrols.map((patrol, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="flex-1">
                        <Input
                          value={patrol}
                          onChange={(e) =>
                            updatePatrolName(index, e.target.value)
                          }
                          placeholder="Nazwa zastępu"
                          className={
                            userPatrolIndex === index
                              ? "ring-2 ring-blue-500"
                              : ""
                          }
                        />
                      </div>
                      <Button
                        type="button"
                        variant={
                          userPatrolIndex === index ? "default" : "outline"
                        }
                        size="icon"
                        onClick={() => setUserPatrol(index)}
                        title="Ustaw jako mój zastęp"
                        disabled={!patrol.trim()}
                      >
                        <UserIcon className="size-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removePatrol(index)}
                        disabled={watchedPatrols.length <= 1}
                        title="Usuń zastęp"
                      >
                        <TrashIcon className="size-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={addPatrol}
                  className="w-full border-dashed"
                >
                  <PlusIcon className="mr-2 size-4" />
                  Dodaj zastęp
                </Button>

                <Controller
                  control={form.control}
                  name="patrols"
                  render={({ fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-32"
                >
                  {isSubmitting ? "Wysyłanie..." : "Zgłoś drużynę"}
                </Button>
              </div>
            </form>
          </FormProvider>
        </CardContent>
      </Card>
    </div>
  );
}

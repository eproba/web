"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusIcon, TrashIcon, UserIcon } from "lucide-react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useApi } from "@/lib/api-client";
import { ToastMsg } from "@/lib/toast-msg";
import {
  TeamRequestFormData,
  teamRequestSchema,
} from "@/lib/schemas/team-request";
import { ORGANIZATION_CHOICES } from "@/types/team-request";
import { District } from "@/types/team";
import { districtSerializer } from "@/lib/serializers/team";
import { User, UserFunction } from "@/types/user";

interface TeamRequestFormProps {
  currentUser: User;
}

export function TeamRequestForm({ currentUser }: TeamRequestFormProps) {
  const { apiClient, isApiReady } = useApi();
  const router = useRouter();
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
        toast.error(
          ToastMsg({
            data: {
              title: "Nie udało się pobrać okręgów",
              description: error as Error,
            },
          }),
        );
      }
    };

    fetchDistricts();
  }, [isApiReady, apiClient]);

  const watchedPatrols = form.watch("patrols");

  useEffect(() => {
    if (userPatrolIndex >= watchedPatrols.length || userPatrolIndex < 0) {
      setUserPatrolIndex(0);
    }
    const currentPatrolName = watchedPatrols[userPatrolIndex];
    if (currentPatrolName !== undefined) {
      form.setValue("userPatrol", currentPatrolName);
    }
  }, [watchedPatrols, userPatrolIndex, form]);

  const addPatrol = () => {
    const currentPatrols = form.getValues("patrols");
    form.setValue("patrols", [...currentPatrols, ""]);
  };

  const removePatrol = (index: number) => {
    const currentPatrols = form.getValues("patrols");
    const newPatrols = currentPatrols.filter((_, i) => i !== index);

    form.setValue("patrols", newPatrols);

    if (index === userPatrolIndex) {
      setUserPatrolIndex(0);
    } else if (index < userPatrolIndex) {
      setUserPatrolIndex(userPatrolIndex - 1);
    }
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
        toast.error("Dodaj przynajmniej jeden zastęp.");
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

      toast.success("Zgłoszenie drużyny zostało wysłane pomyślnie!");
      router.push("/team");
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się wysłać zgłoszenia",
            description: error as Error,
          },
        }),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Zgłoszenie drużyny
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentUser.patrol && (
            <Alert className="mb-6 bg-yellow-500/10 border-yellow-500/40">
              <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                Jesteś obecnie przypisany do zastępu &quot;
                {currentUser.patrolName}&quot; w &quot;{currentUser.teamName}
                &quot;. Jeśli zgłosisz swoją drużynę, zostaniesz automatycznie
                usunięty z tego zastępu i przypisany do nowej drużyny.
              </AlertDescription>
            </Alert>
          )}

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="organization"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twoja organizacja</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz organizację" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ORGANIZATION_CHOICES.map((org) => (
                          <SelectItem
                            key={org.value}
                            value={org.value.toString()}
                          >
                            {org.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="district"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Okręg</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz okręg" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district.id} value={district.id}>
                            {district.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nazwa drużyny</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="np. 30 Zielonogórska Drużyna Harcerzy Orlęta im. Cichociemnych"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="teamShortName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Skrócona nazwa drużyny</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="np. 30 ZDH"
                        maxLength={10}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="functionLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twoja funkcja</FormLabel>
                    <Select
                      onValueChange={(value) => field.onChange(Number(value))}
                      value={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Wybierz funkcję" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {UserFunction.values
                          .filter((func) => func.value >= 3)
                          .map((func) => (
                            <SelectItem
                              key={func.value}
                              value={func.value.toString()}
                            >
                              {form.watch("organization") === 0
                                ? func.male
                                : func.female}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="space-y-4">
                <div className="flex items-center justify-between gap-8">
                  <FormLabel className="text-sm font-medium">Zastępy</FormLabel>
                  <span className="text-xs text-muted-foreground truncate max-w-xs">
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
                  <PlusIcon className="size-4 mr-2" />
                  Dodaj zastęp
                </Button>

                <FormField
                  control={form.control}
                  name="patrols"
                  render={() => (
                    <FormItem>
                      <FormMessage />
                    </FormItem>
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
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}

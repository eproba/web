"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { useApi } from "@/lib/api-client";
import { ToastMsg } from "@/lib/toast-msg";
import { zodResolver } from "@hookform/resolvers/zod";
import { EyeIcon, PlusIcon, TrashIcon, WebhookIcon } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import * as z from "zod";

export type Webhook = {
  id: string;
  url: string;
  secret: string;
  events: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

const AVAILABLE_EVENTS = [
  { id: "task.status_changed", label: "Zmiana statusu zadania" },
  { id: "task.sent_to_review", label: "Wysłano zadanie do weryfikacji" },
];

const createWebhookSchema = z.object({
  url: z.string().url({ message: "Podaj prawidłowy adres URL" }),
  events: z
    .array(z.string())
    .min(1, { message: "Wybierz przynajmniej jedno zdarzenie" }),
});

export function WebhooksCard() {
  const [webhooks, setWebhooks] = useState<Webhook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { apiClient } = useApi();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  const form = useForm<z.infer<typeof createWebhookSchema>>({
    resolver: zodResolver(createWebhookSchema),
    defaultValues: {
      url: "",
      events: [],
    },
  });

  const [selectedWebhook, setSelectedWebhook] = useState<Webhook | null>(null);

  const fetchWebhooks = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await apiClient("/webhooks/", {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setWebhooks(data);
      }
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się pobrać webhooków",
            description: error as Error,
          },
        }),
      );
    } finally {
      setIsLoading(false);
    }
  }, [apiClient]);

  useEffect(() => {
    fetchWebhooks();
  }, [fetchWebhooks]);

  const handleToggleState = async (id: string, currentState: boolean) => {
    try {
      const response = await apiClient(`/webhooks/${id}/`, {
        method: "PATCH",
        body: JSON.stringify({ is_active: !currentState }),
      });
      if (response.ok) {
        toast.success("Zaktualizowano status webhooka");
        fetchWebhooks();
      }
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się zaktualizować webhooka",
            description: error as Error,
          },
        }),
      );
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Czy na pewno chcesz usunąć ten webhook?")) return;
    try {
      const response = await apiClient(`/webhooks/${id}/`, {
        method: "DELETE",
      });
      if (response.ok) {
        toast.success("Webhook usunięty");
        fetchWebhooks();
      }
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się usunąć webhooka",
            description: error as Error,
          },
        }),
      );
    }
  };

  const onSubmit = async (values: z.infer<typeof createWebhookSchema>) => {
    setIsCreating(true);
    try {
      const response = await apiClient("/webhooks/", {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (response.ok) {
        toast.success("Webhook utworzony");
        setIsCreateModalOpen(false);
        form.reset();
        fetchWebhooks();
      } else {
        const errorData = await response.json();
        toast.error(errorData?.url?.[0] || "Błąd podczas tworzenia webhooka");
      }
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się utworzyć webhooka",
            description: error as Error,
          },
        }),
      );
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      <Card className="mt-4 gap-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <h2 className="text-xl font-semibold">Webhooki</h2>
          <Button
            size="sm"
            onClick={() => setIsCreateModalOpen(true)}
            className="flex items-center gap-2"
          >
            <PlusIcon size={16} />
            Dodaj Webhook
          </Button>
        </CardHeader>
        <CardContent>
          {webhooks.length > 0 ? (
            <div className="space-y-4">
              {webhooks.map((webhook) => (
                <div
                  key={webhook.id}
                  className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <WebhookIcon className="size-8 shrink-0" />
                    <div className="overflow-hidden">
                      <p className="truncate font-medium" title={webhook.url}>
                        {webhook.url}
                      </p>
                      <div className="mt-1 flex items-center gap-2">
                        <p className="text-muted-foreground text-sm">
                          Utworzono:{" "}
                          {new Date(webhook.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-center justify-end gap-2">
                    <div className="mr-2 flex items-center gap-2">
                      <span className="text-muted-foreground text-sm font-medium">
                        {webhook.is_active ? "Aktywny" : "Wyłączony"}
                      </span>
                      <Switch
                        checked={webhook.is_active}
                        onCheckedChange={() =>
                          handleToggleState(webhook.id, webhook.is_active)
                        }
                        aria-label="Przełącz status"
                      />
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setSelectedWebhook(webhook)}
                      title="Szczegóły"
                    >
                      <EyeIcon size={18} />
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDelete(webhook.id)}
                      title="Usuń"
                    >
                      <TrashIcon size={18} />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : isLoading ? (
            <div className="space-y-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="flex flex-col justify-between gap-4 rounded-lg border p-4 sm:flex-row"
                >
                  <div className="flex items-center gap-3">
                    <Skeleton className="size-8" />
                    <div>
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="mt-2 h-4 w-24" />
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2">
                    <Skeleton className="h-9 w-12 rounded-full" />
                    <Skeleton className="h-9 w-9 rounded-md" />
                    <Skeleton className="h-9 w-9 rounded-md" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>Nie skonfigurowano jeszcze żadnych webhooków.</p>
          )}
        </CardContent>
      </Card>

      <Dialog
        open={isCreateModalOpen}
        onOpenChange={(open) => {
          setIsCreateModalOpen(open);
          if (!open) form.reset();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Dodaj nowy Webhook</DialogTitle>
            <DialogDescription>
              Wprowadź adres URL, na który będą wysyłane powiadomienia, oraz
              wybierz zdarzenia.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              id="create-webhook-form"
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-4 py-4"
            >
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Adres URL</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="https://twoja-domena.pl/webhook"
                        type="url"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="events"
                render={() => (
                  <FormItem>
                    <div className="mb-3">
                      <FormLabel className="text-base">Zdarzenia</FormLabel>
                    </div>
                    {AVAILABLE_EVENTS.map((event) => (
                      <FormField
                        key={event.id}
                        control={form.control}
                        name="events"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={event.id}
                              className="flex flex-row items-start space-y-0 space-x-3"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(event.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([
                                          ...field.value,
                                          event.id,
                                        ])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== event.id,
                                          ),
                                        );
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="cursor-pointer font-normal">
                                {event.label}
                              </FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Anuluj
            </Button>
            <Button
              type="submit"
              form="create-webhook-form"
              disabled={isCreating}
            >
              {isCreating ? "Zapisywanie..." : "Zapisz"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog
        open={!!selectedWebhook}
        onOpenChange={(open) => {
          if (!open) setSelectedWebhook(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Szczegóły Webhooka</DialogTitle>
          </DialogHeader>
          {selectedWebhook && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Adres URL</Label>
                <div className="bg-muted rounded-md border p-3 font-mono text-sm break-all">
                  {selectedWebhook.url}
                </div>
              </div>
              <div className="mt-2 grid gap-2">
                <Label>Sekret (HMAC SHA256)</Label>
                <p className="text-muted-foreground mb-1 text-xs">
                  Użyj tego sekretu do weryfikacji podpisu w nagłówku{" "}
                  <code>X-Eproba-Signature</code>.
                </p>
                <div className="bg-muted rounded-md border p-3 font-mono text-sm break-all">
                  {selectedWebhook.secret}
                </div>
              </div>
              <div className="mt-2 grid gap-2">
                <Label>Zdarzenia</Label>
                <ul className="mt-1 list-inside list-disc text-sm">
                  {selectedWebhook.events.map((event) => (
                    <li key={event}>{event}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setSelectedWebhook(null)}>Zamknij</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

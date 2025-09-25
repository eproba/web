"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApi } from "@/lib/api-client";
import { ToastMsg } from "@/lib/toast-msg";
import { cn } from "@/lib/utils";
import { useCurrentUser } from "@/state/user";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import packageInfo from "../../../package.json";

type FormData = {
  subject: string;
  from_email: string;
  message: string;
};

export default function ContactForm({
  type = "general",
  onSuccess,
}: {
  type?: "bug" | "general";
  onSuccess?: () => void;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { apiClient } = useApi();
  const currentUser = useCurrentUser();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<FormData>({
    defaultValues: { subject: "", from_email: currentUser?.email, message: "" },
  });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);

    try {
      let additionalInfo = "";
      if (type === "bug") {
        additionalInfo = `

-----
Informacje dodatkowe:
Użytkownik: ${currentUser?.id || "Niezalogowany"}
Przeglądarka: ${navigator.userAgent}
URL strony: ${window.location.href}
Wersja aplikacji: ${packageInfo.version}
        `;
      }
      await apiClient(`/contact/`, {
        method: "POST",
        body: JSON.stringify({
          subject: data.subject,
          from_email: data.from_email,
          message: data.message + additionalInfo,
          type,
        }),
      });
      if (type === "bug") {
        toast.success(
          "Dziękujemy za zgłoszenie błędu! Twoja wiadomość została wysłana pomyślnie. Odpowiemy na nią tak szybko, jak to możliwe.",
        );
        onSuccess?.();
      } else {
        toast.success(
          "Wiadomość została wysłana pomyślnie! Odpowiemy na nią tak szybko, jak to możliwe.",
        );
      }
      resetForm();
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się wysłać wiadomości",
            description: error as Error,
          },
        }),
      );
      console.error("Error sending email:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-4 space-y-4"
      noValidate
    >
      <div>
        <Label htmlFor="subject" className="mb-1 block font-medium">
          Temat
        </Label>
        <Input
          id="subject"
          {...register("subject", { required: "Temat jest wymagany" })}
          type="text"
        />
        {errors.subject && (
          <p className="mt-1 text-sm text-red-500">{errors.subject.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="from_email" className="mb-1 block font-medium">
          Email
        </Label>
        <Input
          id="from_email"
          {...register("from_email", {
            required: "Email jest wymagany",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Nieprawidłowy format adresu email",
            },
          })}
          type="email"
        />
        {errors.from_email && (
          <p className="mt-1 text-sm text-red-500">
            {errors.from_email.message}
          </p>
        )}
      </div>

      <div>
        <Label htmlFor="message" className="mb-1 block font-medium">
          {type === "bug" ? "Opis" : "Wiadomość"}
        </Label>
        <Textarea
          id="message"
          {...register("message", {
            required: "Wiadomość jest wymagana",
          })}
          rows={5}
        ></Textarea>
        {errors.message && (
          <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
        )}
      </div>
      {type === "bug" && (
        <p className="text-muted-foreground text-xs">
          Do zgłoszenia błędu zostaną dołączone informacje diagnostyczne.
        </p>
      )}
      <div className={cn(type === "bug" ? "flex justify-end" : "")}>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Wysyłanie..." : "Wyślij"}
        </Button>
      </div>
    </form>
  );
}

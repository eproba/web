"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useApi } from "@/lib/api-client";
import { ToastMsg } from "@/lib/toast-msg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

type FormData = {
  subject: string;
  from_email: string;
  message: string;
};

export default function ContactForm({
  initialEmail,
}: {
  initialEmail?: string;
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { apiClient } = useApi();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset: resetForm,
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);

    try {
      await apiClient(`/contact/`, {
        method: "POST",
        body: JSON.stringify({
          subject: data.subject,
          from_email: data.from_email,
          message: data.message,
        }),
      });
      toast.success(
        "Wiadomość została wysłana pomyślnie! Odpowiemy na nią tak szybko, jak to możliwe.",
      );
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
    <Card>
      <CardContent>
        <h1 className="text-2xl font-bold">Formularz kontaktowy</h1>
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
              <p className="mt-1 text-sm text-red-500">
                {errors.subject.message}
              </p>
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
              defaultValue={initialEmail}
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
              Wiadomość
            </Label>
            <Textarea
              id="message"
              {...register("message", {
                required: "Wiadomość jest wymagana",
              })}
              rows={5}
            ></Textarea>
            {errors.message && (
              <p className="mt-1 text-sm text-red-500">
                {errors.message.message}
              </p>
            )}
          </div>

          <div>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Wysyłanie..." : "Wyślij"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

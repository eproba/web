"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { sendEmail } from "@/app/contact/actions";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { Card, CardContent } from "@/components/ui/card";

type FormData = {
  subject: string;
  from_email: string;
  message: string;
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);

    try {
      const result = await sendEmail({
        subject: data.subject,
        fromEmail: data.from_email,
        message: data.message,
      });
      if (result.success) {
        router.push("/?message=Wiadomość została wysłana.");
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast.error(
        "Wystąpił błąd podczas wysyłania wiadomości. Spróbuj ponownie później.",
      );
      console.error("Error sending email:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className=" space-y-6">
      <Card>
        <CardContent>
          <h1 className="text-2xl font-bold">Formularz kontaktowy</h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-4 space-y-4"
            noValidate
          >
            <div>
              <label htmlFor="subject" className="block font-medium mb-1">
                Temat
              </label>
              <Input
                id="subject"
                {...register("subject", { required: "Temat jest wymagany" })}
                type="text"
              />
              {errors.subject && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.subject.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="from_email" className="block font-medium mb-1">
                Email
              </label>
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
                <p className="text-red-500 text-sm mt-1">
                  {errors.from_email.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="message" className="block font-medium mb-1">
                Wiadomość
              </label>
              <Textarea
                id="message"
                {...register("message", {
                  required: "Wiadomość jest wymagana",
                })}
                rows={5}
              ></Textarea>
              {errors.message && (
                <p className="text-red-500 text-sm mt-1">
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

      <Card>
        <CardContent>
          <h1 className="text-2xl font-bold">Informacje kontaktowe</h1>
          <p className="mt-2">
            Jeśli chcesz, możesz również napisać bezpośrednio na adres:{" "}
            <a
              href="mailto:eproba@zhr.pl"
              target="_blank"
              className="text-[#1abc9c] hover:underline"
            >
              eproba@zhr.pl
            </a>
            .
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

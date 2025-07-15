"use client";

import { Button } from "@/components/ui/button";
import { useApi } from "@/lib/api-client";
import { ToastMsg } from "@/lib/toast-msg";
import { useState } from "react";
import { toast } from "react-toastify";

export function ResendVerificationEmailButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { apiClient } = useApi();

  const handleResendVerification = async () => {
    setIsLoading(true);
    try {
      await apiClient("/user/verify-email/resend/", {
        method: "POST",
      });

      toast.success(
        ToastMsg({
          data: {
            title: "Email weryfikacyjny został wysłany",
            description: "Sprawdź swoją skrzynkę.",
          },
        }),
      );
    } catch (error) {
      toast.error(
        ToastMsg({
          data: {
            title: "Nie udało się wysłać emaila weryfikacyjnego",
            description: error as Error,
          },
        }),
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleResendVerification}
      disabled={isLoading}
    >
      {isLoading ? "Wysyłanie..." : "Wyślij ponownie"}
    </Button>
  );
}

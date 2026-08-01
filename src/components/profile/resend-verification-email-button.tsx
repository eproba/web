"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { useApi } from "@/lib/api-client";
import { ToastMsg } from "@/lib/toast-msg";
import { useState } from "react";

export function ResendVerificationEmailButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { apiClient } = useApi();

  const handleResendVerification = async () => {
    setIsLoading(true);
    try {
      await apiClient("/user/verify-email/resend/", {
        method: "POST",
      });

      toast.add({
        ...ToastMsg({
          data: {
            title: "Email weryfikacyjny został wysłany",
            description: "Sprawdź swoją skrzynkę.",
          },
        }),
        type: "success",
      });
    } catch (error) {
      toast.add({
        ...ToastMsg({
          data: {
            title: "Nie udało się wysłać emaila weryfikacyjnego",
            description: error as Error,
          },
        }),
        type: "error",
      });
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

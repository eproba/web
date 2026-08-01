"use client";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/toast";
import { LogInIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import { useState } from "react";

interface LoginButtonProps {
  redirectTo?: string;
  className?: string;
  children?: React.ReactNode;
}

export function LoginButton({
  redirectTo,
  className,
  children,
}: LoginButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      await signIn("eproba", {
        redirectTo: redirectTo || "/",
      });
    } catch (error) {
      console.error("Login error:", error);
      toast.add({ title: "Wystąpił błąd podczas logowania", type: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleLogin}
      className={className}
      disabled={isLoading}
      type="button"
    >
      <LogInIcon />
      {children || "Zaloguj się"}
    </Button>
  );
}

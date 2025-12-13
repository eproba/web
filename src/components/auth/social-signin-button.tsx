"use client";

import { authClient } from "@/lib/auth-client";
import { Slot } from "@radix-ui/react-slot";
import { useState } from "react";
import { Button } from "../ui/button";

interface SocialSignInButtonProps {
  provider: "eproba";
  redirectTo?: string;
  children: React.ReactNode;
  className?: string;
}

export function SocialSignInButton({
  provider,
  redirectTo = "/",
    className,
  children,
}: SocialSignInButtonProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    try {
      await authClient.signIn.social({
        provider,
        callbackURL: redirectTo,
      });
    } catch (error) {
      console.error("Sign in error:", error);
      setIsLoading(false);
    }
  };

  return (
    <Button onClick={handleSignIn} disabled={isLoading} className={className}>
      {children}
    </Button>
  );
}

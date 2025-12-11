import { auth } from "@/auth";
import { LoginRequired } from "@/components/login-required";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorPageParam, SignInPageErrorParam } from "@auth/core/types";
import { FootprintsIcon } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Wymagane logowanie",
};

interface LoginRequiredPageProps {
  searchParams: Promise<{
    redirectTo?: string;
    error?: ErrorPageParam | SignInPageErrorParam;
    openSelectPatrolDialog?: boolean;
  }>;
}

export default async function LoginRequiredPage({
  searchParams,
}: LoginRequiredPageProps) {
  return (
    <div className="flex min-h-96 flex-col items-center justify-center">
      <Suspense fallback={<LoginRequired />}>
        <LoginRequiredContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function LoginRequiredContent({ searchParams }: LoginRequiredPageProps) {
  const { redirectTo, openSelectPatrolDialog, error } = await searchParams;
  const session = await auth();

  const redirectUrl = openSelectPatrolDialog
    ? `${redirectTo || "/"}${redirectTo?.includes("?") ? "&" : "?"}openSelectPatrolDialog=true`
    : redirectTo || "/";

  if (session?.user) {
    return (
      <div className="flex min-h-96 flex-col items-center justify-center">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Zalogowano pomyślnie
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-center">
            <p className="text-muted-foreground">
              Jeśli przekierowanie nie nastąpi automatycznie, kliknij przycisk
              poniżej.
            </p>
            <a href={redirectUrl}>
              <Button className="w-full">
                <FootprintsIcon />
                Kontynuuj
              </Button>
            </a>
          </CardContent>
        </Card>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.location.href = "${redirectUrl}";`,
          }}
        />
      </div>
    );
  }

  return <LoginRequired redirectTo={redirectTo} error={error} />;
}

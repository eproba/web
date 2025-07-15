import { signIn } from "@/auth";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ErrorPageParam, SignInPageErrorParam } from "@auth/core/types";
import { AlertCircleIcon, LogInIcon } from "lucide-react";

interface LoginRequiredProps {
  redirectTo?: string;
  error?: ErrorPageParam | SignInPageErrorParam;
}

const errorMessages: Record<string, { title: string; description: string }> = {
  Configuration: {
    title: "Błąd konfiguracji",
    description:
      "Wystąpił błąd konfiguracji. Skontaktuj się z administratorem.",
  },
  AccessDenied: {
    title: "Dostęp zabroniony",
    description: "Nie masz uprawnień do tej strony.",
  },
  Verification: {
    title: "Weryfikacja wymagana",
    description: "Musisz zweryfikować swoje konto, aby uzyskać dostęp.",
  },
  Signin: {
    title: "Błąd logowania",
    description: "Wystąpił błąd podczas logowania. Spróbuj ponownie.",
  },
  OAuthSignin: {
    title: "Błąd logowania OAuth",
    description:
      "Wystąpił błąd podczas logowania przez OAuth. Spróbuj ponownie.",
  },
  OAuthCallbackError: {
    title: "Błąd odpowiedzi OAuth",
    description:
      "Wystąpił błąd podczas przetwarzania odpowiedzi OAuth. Upewnij się że zezwoliłeś na dostęp do swojego konta i spróbuj ponownie.",
  },
  OAuthCreateAccount: {
    title: "Błąd tworzenia konta OAuth",
    description:
      "Wystąpił błąd podczas tworzenia konta przy użyciu OAuth. Spróbuj ponownie.",
  },
  EmailCreateAccount: {
    title: "Błąd tworzenia konta e-mail",
    description:
      "Wystąpił błąd podczas tworzenia konta przy użyciu e-maila. Spróbuj ponownie.",
  },
  Callback: {
    title: "Błąd odpowiedzi",
    description:
      "Wystąpił błąd podczas przetwarzania odpowiedzi. Spróbuj ponownie.",
  },
  OAuthAccountNotLinked: {
    title: "Konto OAuth nie jest połączone",
    description:
      "Twoje konto OAuth nie jest połączone z żadnym istniejącym kontem. Skontaktuj się z administratorem.",
  },
  EmailSignin: {
    title: "Błąd logowania e-mail",
    description:
      "Wystąpił błąd podczas logowania przy użyciu e-maila. Sprawdź swoje dane i spróbuj ponownie.",
  },
  CredentialsSignin: {
    title: "Błąd logowania poświadczeniami",
    description:
      "Wystąpił błąd podczas logowania przy użyciu poświadczeń. Sprawdź swoje dane i spróbuj ponownie.",
  },
  SessionRequired: {
    title: "Wymagana sesja",
    description: "Musisz być zalogowany, aby uzyskać dostęp do tej strony.",
  },
};

export function LoginRequired({ redirectTo, error }: LoginRequiredProps) {
  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Wymagane logowanie</CardTitle>
        {error && (
          <Alert variant="destructive" className="text-left">
            <AlertCircleIcon className="size-4" />
            <AlertTitle>
              {errorMessages[error]?.title || "Nieznany błąd"}
            </AlertTitle>
            <AlertDescription>
              {errorMessages[error]?.description ||
                "Wystąpił nieznany błąd. Spróbuj ponownie."}
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent className="space-y-4 text-center">
        <p className="text-muted-foreground">
          Aby uzyskać dostęp do tej strony, musisz się zalogować.
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("eproba", {
              redirectTo: redirectTo || "/",
            });
          }}
        >
          <Button className="w-full">
            <LogInIcon />
            Zaloguj się
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

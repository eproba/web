import { ResendVerificationEmailButton } from "@/components/profile/resend-verification-email-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { SocialSignInButton } from "@/components/auth/social-signin-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchCurrentUser, fetchUser, verifyEmail } from "@/lib/server-api";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Weryfikacja adresu e-mail",
};

interface PageProps {
  params: Promise<{
    user_id: string;
    token: string;
  }>;
}

export default async function VerifyEmailPage({ params }: PageProps) {
  const { user_id: userId, token } = await params;

  // Validate parameters first
  if (!userId || !token) {
    return (
      <EmailVerificationError
        error="Nieprawidłowe dane weryfikacji. Upewnij się, że link jest poprawny i spróbuj ponownie."
        showResendButton={false}
        isAuthenticated={false}
      />
    );
  }

  const { user: currentUser } = await fetchCurrentUser();
  const { user } = await fetchUser(userId);

  const isCurrentUser = currentUser?.id === user?.id;

  // Check if already verified
  if (isCurrentUser && currentUser?.emailVerified) {
    return (
      <EmailVerificationSuccess
        message="Twój adres e-mail jest już zweryfikowany."
        showLoginButton={false}
        alreadyVerified={true}
      />
    );
  }

  try {
    const result = await verifyEmail(userId, token);

    if (result.error) {
      return (
        <EmailVerificationError
          error="Nie udało się zweryfikować adresu e-mail. Sprawdź, czy link jest poprawny i spróbuj ponownie."
          showResendButton={!!currentUser}
          isAuthenticated={!!currentUser}
          email={currentUser?.email}
        />
      );
    }

    // Success - determine message and login button visibility
    let message = "Twój adres e-mail został pomyślnie zweryfikowany.";
    let showLoginButton = !currentUser;

    if (currentUser && !isCurrentUser) {
      message =
        "Adres e-mail został pomyślnie zweryfikowany, ale nie jest to Twój adres e-mail.";
      showLoginButton = true;
    }

    return (
      <EmailVerificationSuccess
        message={message}
        showLoginButton={showLoginButton}
        alreadyVerified={false}
      />
    );
  } catch (error) {
    console.error("Email verification error:", error);
    return (
      <EmailVerificationError
        error="Wystąpił błąd podczas weryfikacji adresu e-mail. Spróbuj ponownie później."
        showResendButton={!!currentUser}
        isAuthenticated={!!currentUser}
        email={currentUser?.email}
      />
    );
  }
}

function EmailVerificationError({
  error,
  showResendButton,
  isAuthenticated,
  email,
}: {
  error: string;
  showResendButton: boolean;
  isAuthenticated: boolean;
  email?: string;
}) {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">
            Nie udało się zweryfikować adresu e-mail
          </CardTitle>
          {email && (
            <CardDescription className="text-sm text-gray-500">
              Twój e-mail: <strong>{email}</strong>
            </CardDescription>
          )}
          <CardDescription>
            Wystąpił błąd podczas próby weryfikacji Twojego adresu e-mail.
            Sprawdź poniższe informacje i spróbuj ponownie.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="destructive">
            <XCircleIcon className="size-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="flex flex-col space-y-2">
            <Link href="/">
              <Button variant="outline" className="w-full">
                Wróć do strony głównej
              </Button>
            </Link>
            {!isAuthenticated && (
              <SocialSignInButton
                provider="eproba"
                redirectTo="/"
              >
                <Button className="w-full">
                  Zaloguj się aby wysyłać ponownie
                </Button>
              </SocialSignInButton>
            )}
            {showResendButton && <ResendVerificationEmailButton />}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function EmailVerificationSuccess({
  message,
  showLoginButton,
  alreadyVerified,
}: {
  message: string;
  showLoginButton: boolean;
  alreadyVerified: boolean;
}) {
  return (
    <div className="flex items-center justify-center">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Email zweryfikowany</CardTitle>
          <CardDescription>
            {alreadyVerified
              ? "Twój adres e-mail jest już zweryfikowany."
              : "Twój adres e-mail został pomyślnie zweryfikowany."}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert variant="default" className="border-green-200 bg-green-50">
            <CheckCircleIcon className="size-4 text-green-600" />
            <AlertDescription className="text-green-800">
              {message}
            </AlertDescription>
          </Alert>
          <div className="flex flex-col space-y-2">
            <Link href="/">
              <Button variant="outline" className="w-full">
                Wróć do strony głównej
              </Button>
            </Link>
            {showLoginButton && (
              <SocialSignInButton
                provider="eproba"
                redirectTo="/"
              >
                <Button className="w-full">Zaloguj się</Button>
              </SocialSignInButton>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

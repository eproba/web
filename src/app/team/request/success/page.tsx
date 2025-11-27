import { ResendVerificationEmailButton } from "@/components/profile/resend-verification-email-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchCurrentUser } from "@/lib/server-api";
import { AlertTriangle, CheckCircle2, Home, Mail } from "lucide-react";
import Link from "next/link";

export default async function TeamRequestSuccessPage() {
  const { user: currentUser } = await fetchCurrentUser();

  return (
    <div className="container mx-auto flex min-h-[60vh] max-w-2xl items-center justify-center px-4 py-12">
      <Card className="w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20">
            <CheckCircle2 className="size-10 text-green-600 dark:text-green-500" />
          </div>
          <CardTitle className="text-2xl font-semibold">
            Zgłoszenie zostało wysłane!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 text-center">
          <div className="space-y-4">
            <p className="text-muted-foreground">
              Twoje zgłoszenie drużyny zostało pomyślnie przesłane i oczekuje na
              weryfikację przez administratora.
            </p>

            {currentUser &&
              !currentUser.emailVerified &&
              !currentUser.email.endsWith("@eproba.zhr.pl") && (
                <Alert className="border-yellow-500/40 bg-yellow-500/10 text-left">
                  <AlertTriangle className="size-4 text-yellow-600 dark:text-yellow-500" />
                  <AlertDescription className="text-yellow-800 dark:text-yellow-200">
                    <p className="mb-2 font-medium">
                      Zweryfikuj swój adres e-mail
                    </p>
                    <p className="mb-3 text-sm">
                      Twój adres e-mail nie jest jeszcze zweryfikowany.
                      Weryfikacja adresu e-mail przyspieszy proces rozpatrzenia
                      zgłoszenia. Link weryfikacyjny został wysłany na twój
                      e-mail.
                    </p>
                    <ResendVerificationEmailButton />
                  </AlertDescription>
                </Alert>
              )}

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-start gap-3 text-left">
                <Mail className="text-muted-foreground mt-0.5 size-5 shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Powiadomienie e-mail</p>
                  <p className="text-muted-foreground text-sm">
                    Otrzymasz wiadomość e-mail z potwierdzeniem decyzji
                    administratora. Proces weryfikacji może potrwać do kilku dni
                    roboczych.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground text-sm">
              W międzyczasie możesz korzystać z pozostałych funkcji aplikacji,
              inne osoby będą mogły dołączyć się do Twojej drużyny po jej
              zatwierdzeniu.
            </p>
          </div>

          <div className="pt-4">
            <Button asChild size="lg" className="min-w-40">
              <Link href="/">
                <Home className="mr-2 size-4" />
                Przejdź do strony głównej
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

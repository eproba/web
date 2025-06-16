import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LogInIcon } from "lucide-react";
import { signIn } from "@/auth";

interface LoginRequiredProps {
  returnUrl?: string;
}

export function LoginRequired({ returnUrl }: LoginRequiredProps) {
  return (
    <Card className="w-full max-w-md shadow-xl">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">Wymagane logowanie</CardTitle>
      </CardHeader>
      <CardContent className="text-center space-y-4">
        <p className="text-muted-foreground">
          Aby uzyskać dostęp do tej strony, musisz się zalogować.
        </p>
        <form
          action={async () => {
            "use server";
            await signIn("eproba", {
              redirectTo: returnUrl || "/",
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

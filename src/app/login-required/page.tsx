import { auth } from "@/auth";
import { LoginRequired } from "@/components/login-required";
import { Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FootprintsIcon } from "lucide-react";
import Link from "next/link";

interface LoginRequiredPageProps {
  searchParams: Promise<{ returnUrl?: string }>;
}

export default async function LoginRequiredPage({
  searchParams,
}: LoginRequiredPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-96">
      <Suspense fallback={<LoginRequired />}>
        <LoginRequiredContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function LoginRequiredContent({ searchParams }: LoginRequiredPageProps) {
  const { returnUrl } = await searchParams;
  const session = await auth();

  if (session?.user) {
    const redirectUrl = returnUrl || "/";
    return (
      <div className="flex flex-col items-center justify-center min-h-96">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">
              Zalogowano pomyślnie
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-muted-foreground">
              Jeśli przekierowanie nie nastąpi automatycznie, kliknij przycisk
              poniżej.
            </p>
            <Link href={redirectUrl}>
              <Button className="w-full">
                <FootprintsIcon />
                Kontynuuj
              </Button>
            </Link>
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

  return <LoginRequired returnUrl={returnUrl} />;
}

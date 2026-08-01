import { ResendVerificationEmailButton } from "@/components/profile/resend-verification-email-button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import { UserHydrator } from "@/components/user-hydrator";
import { fetchCurrentUser, fetchLatestTeamRequest } from "@/lib/server-api";
import { TeamRequestApprovalOutcome } from "@/types/team-request";
import { ArrowRight, Clock3, MailCheck, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";

const outcomeContent = {
  auto_approved: {
    eyebrow: "Drużyna utworzona",
    title: "Możesz już zacząć",
    description:
      "Twój adres ZHR pozwolił nam zatwierdzić zgłoszenie bez dodatkowego sprawdzania.",
    detail:
      "Drużyna jest aktywna. Możesz przejść do jej ustawień i dodać członków.",
    icon: ShieldCheck,
    statusStyle: "text-emerald-700 dark:text-emerald-400",
    href: "/team",
    action: "Przejdź do drużyny",
  },
  can_auto_approve: {
    eyebrow: "Wymagane potwierdzenie",
    title: "Sprawdź swoją pocztę",
    description:
      "Kliknij link wysłany na Twój adres ZHR. Po potwierdzeniu drużyna zostanie utworzona automatycznie.",
    detail: "Nie musisz czekać na decyzję administratora.",
    icon: MailCheck,
    statusStyle: "text-amber-700 dark:text-amber-400",
    href: "/",
    action: "Wróć na stronę główną",
  },
  awaiting_review: {
    eyebrow: "Zgłoszenie wysłane",
    title: "Zgłoszenie czeka na sprawdzenie",
    description:
      "Powiadomimy Cię e-mailem, jak tylko sweryfikujemy twoją drużynę.",
    detail: "W tym czasie możesz nadal korzystać z Epróby.",
    icon: Clock3,
    statusStyle: "text-blue-700 dark:text-blue-400",
    href: "/",
    action: "Wróć na stronę główną",
  },
} satisfies Record<
  TeamRequestApprovalOutcome,
  {
    eyebrow: string;
    title: string;
    description: string;
    detail: string;
    icon: LucideIcon;
    statusStyle: string;
    href: string;
    action: string;
  }
>;

export default async function TeamRequestSuccessPage() {
  const [{ user: currentUser }, { data: teamRequest }] = await Promise.all([
    fetchCurrentUser(),
    fetchLatestTeamRequest(),
  ]);
  const outcome = teamRequest?.approvalOutcome ?? "awaiting_review";
  const content = outcomeContent[outcome];
  const Icon = content.icon;

  return (
    <main className="container mx-auto max-w-2xl px-6 py-16 sm:py-24">
      <UserHydrator user={currentUser} />

      <section aria-labelledby="request-status-title" className="max-w-xl">
        <div
          className={`flex items-center gap-2 text-sm font-medium ${content.statusStyle}`}
        >
          <Icon className="size-4" aria-hidden="true" />
          <span>{content.eyebrow}</span>
        </div>

        <h1
          id="request-status-title"
          className="mt-4 text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
        >
          {content.title}
        </h1>

        {teamRequest?.team.name && (
          <p className="text-muted-foreground mt-3 text-base">
            {teamRequest.team.name}
          </p>
        )}

        <div className="mt-8 space-y-3 border-l-2 pl-5">
          <p className="max-w-lg leading-7">{content.description}</p>
          <p className="text-muted-foreground max-w-lg text-sm leading-6">
            {content.detail}
          </p>
        </div>

        {outcome === "can_auto_approve" &&
          currentUser &&
          !currentUser.emailVerified && (
            <Alert className="mt-6 text-left">
              <MailCheck className="size-4" />
              <AlertDescription className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-sm">Nie masz wiadomości z linkiem?</span>
                <ResendVerificationEmailButton />
              </AlertDescription>
            </Alert>
          )}

        <Link
          href={content.href}
          className={`${buttonVariants({ variant: "outline" })} mt-8`}
        >
          {content.action}
          <ArrowRight className="size-4" />
        </Link>
      </section>
    </main>
  );
}

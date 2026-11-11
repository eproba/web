import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageView } from "@/components/vademecum/page-view";
import { farewell, imprint } from "@/lib/vademecum/content/welcome";
import { PDF_URL, START_PAGE } from "@/lib/vademecum/navigation";
import { DownloadIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Vademecum",
  description: START_PAGE.description,
};

function Hero() {
  return (
    <header className="flex flex-col items-center gap-5 text-center sm:flex-row sm:text-left">
      <Image
        src="/vademecum/campfire.webp"
        alt="Znak Watry Wędrowniczej"
        width={224}
        height={224}
        priority
        className="size-28 rounded-xl"
      />
      <div className="space-y-3">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Vademecum
          </h1>
          <p className="text-muted-foreground">
            Próby indywidualne na stopnie harcerza orlego i harcerza
            Rzeczypospolitej
          </p>
        </div>
        <a
          href={PDF_URL}
          target="_blank"
          rel="noopener"
          className={buttonVariants({ variant: "outline" })}
        >
          <DownloadIcon />
          Pobierz Vademecum (PDF)
        </a>
      </div>
    </header>
  );
}

function AboutEdition() {
  return (
    <Card>
      <CardContent>
        <Accordion multiple defaultValue={["farewell"]}>
          <AccordionItem value="farewell">
            <AccordionTrigger className="text-base">
              {farewell.title}
            </AccordionTrigger>
            <AccordionContent className="space-y-3 text-[0.938rem] leading-relaxed">
              {farewell.quote.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="imprint">
            <AccordionTrigger className="text-base">
              O wydaniu drukowanym
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground grid gap-6 sm:grid-cols-2">
              <div className="space-y-1">
                <p className="text-foreground font-medium">{imprint.edition}</p>
                {imprint.details.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
              <div className="space-y-1">
                <p className="text-foreground font-medium">Zespół redakcyjny</p>
                <ul className="space-y-1">
                  {imprint.team.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
}

export default function VademecumStartPage() {
  return (
    <PageView page={START_PAGE} header={<Hero />}>
      <AboutEdition />
    </PageView>
  );
}

import { cn } from "@/lib/utils";
import Image from "next/image";

/** A figure from the printed edition, exported from the PDF as vector art. */
function PrintFigure({
  src,
  width,
  height,
  alt,
  className,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  className?: string;
}) {
  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt={alt}
      unoptimized
      className={cn(
        "mx-auto h-auto w-full dark:mix-blend-screen dark:invert",
        className,
      )}
    />
  );
}

/** The rover campfire (Watra Wędrownicza) with its parts labelled (print p. 9). */
export function CampfireFigure() {
  return (
    <figure className="space-y-4 rounded-lg border p-4 sm:p-6">
      <figcaption className="text-center">
        <strong>WATRA</strong> to znak życia harcerskiego na wędrówce i w
        codzienności. Ułożona jest w gwiazdę sposobem skautowym na długotrwałe
        palenie.
      </figcaption>
      <PrintFigure
        src="/vademecum/campfire-diagram.svg"
        width={248}
        height={304}
        className="max-w-sm"
        alt="Znak Watry: trzy płomienie to siła ciała, siła umysłu i siła ducha; trzy polana to praca nad sobą, szukanie miejsca w społeczeństwie i służba; łączący je żar to wyczyn."
      />
    </figure>
  );
}

function Hint({
  lead,
  text,
  className,
}: {
  lead: string;
  text: string;
  className?: string;
}) {
  return (
    <p className={cn("text-sm", className)}>
      <strong className="font-semibold">{lead}</strong>{" "}
      <span className="text-muted-foreground">{text}</span>
    </p>
  );
}

/** Campfire drawing with four hints for choosing areas of life (print p. 39). */
export function AreaHintsFigure() {
  const hints = {
    center: {
      lead: "ogień na środku pozwala szybciej rozpalić całość –",
      text: "niektóre obszary są ważniejsze",
    },
    strengths: {
      lead: "wzmacniaj ogień, który już płonie –",
      text: "rozwijaj swoje mocne strony",
    },
    whole: {
      lead: "celem jest rozpalenie całego polana –",
      text: "rozwój we wszystkich obszarach",
    },
    deficits: {
      lead: "osuszaj zawilgocone obszary –",
      text: "zmniejszaj swoje deficyty",
    },
  };

  return (
    <figure className="grid items-center gap-x-6 gap-y-4 rounded-lg border p-4 sm:grid-cols-[1fr_auto_1fr] sm:p-6">
      <div className="hidden h-full flex-col justify-between gap-8 sm:flex">
        <Hint {...hints.center} className="text-right" />
        <Hint {...hints.whole} className="text-right" />
      </div>
      <Image
        src="/vademecum/area-campfire.png"
        alt="Ognisko z dwóch polan i płomienia"
        width={761}
        height={926}
        className="mx-auto h-auto w-32 sm:w-40 dark:invert"
      />
      <div className="hidden h-full flex-col justify-between gap-8 sm:flex">
        <Hint {...hints.strengths} />
        <Hint {...hints.deficits} />
      </div>
      <div className="grid gap-3 sm:hidden">
        {Object.values(hints).map((hint) => (
          <Hint key={hint.lead} {...hint} />
        ))}
      </div>
    </figure>
  );
}

/** Funnel from the rank profile down to a task (print p. 35). */
export function TaskFunnelFigure() {
  return (
    <figure className="rounded-lg border p-4 sm:p-6">
      <PrintFigure
        src="/vademecum/task-funnel.svg"
        width={250}
        height={183}
        className="max-w-md"
        alt="Lejek: 1. sylwetka, 2. obszar życia, 3. postawa, 4. drogowskaz, 5. zadanie."
      />
    </figure>
  );
}

/** Timeline of the individual trial (print p. 29). */
export function TrialRhythmFigure() {
  return (
    <figure className="rounded-lg border p-4 sm:p-6">
      <PrintFigure
        src="/vademecum/trial-rhythm.svg"
        width={268}
        height={235}
        className="max-w-md"
        alt="Rytm próby: spotkanie 1 (autorefleksja), po tygodniu spotkanie 2 (propozycje zadań), po około 3 tygodniach okresu przygotowawczego decyzja (wybór zadań), szybko potem otwarcie próby, w trakcie próby spotkania z opiekunem, na koniec zamknięcie próby."
      />
    </figure>
  );
}

import { BadgePopover } from "@/components/badge-popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { capitalizeFirstLetter } from "@/lib/utils";
import {
  AwardIcon,
  BookOpenIcon,
  BrainIcon,
  CheckCircleIcon,
  DownloadIcon,
  GlobeIcon,
  HandIcon,
  HeartIcon,
  HomeIcon,
  LeafIcon,
  PaletteIcon,
  ShieldIcon,
  StarIcon,
  TargetIcon,
  UsersIcon,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Regulamin stopni harcerzy",
  description:
    "Regulamin stopni harcerzy w ZHR. Przegląd sylwetek, wymagań i procesu zdobywania stopni.",
};

export interface BadgeData {
  id: string;
  name: string;
  stars: number;
  requirements: string[];
  rawBasedOn: string[][];
  basedOn: string[];
}

interface BadgeSpec {
  name: string;
  comment: string;
  keywords: string[];
  badges: BadgeData[];
  badgeIcons: Record<string, string>;
}

interface BadgeCategory {
  id: string;
  ordinal: number;
  category: number;
  spec: BadgeSpec;
}

interface BadgeApiResponse {
  badges: BadgeCategory[];
  categories: {
    id: number;
    name: string;
    ordinal: number;
  }[];
}

export default async function MaleRegulationsPage() {
  // const { templates, error: templatesError } = await fetchTemplates();
  // if (templatesError) {
  //   return templatesError;
  // }
  //
  // const organizationTemplates = templates!.filter(
  //   (worksheet) => worksheet.organization !== null,
  // );

  const badgesResponse = await fetch("https://stamps.zhr.pl/api/badges");

  let allBadges: BadgeData[] = [];
  const badgeMap = new Map<string, BadgeData>();
  let badgeIcons: Record<string, string> = {};

  if (badgesResponse.ok) {
    try {
      const badgesData: BadgeApiResponse = await badgesResponse.json();

      // Extract all badges from the API response
      allBadges = badgesData.badges.flatMap((category) => category.spec.badges);

      // Create a map of badge IDs to badge data for easy lookup
      allBadges.forEach((badge) => {
        badgeMap.set(badge.id, badge);
      });

      // Get badge icons
      badgeIcons = badgesData.badges.reduce(
        (acc, category) => {
          return { ...acc, ...category.spec.badgeIcons };
        },
        {} as Record<string, string>,
      );
    } catch (error) {
      console.warn("Failed to parse badges data:", error);
    }
  } else {
    console.warn("Failed to fetch badges data. Status:", badgesResponse.status);
  }

  const ranks = [
    {
      name: "młodzik",
      shortName: "mł.",
      age: "11-13 lat",
      badge: "Krzyż harcerski",
      description:
        "Młodzik wie, co to znaczy być harcerzem, i chce nim zostać. Potrafi zadbać o siebie. Jest dzielny. Pomaga innym, szczególnie słabszym. Jest dobrym kolegą, synem i uczniem. Odróżnia dobro od zła i stara się być lepszy, niż jest.",
      requirements: [
        "Ma wiedzę potrzebną do harcerskich działań:",
        "• Zna Prawo i Przyrzeczenie Harcerskie",
        "• Wie, kim byli Robert Baden-Powell i Andrzej Małkowski",
        "• Potrafi zaśpiewać Hymn Harcerski, Modlitwę Harcerską i pieśni obrzędowe śpiewane w drużynie",
        "• Rozpoznaje oznaczenia stopni harcerskich i instruktorskich",
        "• Rozpoznaje oznaczenia funkcji w drużynie i hufcu (ew. szczepie)",
        "Zdobył wymagane sprawności",
        "Zdobył wybrane przez siebie sprawności dodatkowe o sumie czterech gwiazdek",
      ],
      badges: [
        {
          id: "b9a086d0-a63a-11e9-978c-e1f8b14ef979",
          name: "Płomień",
          stars: 1,
        },
        {
          id: "9299a8b0-a283-11e9-a233-a740fc6f829d",
          name: "Obserwator",
          stars: 1,
        },
        {
          id: "48cb9aa0-9e86-11e9-9580-59e2b0953aa1",
          name: "Higienista",
          stars: 1,
        },
        {
          id: "d5af56a0-0808-11ea-942d-ff5228a2c1bf",
          name: "Mistrz musztry",
          stars: 1,
        },
        {
          id: "db6e34d0-9788-11e9-8a39-0d34c0c1cd2b",
          name: "Łącznik",
          stars: 1,
        },
        {
          id: "88ba1d00-07f2-11ea-9ee4-79526a865591",
          name: "Biwakowicz",
          stars: 1,
        },
        {
          id: "626ad440-a281-11e9-a95a-458191ecc476",
          name: "Sobieradek obozowy",
          stars: 1,
        },
        {
          id: "57cd5080-f4fc-11e9-9431-9f06e19584fa",
          name: "Bystre oko",
          stars: 1,
        },
        {
          id: "fec806b0-a807-11e9-95ba-03b2681d012f",
          name: "Przyrodnik",
          stars: 1,
        },
        {
          id: "67aa8320-a63b-11e9-8fd6-93ee8be88c81",
          name: "Chatka Robinsona",
          stars: 1,
        },
        {
          id: "abb5ff40-fe79-11e9-a44d-295a22c78dab",
          name: "Kuchcik",
          stars: 1,
        },
        {
          id: "08156b20-02e1-11ea-9362-8f348ecb4b2c",
          name: "Rowerzysta",
          stars: 1,
        },
      ],
      individualTasksCount: "1-3",
      expectedTime: "do 2 miesięcy",
      icon: "/rank-regulations/male/icons/mlodzik.svg",
    },
    {
      name: "wywiadowca",
      shortName: "wyw.",
      age: "12-14 lat",
      badge: "srebrna lilijka na Krzyżu",
      description:
        "Wywiadowca zasługuje na miano harcerskiego wygi. Doskonali się w technikach harcerskich. Potrafi zadbać o siebie, a także pomaga młodszym w przeżywaniu harcerskiej przygody, nawet podczas złej pogody. Można mu powierzyć samodzielne obowiązki w drużynie. Harcerzem jest nie tylko wtedy, kiedy ma na sobie mundur. Wypełnia powinności, jakie stawia przed nim Prawo Harcerskie. Zna swoje wady i zalety, próbuje pracować nad sobą.",
      requirements: [
        "Ma wiedzę potrzebną do harcerskich działań:",
        "• Rozpoznaje inne drużyny działające w jego środowisku harcerskim",
        "• Wie, kim był bł. ks. phm. S. W. Frelichowski i zna kilka innych postaci z historii ruchu harcerskiego",
        "• Zna kilka najważniejszych faktów z historii drużyny i harcerstwa",
        "• Zna kilka piosenek śpiewanych w drużynie",
        "• Zna strukturę Organizacji Harcerzy ZHR i nazwiska swoich przełożonych do poziomu hufcowego",
        "• Rozpoznaje oznaczenia funkcji do poziomu chorągwi włącznie",
        "Zdobył wymagane sprawności",
        "Zdobył wybrane przez siebie sprawności dodatkowe o sumie pięciu gwiazdek",
      ],
      badges: [
        {
          id: "e84068c0-a63a-11e9-978c-e1f8b14ef979",
          name: "Strażnik ognia",
          stars: 2,
        },
        {
          id: "a54d68c0-a283-11e9-a233-a740fc6f829d",
          name: "Terenoznawca",
          stars: 2,
        },
        {
          id: "636991a0-9e86-11e9-9580-59e2b0953aa1",
          name: "Sanitariusz",
          stars: 2,
        },
        {
          id: "8701cf60-9788-11e9-8a39-0d34c0c1cd2b",
          name: "Sygnalista",
          stars: 2,
        },
        {
          id: "9b0ecd20-07f2-11ea-9ee4-79526a865591",
          name: "Traper",
          stars: 2,
        },
        {
          id: "4d309060-a281-11e9-a95a-458191ecc476",
          name: "Technik obozowy",
          stars: 2,
        },
        {
          id: "a9e76070-f35a-11e9-93ff-c9dbb0aa0609",
          name: "Wartownik",
          stars: 2,
        },
        {
          id: "934e7800-f4fc-11e9-9431-9f06e19584fa",
          name: "Tropiciel zwierzyny",
          stars: 2,
        },
        {
          id: "06185220-a809-11e9-95ba-03b2681d012f",
          name: "Botanik",
          stars: 2,
        },
        {
          id: "21691950-fe77-11e9-9701-1983a55cc876",
          name: "Zgodny",
          stars: 1,
        },
        {
          id: "97462b40-f11b-11e9-ba1c-bdd69a7a94b9",
          name: "Kamyk",
          stars: 1,
        },
      ],
      individualTasksCount: "2-4",
      expectedTime: "do 4 miesięcy",
      icon: "/rank-regulations/male/icons/wywiadowca.svg",
    },
    {
      name: "ćwik",
      shortName: "ćw.",
      age: "13-16 lat",
      badge: "złota lilijka na Krzyżu",
      description:
        "Ćwik daje sobie radę w każdej sytuacji. To mistrz w technikach harcerskich. Jest pogodny i zaradny, nie załamują go trudności. Odpowiedzialnie wywiązuje się z przyjętych na siebie obowiązków. Jest godny zaufania. Potrafi kierować i zgodnie współpracować w zespole. Jest gotów na każde wezwanie do służby. Daje dobry przykład młodszym. Prawo Harcerskie jest dla niego drogowskazem w każdej sferze życia. Osiąga widoczne efekty w pracy nad sobą.",
      requirements: [
        "Ma wiedzę potrzebną do harcerskich działań:",
        "• Potrafi wyjaśnić, czym ZHR różni się od innych organizacji harcerskich w Polsce",
        "• Potrafi scharakteryzować wybrane okresy z historii harcerstwa (np. do 1918 r., XX-lecie międzywojenne, druga wojna światowa, PRL, po 1989 r.)",
        "• Zna strukturę całego ZHR i nazwiska Komendanta Chorągwi, Naczelnika Harcerzy oraz Przewodniczącej/go",
        "• Rozpoznaje oznaczenia funkcji we władzach naczelnych ZHR",
        "Zdobył wymagane sprawności",
        "Zdobył trzy sprawności (***) z działu obozownictwo i przyroda (każdą z innej ścieżki), wykazując mistrzostwo w wybranych technikach harcerskich",
        "Zdobył wybrane przez siebie sprawności dodatkowe o sumie sześciu gwiazdek",
      ],
      badges: [
        {
          id: "e42e0570-fe79-11e9-a44d-295a22c78dab",
          name: "Kucharz",
          stars: 2,
        },
        {
          id: "c280fd10-02de-11ea-9362-8f348ecb4b2c",
          name: "Włóczęga",
          stars: 2,
        },
        {
          id: "26355cf0-02e1-11ea-9362-8f348ecb4b2c",
          name: "Cyklista",
          stars: 2,
        },
        {
          id: "74e48f10-fe77-11e9-9701-1983a55cc876",
          name: "Rozjemca",
          stars: 2,
        },
        {
          id: "b8fff790-f119-11e9-ba1c-bdd69a7a94b9",
          name: "Głaz",
          stars: 2,
        },
      ],
      individualTasksCount: "3-5",
      expectedTime: "do 6 miesięcy",
      icon: "/rank-regulations/male/icons/cwik.svg",
    },
    {
      name: "harcerz orli",
      shortName: "HO",
      age: "15-18 lat",
      badge: "złota lilijka i krąg na Krzyżu",
      description:
        "Harcerz orli mierzy wysoko i wyrasta ponad przeciętność - orla jest jego lotów potęga! Poszukuje i sprawdza, odważnie próbuje nowych rzeczy. Próbuje na nowo, w dojrzały sposób, zrozumieć swoje powinności wynikające z Prawa Harcerskiego, Dekalogu i Przykazania Miłości. Stara się swoim przykładem oddziaływać na otoczenie. Rozwija kompetencje przydatne w aktywnym życiu społecznym i buduje własne opinie o otaczającym go świecie. Jest wrażliwy, potrafi stanąć po stronie słabszego i pokrzywdzonego. Ma własne pole służby, którą pełni z oddaniem, systematycznie i rzetelnie. Wprawia się w planowaniu swojego rozwoju i konsekwentnie zmierza do postawionych sobie celów.",
      requirements: [
        "Spełnił wymagania z kategorii:",
        "Wędrowanie (2 wybrane wymagania):",
        "• Ma umiejętności niezbędne do wzięcia udziału w wybranej specjalistycznej formie kilkudniowej wędrówki (np. rowerowej, kajakowej, górskiej, wspinaczkowej, żeglarskiej, narciarskiej)",
        "• Umie zorganizować sobie nocleg w bardzo trudnych warunkach (np. jama śnieżna, legowisko na drzewie, szałas)",
        "• Umie zaplanować i zorganizować jeden z elementów kilkudniowej wędrówki np. noclegi, wyżywienie, trasa",
        "Praca nad sobą (2 wybrane wymagania):",
        "• Potrafi stosować wybraną formę zarządzania czasem",
        "• Umie skutecznie wypracować w sobie pozytywny nawyk",
        "• Umie w sposób umiarkowany i rozsądny korzystać z technologii (np. urządzeń mobilnych, internetu)",
        "Miejsce w społeczeństwie (2 wybrane wymagania):",
        "• Potrafi wykorzystać w praktyce znajomość języka obcego",
        "• Zna założenia programowe największych partii politycznych w kraju. Potrafi omówić główne ugrupowania i postacie w samorządzie lokalnym (gmina, powiat) i regionalnym (województwo)",
        "• Umie brać udział w dyskusji lub debacie, unikając błędów w argumentacji oraz z szacunkiem odnosząc się do rozmówców (np. stosuje założenia komunikacji bez przemocy)",
        "• Umie wygłosić krótkie (3–5 minut) przemówienie popierające jakąś tezę. Umie znaleźć argumenty za tezą, z którą się nie zgadza",
        "• Potrafi wykonać pracę budowlaną lub remontową z użyciem elektronarzędzi (np. wymiana syfonu, układanie płytek, szpachlowanie, stolarka ogrodowa, ścianka z płyt g-k, skrzynia)",
        "• Potrafi zarobić i zaoszczędzić pieniądze na wybrany przez siebie cel (np. obóz, rower, sprzęt elektroniczny)",
        "• Umie ocenić wiarygodność informacji medialnej oraz dotrzeć do pierwotnego źródła danej informacji. Zna kilka najczęściej popełnianych błędów poznawczych i popularnych technik manipulacyjnych",
        "Służba (co najmniej 1 zadanie):",
        "• Dotrzymanie zobowiązania do regularnej służby - zgodnie z ustaleniami z drużynowym lub kapitułą stopnia",
        "Wyczyn:",
        "• Zaproponowany przez samego zdobywającego i przeprowadzany zgodnie ze zwyczajem przyjętym w drużynie lub kapitule",
      ],
      badges: [],
      individualTasksCount: "4-6",
      expectedTime: "do 10 miesięcy",
      icon: "/rank-regulations/male/icons/harcerz-orli.svg",
    },
    {
      name: "harcerz Rzeczypospolitej",
      shortName: "HR",
      age: "powyżej 17 lat",
      badge: "złota lilijka, krąg i wieniec na Krzyżu",
      description:
        "Harcerz Rzeczypospolitej wymaga od siebie nawet wtedy, gdy inni od niego nie wymagają. Wstępuje w dorosłe życie jako świadomy i aktywny obywatel. W swoich wyborach kieruje się wiarą i chrześcijańskim systemem wartości. Ma marzenia i je realizuje. Wyróżniającą się postawą i działaniem krzewi harcerskie ideały. Jego życie przepełnione jest miłością do Polski, pożyteczną służbą Ojczyźnie i bliźnim oraz harmonijnym, wszechstronnym rozwojem własnej osoby. Wytrwale podąża obraną drogą.",
      requirements: [
        "Brak. Zdobywanie harcerza Rzeczypospolitej opiera się w pełni o pracę indywidualną.",
      ],
      badges: [],
      individualTasksCount: "5-8",
      expectedTime: "do 12 miesięcy",
      icon: "/rank-regulations/male/icons/harcerz-rzeczypospolitej.svg",
    },
  ];

  const individualTaskAreas = [
    { name: "Bóg, wiara i duchowość", icon: HeartIcon },
    { name: "Siła charakteru", icon: ShieldIcon },
    { name: "Rozum i intelekt", icon: BrainIcon },
    { name: "Zdrowie i sprawność fizyczna", icon: StarIcon },
    { name: "Małe ojczyzny, Polska i świat", icon: GlobeIcon },
    { name: "Rodzina i wybór życiowej drogi", icon: HomeIcon },
    { name: "Służba", icon: HandIcon },
    { name: "Pasje i umiejętności", icon: TargetIcon },
    { name: "Kultura i komunikacja", icon: PaletteIcon },
    { name: "Przyroda i puszczaństwo", icon: LeafIcon },
  ];

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* Header Section */}
      <div className="mb-6 text-center">
        <div className="mb-6">
          <Image
            src="/rank-regulations/male/logo.svg"
            alt="Logo regulaminu stopni harcerzy"
            width={218}
            height={219}
            className="mx-auto max-w-1/2 rounded-full dark:invert"
          />
        </div>
        <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-gray-100">
          STOPNIE HARCERZY
        </h1>
        <p className="text-muted-foreground mb-4 text-xl">
          Projekt nowego regulaminu stopni harcerzy
        </p>
        <Button
          variant="outline"
          size="lg"
          className="inline-flex items-center gap-2"
          asChild
        >
          <a
            href="/rank-regulations/male/regulations.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <DownloadIcon className="size-4" />
            Pobierz regulamin PDF
          </a>
        </Button>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="flex h-auto w-full flex-wrap justify-between gap-2">
          <TabsTrigger value="overview">
            <AwardIcon className="size-4" />
            Przegląd
          </TabsTrigger>
          <TabsTrigger value="ranks">
            <UsersIcon className="size-4" />
            Sylwetki
          </TabsTrigger>
          <TabsTrigger value="individual-tasks">
            <CheckCircleIcon className="size-4" />
            Zadania indywidualne
          </TabsTrigger>
          <TabsTrigger value="process">
            <ShieldIcon className="size-4" />
            Proces
          </TabsTrigger>
          <TabsTrigger value="regulations">
            <BookOpenIcon className="size-4" />
            Regulacje
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stopnie harcerskie</CardTitle>
              <CardDescription>
                Stopień harcerski stanowi potwierdzenie rzetelnej pracy nad sobą
                oraz wyrobienia harcerskiego. Kierunki pracy nad sobą są
                określone w sylwetkach stopni, a poziom wyrobienia harcerskiego
                w wymaganiach ogólnych. Sylwetki i wymagania na stopnie
                wprowadza rozkazem Naczelnik Harcerzy.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nazwa stopnia</TableHead>
                      <TableHead>Wiek zdobywania</TableHead>
                      <TableHead>Oznaczenie na mundurze</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {ranks.map((rank, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            {rank.name}
                            <Badge variant="secondary">{rank.shortName}</Badge>
                          </div>
                        </TableCell>
                        <TableCell>{rank.age}</TableCell>
                        <TableCell>{rank.badge}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  <TableCaption>
                    Harcerz może zdobyć stopnie wymienione w tej tabeli
                  </TableCaption>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Wymagania ogólne</CardTitle>
              <CardDescription>
                Stopień jest przyznawany harcerzowi, który spełnia wszystkie
                poniższe warunki
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <StarIcon className="mt-0.5 size-6 flex-shrink-0 text-yellow-500 sm:size-5" />
                  <div>
                    <h4 className="font-medium">Praca nad sobą</h4>
                    <p className="text-muted-foreground text-sm">
                      Wykazał się efektywną pracą nad sobą przybliżającą go do
                      sylwetki stopnia, realizując zadania indywidualne
                      zaakceptowane przez drużynowego
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <TargetIcon className="mt-0.5 size-6 flex-shrink-0 text-blue-500 sm:size-5" />
                  <div>
                    <h4 className="font-medium">Wiedza i umiejętności</h4>
                    <p className="text-muted-foreground text-sm">
                      Wykazał się wymaganą wiedzą i umiejętnościami oraz zdobył
                      sprawności wymienione w wymaganiach ogólnych
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <AwardIcon className="mt-0.5 size-6 flex-shrink-0 text-green-500 sm:size-5" />
                  <div>
                    <h4 className="font-medium">Sprawności dodatkowe</h4>
                    <p className="text-muted-foreground text-sm">
                      Zdobył sprawności wybrane przez siebie, inne niż wymagane,
                      o łącznej liczbie gwiazdek określonej w załączniku
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <UsersIcon className="mt-0.5 size-6 flex-shrink-0 text-purple-500 sm:size-5" />
                  <div>
                    <h4 className="font-medium">Aktywność</h4>
                    <p className="text-muted-foreground text-sm">
                      Brał aktywny udział w życiu zastępu i drużyny w okresie
                      zdobywania stopnia
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <ShieldIcon className="mt-0.5 size-6 flex-shrink-0 text-red-500 sm:size-5" />
                  <div>
                    <h4 className="font-medium">Próba końcowa</h4>
                    <p className="text-muted-foreground text-sm">
                      Po spełnieniu warunków zaliczył próbę końcową wyznaczoną
                      przez drużynowego (dotyczy stopni młodzika, wywiadowcy i
                      ćwika)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Podstawowe zasady</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                    <div className="size-2 rounded-full bg-blue-500"></div>
                  </div>
                  <p className="text-sm">
                    Oznaczenia stopni na mundurze wskazane są w tabeli powyżej.
                    Stopnie mogą być dodatkowo oznaczone na bluzach mundurowych,
                    mundurach polowych i okryciach wierzchnich za pomocą
                    naszywek, których wzory i umiejscowienie określa rozkazem
                    Naczelnik Harcerzy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ranks" className="mt-6 space-y-4">
          {ranks.map((rank, index) => (
            <Card key={index} className="gap-2">
              <CardHeader>
                <CardTitle className="text-xl">
                  <div className="flex items-center gap-2">
                    <Image
                      src={rank.icon}
                      alt={`${rank.name} ikona`}
                      width={40}
                      height={40}
                      className="h-auto w-10 rounded-md"
                    />
                    {capitalizeFirstLetter(rank.name)}
                  </div>
                </CardTitle>
                <CardDescription>{rank.description}</CardDescription>
                <CardDescription className="text-xs">
                  Sugerowany czas na wykonanie: {rank.expectedTime}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="mb-2 font-medium">Wymagania ogólne:</h4>
                  <ul className="ml-4 space-y-1 text-sm">
                    {rank.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                {rank.badges.length > 0 && (
                  <div className="mt-4">
                    <h4 className="mb-2 font-medium">Wymagane sprawności:</h4>
                    <div className="flex flex-wrap gap-2">
                      {rank.badges.map((rankBadge) => {
                        const badgeData = badgeMap.get(rankBadge.id);
                        if (!badgeData) return null;

                        return (
                          <BadgePopover
                            key={rankBadge.id}
                            badge={badgeData}
                            imageUrl={`https://stamps.zhr.pl/img/form/${badgeIcons[rankBadge.id]}`}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}

                <div className="mt-4">
                  <h4 className="mb-2 font-medium">Zadania indywidualne:</h4>
                  <div className="flex items-center gap-2 text-sm">
                    <span>
                      Proponowana liczba zadań: {rank.individualTasksCount}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="individual-tasks" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zadania indywidualne</CardTitle>
              <CardDescription>
                Kluczowy element rozwoju harcerskiego w dążeniu do ideałów
                wskazanych w Prawie Harcerskim
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium">Cel zadań</h4>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Dążenie do ideałów wskazanych w Prawie Harcerskim poprzez
                    kształtowanie postaw, cnót i cech charakteru, tworzenie
                    pożytecznych nawyków, zgodnie z potrzebami i możliwościami
                    harcerza.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium">Proces wyznaczania</h4>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Harcerz, z pomocą drużynowego lub opiekuna próby, dokonuje
                    samooceny, wskazuje cele i techniki pracy nad sobą i
                    wyznacza zadania indywidualne - zgodnie ze swoją wizją
                    dalszego rozwoju. Liczba zadań powinna być dostosowana do
                    zdobywanego stopnia oraz indywidualnych potrzeb i możliwości
                    harcerza.
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-medium">Elastyczność</h4>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Istnieje możliwość zmiany zadania indywidualnego, jeśli
                    przestało ono odpowiadać postawionym celom lub wizji
                    dalszego rozwoju.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Obszary zadań indywidualnych</CardTitle>
              <CardDescription>
                Zadania indywidualne dotyczą następujących dziedzin rozwoju
                osobowego
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                {individualTaskAreas.map((area, index) => {
                  const IconComponent = area.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-lg border p-3"
                    >
                      <IconComponent className="mt-0.5 size-6 text-blue-500 sm:size-5" />
                      <div>
                        <h4 className="text-sm font-medium">{area.name}</h4>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Zaliczanie zadań</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircleIcon className="mt-0.5 size-6 flex-shrink-0 text-green-500 sm:size-5" />
                  <p className="text-sm">
                    Harcerz, który spełnił wymaganie lub zrealizował zadanie
                    indywidualne zgłasza to drużynowemu, wyznaczonej przez niego
                    osobie, opiekunowi lub kapitule w celu potwierdzenia
                    zaliczenia.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="process" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Zdobywanie stopni</CardTitle>
              <CardDescription>
                Podstawowe zasady procesu zdobywania stopni harcerskich
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                    <div className="size-2 rounded-full bg-blue-500"></div>
                  </div>
                  <p className="text-sm">
                    Zdobywanie pierwszego stopnia rozpoczyna się z chwilą
                    wstąpienia do drużyny, a każdego kolejnego z chwilą zdobycia
                    poprzedniego.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                    <div className="size-2 rounded-full bg-green-500"></div>
                  </div>
                  <p className="text-sm">
                    Harcerz nie może rozpocząć zdobywania innego stopnia niż
                    przewidziany dla jego wieku (zgodnie z tabelą stopni).
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
                    <div className="size-2 rounded-full bg-yellow-500"></div>
                  </div>
                  <p className="text-sm">
                    Harcerz, który zdobywa stopień z pominięciem jednego lub
                    kilku poprzednich, musi wykazać się wiedzą i wszystkimi
                    umiejętnościami określonymi w wymaganiach ogólnych na
                    zdobywany stopień oraz wszystkie poprzednie.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Przyznawanie stopni</CardTitle>
              <CardDescription>
                Zasady przyznawania stopni harcerskich
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <ShieldIcon className="mt-0.5 size-6 flex-shrink-0 text-blue-500 sm:size-5" />
                  <p className="text-sm">
                    Drużynowy przyznaje stopnie rozkazem, po stwierdzeniu
                    spełnienia przez harcerza wszystkich warunków.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <TargetIcon className="mt-0.5 size-6 flex-shrink-0 text-yellow-500 sm:size-5" />
                  <p className="text-sm">
                    Jeśli postawa harcerza jest sprzeczna z Prawem Harcerskim,
                    drużynowy może nie przyznać mu stopnia i wyznaczyć dodatkowe
                    zadania, pomimo spełnienia wszystkich warunków.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <AwardIcon className="mt-0.5 size-6 flex-shrink-0 text-green-500 sm:size-5" />
                  <p className="text-sm">
                    Bezpośrednio po przyznaniu pierwszego stopnia drużynowy
                    dopuszcza harcerza do złożenia Przyrzeczenia Harcerskiego.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specjalne przypadki</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="rounded-lg bg-red-50 p-3 dark:bg-red-900/20">
                  <h4 className="mb-1 text-sm font-medium">
                    Harcerz Rzeczypospolitej
                  </h4>
                  <p className="text-xs">
                    Drużynowy przyznaje stopień harcerza Rzeczypospolitej na
                    wniosek kapituły, przed którą harcerz realizował stopień.
                  </p>
                  <p className="text-xs">
                    Drużynowy w stopniu min. podharcmistrza może, w szczególnych
                    sytuacjach i za zgodą hufcowego, przyznawać stopień harcerza
                    Rzeczypospolitej z własnej inicjatywy, po wykonaniu przez
                    harcerza wyznaczonych zadań.
                  </p>
                </div>
                <div className="rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                  <h4 className="mb-1 text-sm font-medium">
                    Brak stopnia HR u drużynowego
                  </h4>
                  <p className="text-xs">
                    Jeżeli drużynowy nie posiada stopnia harcerza
                    Rzeczypospolitej, stopień ten przyznaje odpowiedni hufcowy
                    na wniosek kapituły lub z własnej inicjatywy po wykonaniu
                    przez harcerza wyznaczonych zadań.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Opiekunowie i kapituły</CardTitle>
              <CardDescription>
                Wsparcie w zdobywaniu wyższych stopni harcerskich
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="font-medium">
                  Harcerz orli i Harcerz Rzeczypospolitej
                </h4>
                <p className="text-muted-foreground mt-1 text-sm">
                  W ramach zdobywania stopni harcerza orlego i harcerza
                  Rzeczypospolitej zdobywający wybiera sobie opiekuna spośród
                  harcerzy, którzy już ten stopień posiadają. Do zadań opiekuna
                  należą:
                </p>
              </div>

              <div className="mt-4 grid gap-4 md:grid-cols-3">
                <div className="rounded-lg border p-4 text-center">
                  <TargetIcon className="mx-auto mb-2 size-8 text-blue-500" />
                  <h5 className="font-medium">Cele rozwojowe</h5>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Pomoc w wyznaczeniu celów rozwojowych i określaniu zadań
                    indywidualnych
                  </p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <UsersIcon className="mx-auto mb-2 size-8 text-green-500" />
                  <h5 className="font-medium">Kontakt</h5>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Utrzymywanie regularnego kontaktu ze zdobywającym stopień i
                    monitorowanie jego postępów
                  </p>
                </div>
                <div className="rounded-lg border p-4 text-center">
                  <ShieldIcon className="mx-auto mb-2 size-8 text-purple-500" />
                  <h5 className="font-medium">Wsparcie</h5>
                  <p className="text-muted-foreground mt-1 text-xs">
                    Wsparcie zdobywającego stopień w realizacji zadań
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h4 className="font-medium">Kapituły stopni</h4>
                <p className="text-muted-foreground text-sm">
                  Do pomocy w realizacji procesu zdobywania stopni harcerza
                  orlego i harcerza Rzeczypospolitej drużynowy może powołać
                  kapitułę danego stopnia złożoną z minimum trzech harcerzy
                  posiadających ten stopień, w tym instruktora.
                </p>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-lg border p-4">
                    <h5 className="mb-2 text-sm font-medium">Kapituła HO</h5>
                    <ul className="list-disc space-y-1 pl-5 text-xs">
                      <li>
                        Przewodniczy drużynowy lub wyznaczony przez niego
                        instruktor
                      </li>
                      <li>Min. 3 harcerzy posiadających stopień HO</li>
                      <li>Zawiera instruktora</li>
                    </ul>
                  </div>
                  <div className="rounded-lg border p-4">
                    <h5 className="mb-2 text-sm font-medium">Kapituła HR</h5>
                    <ul className="list-disc space-y-1 pl-5 text-xs">
                      <li>
                        Przewodniczy instruktor w stopniu co najmniej
                        podharcmistrza – drużynowy lub inny wyznaczony przez
                        niego instruktor
                      </li>
                      <li>Min. 3 harcerzy posiadających stopień HR</li>
                      <li>
                        Jeśli drużynowy nie jest harcerzem Rzeczypospolitej,
                        kapitułę harcerza Rzeczypospolitej, powołuje hufcowy na
                        wniosek drużynowego
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                  <h5 className="mb-2 text-sm font-medium">Zadania kapituł:</h5>
                  <ul className="list-disc space-y-1 pl-5 text-xs">
                    <li>Zatwierdzanie kształtu zadań indywidualnych</li>
                    <li>Ocena i zatwierdzenie wykonania zadań</li>
                    <li>
                      Wnioskowanie o przyznanie stopnia - do drużynowego, ew.
                      hufcowego
                    </li>
                    <li>
                      Dbanie o ciągłość procesu wychowawczego w drużynie lub
                      środowisku harcerskim
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulations" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Uprawnienia drużynowego</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-blue-100 p-2 dark:bg-blue-900">
                    <ShieldIcon className="size-4 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Organizacja procesu</h4>
                    <p className="text-muted-foreground text-sm">
                      Za organizację procesu zdobywania stopni odpowiada
                      drużynowy.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-green-100 p-2 dark:bg-green-900">
                    <TargetIcon className="size-4 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Rozstrzyganie sporów</h4>
                    <p className="text-muted-foreground text-sm">
                      Drużynowy rozstrzyga sytuacje sporne oraz decyduje w
                      sprawach wyjątkowych.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-yellow-100 p-2 dark:bg-yellow-900">
                    <BookOpenIcon className="size-4 text-yellow-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Dodatkowe wymagania</h4>
                    <p className="text-muted-foreground text-sm">
                      Drużynowy może określić rozkazem dodatkowe wymagania
                      ogólne obowiązujące wszystkich harcerzy w drużynie.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="rounded-full bg-purple-100 p-2 dark:bg-purple-900">
                    <UsersIcon className="size-4 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">P.o. drużynowego</h4>
                    <p className="text-muted-foreground text-sm">
                      Jeżeli drużynę prowadzi pełniący obowiązki drużynowego,
                      zakres jego uprawnień w ramach regulaminu stopni określa
                      hufcowy rozkazem powierzającym obowiązki.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Współpraca i koordynacja</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium">Wspólne kapituły</h4>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Na wniosek zainteresowanych drużynowych hufcowy lub
                    komendant chorągwi powołuje wspólną kapitułę dla danych
                    drużyn.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium">Współpraca kapitół HR</h4>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Przewodniczący kapituły harcerza Rzeczypospolitej jest
                    odpowiedzialny za współpracę z innymi kapitułami tego
                    stopnia, działającymi na terenie chorągwi, w celu wymiany
                    doświadczeń i promowania dobrych wzorców.
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-medium">Zakres współpracy</h4>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Zakres i formę współpracy określa właściwy komendant
                    chorągwi.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

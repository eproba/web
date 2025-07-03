import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Award, BookOpen, Shield, Star, Target, Users } from "lucide-react";

export default function MaleRegulationsPage() {
  const ranks = [
    {
      name: "młodzik",
      shortName: "mł.",
      age: "11-13 lat",
      badge: "Krzyż harcerski",
      variant: "secondary" as const,
    },
    {
      name: "wywiadowca",
      shortName: "wyw.",
      age: "12-14 lat",
      badge: "srebrna lilijka na Krzyżu",
      variant: "outline" as const,
    },
    {
      name: "ćwik",
      shortName: "ćw.",
      age: "13-16 lat",
      badge: "złota lilijka na Krzyżu",
      variant: "default" as const,
    },
    {
      name: "harcerz orli",
      shortName: "HO",
      age: "15-18 lat",
      badge: "złota lilijka i krąg na Krzyżu",
      variant: "destructive" as const,
    },
    {
      name: "harcerz Rzeczypospolitej",
      shortName: "HR",
      age: "powyżej 17 lat",
      badge: "złota lilijka, krąg i wieniec na Krzyżu",
      variant: "destructive" as const,
    },
  ];

  const profiles = [
    {
      rank: "MŁODZIK",
      description:
        "Młodzik wie, co to znaczy być harcerzem, i chce nim zostać. Potrafi zadbać o siebie. Jest dzielny. Pomaga innym, szczególnie słabszym. Jest dobrym kolegą, synem i uczniem. Odróżnia dobro od zła i stara się być lepszy, niż jest.",
    },
    {
      rank: "WYWIADOWCA",
      description:
        "Wywiadowca zasługuje na miano harcerskiego wygi. Doskonali się w technikach harcerskich. Potrafi zadbać o siebie, a także pomaga młodszym w przeżywaniu harcerskiej przygody, nawet podczas złej pogody. Można mu powierzyć samodzielne obowiązki w drużynie. Harcerzem jest nie tylko wtedy, kiedy ma na sobie mundur. Wypełnia powinności, jakie stawia przed nim Prawo Harcerskie. Zna swoje wady i zalety, próbuje pracować nad sobą.",
    },
    {
      rank: "ĆWIK",
      description:
        "Ćwik daje sobie radę w każdej sytuacji. To mistrz w technikach harcerskich. Jest pogodny i zaradny, nie załamują go trudności. Odpowiedzialnie wywiązuje się z przyjętych na siebie obowiązków. Jest godny zaufania. Potrafi kierować i zgodnie współpracować w zespole. Jest gotów na każde wezwanie do służby. Daje dobry przykład młodszym. Prawo Harcerskie jest dla niego drogowskazem w każdej sferze życia. Osiąga widoczne efekty w pracy nad sobą.",
    },
    {
      rank: "HARCERZ ORLI",
      description:
        "Harcerz orli mierzy wysoko i wyrasta ponad przeciętność - orla jest jego lotów potęga! Poszukuje i sprawdza, odważnie próbuje nowych rzeczy. Próbuje na nowo, w dojrzały sposób, zrozumieć swoje powinności wynikające z Prawa Harcerskiego, Dekalogu i Przykazania Miłości. Stara się swoim przykładem oddziaływać na otoczenie. Rozwija kompetencje przydatne w aktywnym życiu społecznym i buduje własne opinie o otaczającym go świecie. Jest wrażliwy, potrafi stanąć po stronie słabszego i pokrzywdzonego. Ma własne pole służby, którą pełni z oddaniem, systematycznie i rzetelnie. Wprawia się w planowaniu swojego rozwoju i konsekwentnie zmierza do postawionych sobie celów.",
    },
    {
      rank: "HARCERZ RZECZYPOSPOLITEJ",
      description:
        "Harcerz Rzeczypospolitej wymaga od siebie nawet wtedy, gdy inni od niego nie wymagają. Wstępuje w dorosłe życie jako świadomy i aktywny obywatel. W swoich wyborach kieruje się wiarą i chrześcijańskim systemem wartości. Ma marzenia i je realizuje. Wyróżniającą się postawą i działaniem krzewi harcerskie ideały. Jego życie przepełnione jest miłością do Polski, pożyteczną służbą Ojczyźnie i bliźnim oraz harmonijnym, wszechstronnym rozwojem własnej osoby. Wytrwale podąża obraną drogą.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="mb-6">
          <img
            src="https://static.djangoproject.com/img/fundraising-heart.cd6bb84ffd33.svg"
            alt="Herb harcerski"
            width={218}
            height={219}
            className="mx-auto rounded-lg shadow-md"
          />
        </div>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
          STOPNIE HARCERZY
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          Projekt nowego regulaminu stopni harcerzy
        </p>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Przegląd
          </TabsTrigger>
          <TabsTrigger value="profiles" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Sylwetki
          </TabsTrigger>
          <TabsTrigger value="requirements" className="flex items-center gap-2">
            <Target className="w-4 h-4" />
            Wymagania
          </TabsTrigger>
          <TabsTrigger value="process" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            Proces
          </TabsTrigger>
          <TabsTrigger value="regulations" className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Regulacje
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5" />
                Stopnie harcerskie
              </CardTitle>
              <CardDescription>
                Stopień harcerski stanowi potwierdzenie rzetelnej pracy nad sobą
                oraz wyrobienia harcerskiego.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
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
                            <Badge variant={rank.variant}>
                              {rank.shortName}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>{rank.age}</TableCell>
                        <TableCell>{rank.badge}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
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
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                  </div>
                  <p className="text-sm">
                    Kierunki pracy nad sobą określają sylwetki stopni, a poziom
                    wyrobienia harcerskiego wymagania ogólne dla poszczególnych
                    stopni.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  </div>
                  <p className="text-sm">
                    Oznaczenia stopni na mundurze mogą być dodatkowo oznaczone
                    na bluzach mundurowych za pomocą naszywek.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profiles" className="space-y-4 mt-6">
          {profiles.map((profile, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{profile.rank}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{profile.description}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="requirements" className="space-y-6 mt-6">
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
                <div className="flex items-start gap-3">
                  <Star className="w-5 h-5 text-yellow-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Praca nad sobą</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Wykazał się efektywną pracą nad sobą przybliżającą go do
                      sylwetki stopnia, realizując zadania indywidualne
                      zaakceptowane przez drużynowego
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Target className="w-5 h-5 text-blue-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Wiedza i umiejętności</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Wykazał się wymaganą wiedzą i umiejętnościami oraz zdobył
                      sprawności wymienione w wymaganiach ogólnych
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-green-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Sprawności dodatkowe</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Zdobył sprawności wybrane przez siebie, inne niż wymagane,
                      o łącznej liczbie gwiazdek określonej w załączniku
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-purple-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Aktywność</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Brał aktywny udział w życiu zastępu i drużyny w okresie
                      zdobywania stopnia
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-red-500 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Próba końcowa</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Po spełnieniu warunków zaliczył próbę końcową wyznaczoną
                      przez drużynowego (dotyczy stopni młodzika, wywiadowcy i
                      ćwika)
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Młodzik</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">Wymagane sprawności:</h4>
                  <div className="flex flex-wrap gap-1">
                    {[
                      "Płomień*",
                      "Obserwator*",
                      "Higienista*",
                      "Mistrz musztry*",
                      "Łącznik*",
                      "Biwakowicz*",
                      "Sobieradek obozowy*",
                      "Bystre oko*",
                      "Przyrodnik*",
                      "Chatka Robinsona*",
                      "Kuchcik*",
                      "Rowerzysta*",
                    ].map((sprawnosc, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {sprawnosc}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm">
                  Sprawności dodatkowe: <Badge>4 gwiazdki</Badge>
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Wywiadowca</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <h4 className="font-medium mb-2">Wymagane sprawności:</h4>
                  <div className="flex flex-wrap gap-1">
                    {[
                      "Strażnik ognia**",
                      "Terenoznawca**",
                      "Sanitariusz**",
                      "Sygnalista**",
                      "Traper**",
                      "Technik obozowy**",
                      "Wartownik**",
                      "Tropiciel zwierzyny**",
                      "Botanik**",
                      "Zgodny*",
                      "Kamyk*",
                    ].map((sprawnosc, i) => (
                      <Badge key={i} variant="outline" className="text-xs">
                        {sprawnosc}
                      </Badge>
                    ))}
                  </div>
                </div>
                <p className="text-sm">
                  Sprawności dodatkowe: <Badge>5 gwiazdek</Badge>
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="process" className="space-y-6 mt-6">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Zdobywanie stopni</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    </div>
                    <p className="text-sm">
                      Zdobywanie pierwszego stopnia rozpoczyna się z chwilą
                      wstąpienia do drużyny, a każdego kolejnego z chwilą
                      zdobycia poprzedniego.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    </div>
                    <p className="text-sm">
                      Harcerz nie może rozpocząć zdobywania innego stopnia niż
                      przewidziany dla jego wieku.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                    </div>
                    <p className="text-sm">
                      Jeśli harcerz pomija stopnie, musi wykazać się wiedzą i
                      umiejętnościami na dany stopień oraz wszystkie pominięte.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Przyznawanie stopni</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-blue-500 mt-0.5" />
                    <p className="text-sm">
                      Drużynowy przyznaje stopnie rozkazem, po stwierdzeniu
                      spełnienia wszystkich warunków.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Target className="w-5 h-5 text-yellow-500 mt-0.5" />
                    <p className="text-sm">
                      Jeśli postawa harcerza jest sprzeczna z Prawem Harcerskim,
                      drużynowy może nie przyznać stopnia mimo spełnienia
                      warunków.
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <Award className="w-5 h-5 text-green-500 mt-0.5" />
                    <p className="text-sm">
                      Po przyznaniu pierwszego stopnia drużynowy dopuszcza
                      harcerza do złożenia Przyrzeczenia Harcerskiego.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Zdobywający wybiera sobie opiekuna spośród harcerzy i
                  instruktorów, którzy już ten stopień posiadają.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-4 mt-4">
                <div className="text-center p-4 border rounded-lg">
                  <Target className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <h5 className="font-medium">Cele rozwojowe</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Pomoc w wyznaczeniu celów i określaniu zadań
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <h5 className="font-medium">Kontakt</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Regularne monitorowanie postępów
                  </p>
                </div>
                <div className="text-center p-4 border rounded-lg">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <h5 className="font-medium">Wsparcie</h5>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Pomoc w realizacji zadań
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="regulations" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Uprawnienia drużynowego</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 dark:bg-blue-900 p-2 rounded-full">
                    <Shield className="w-4 h-4 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Organizacja procesu</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Za organizację procesu zdobywania stopni odpowiada
                      drużynowy.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-green-100 dark:bg-green-900 p-2 rounded-full">
                    <Target className="w-4 h-4 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Rozstrzyganie sporów</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Drużynowy rozstrzyga sytuacje sporne oraz decyduje w
                      sprawach wyjątkowych.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-100 dark:bg-yellow-900 p-2 rounded-full">
                    <BookOpen className="w-4 h-4 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Dodatkowe wymagania</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Drużynowy może określić rozkazem dodatkowe wymagania
                      ogólne obowiązujące wszystkich harcerzy w drużynie.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Zadania indywidualne</CardTitle>
              <CardDescription>
                Kluczowy element rozwoju harcerskiego
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-medium">Cel zadań</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Dążenie do ideałów wskazanych w Prawie Harcerskim poprzez
                    kształtowanie postaw i cech charakteru, tworzenie
                    pożytecznych nawyków, rozwój duchowy, intelektualny oraz
                    wzmacnianie tężyzny fizycznej.
                  </p>
                </div>
                <div className="border-l-4 border-blue-500 pl-4">
                  <h4 className="font-medium">Proces wyznaczania</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Harcerz dokonuje samooceny, wskazuje cele i techniki pracy
                    nad sobą zgodnie ze swoją wizją dalszego rozwoju i z pomocą
                    drużynowego.
                  </p>
                </div>
                <div className="border-l-4 border-yellow-500 pl-4">
                  <h4 className="font-medium">Elastyczność</h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    Istnieje możliwość zmiany zadania indywidualnego, jeśli
                    przestało ono odpowiadać postawionym celom lub wizji
                    dalszego rozwoju.
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

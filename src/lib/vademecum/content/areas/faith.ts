import { guideposts, hr, see, text } from "../../blocks";
import type { Page } from "../../types";

export const faith: Page = {
  slug: "guideposts/faith",
  chapter: "guideposts",
  title: "Bóg, wiara i duchowość",
  description:
    "Postawy i drogowskazy w obszarze wiary, etyki i życia duchowego.",
  icon: "church",
  intro: [
    text(
      `Harcerska idea prowadzi nas przez drogę służby i miłości bliźniego. Głębokie i dojrzałe rozumienie źródeł tej idei to umiejętność stawiania pytań o to, czym jest dobro, prawda i piękno. Chrześcijanie wierzą, że źródłem tych wartości jest Bóg, a pogłębianie wiary jest drogą do ich lepszego poznania, pielęgnowania w swoim życiu i promieniowania nimi na otoczenie. Jednak duchowe potrzeby człowieka są niezależne od tego, czy uważamy się za ludzi wierzących czy też niewierzących albo wątpiących – wszyscy szukamy sensu tych wartości w naszym życiu. Każdy z nas będąc wiernym idei, która nas w ruchu harcerskim połączyła, powinien rozwijać swoją wrażliwość duchową i pogłębiać rozumienie zasad etycznych. To jest harcerska ścieżka wzrastania do dojrzałości moralnej.`,
    ),
    text(
      `Niezależnie od tego, czy uważasz się za osobę niewierzącą, wątpiącą, obojętną wobec wiary lub głęboko wierzącą, przeczytaj drogowskazy, szukając tych, które będą dla Ciebie inspiracją do duchowego rozwoju w opisanych postawach.`,
    ),
  ],
  sections: [
    {
      title: "Poszukuję Logosu i transcendencji w świecie",
      description:
        "Poszukuję rozumienia głębokich prawd o początku i celu rzeczywistości oraz źródle dobra, prawdy i piękna.",
      blocks: [
        guideposts(
          "Przeczytałem współczesną książkę lub wybrane teksty dotyczące sensu istnienia, harmonii przyrody lub stworzenia świata.",
          "Szukam odpowiedzi na pytania o to: czym jest dobro a czym zło, jaka jest relacja szczęścia i moralności, gdzie można znaleźć uniwersalne drogowskazy etycznego postępowania. Czytam teksty na ten temat i rozmawiam z osobami, które mają gruntowne w nim rozeznanie – np. z filozofem, etykiem, duchownym. Rozmawiam o tym w gronie harcerskim i nie tylko.",
          hr(
            "Studiuję teksty traktujące o idei dobra, cnotach. Próbuję odnieść je do współczesnych wyzwań etycznych i własnego życia.",
            "Zajrzyj też do [„Poznaję klasyczne dzieła kultury i kształtuje swoją wrażliwość jako odbiorca sztuki”](/vademecum/guideposts/culture#poznaje-klasyczne-dziela-kultury-i-ksztaltuje-swoja-wrazliwosc-jako-odbiorca-sztuki).",
          ),
          "Poznaję argumenty za istnieniem Boga (np. 5 dróg św. Tomasza z Akwinu, argumenty z przygodności bytu, argumenty ontologiczne, argument Kalam, argumenty z precyzyjnego dostrojenia itp.).",
          "Z otwartością badam cuda i objawienia.",
          "Śledzę podcasty/ czytam współczesne artykuły, w których poruszane są dylematy dotyczące wiedzy naukowej i wiary.",
          hr(
            "Poznaję klasyczne dzieła i teksty traktujące o istocie Boga (np. Ojców Kościoła, Św. Tomasza z Akwinu). Szukam odpowiedzi na pytanie, co to znaczy, że Bóg jest prosty.",
          ),
        ),
      ],
    },
    {
      title: "Kieruję się zasadami etyki chrześcijańskiej",
      description:
        "Europejska kultura została ufundowana na etyce chrześcijańskiej, która przenika również ruch harcerski – co wyrażone jest w Prawie i Przyrzeczeniu Harcerskim. Chrześcijanin widzi swoje życie jako odpowiedź człowieka na wezwanie Boga i łaskę bycia z Nim w jedności, dlatego zgłębia nauczanie moralne Kościoła i kształtuje swoje sumienie w oparciu o Dekalog i Przykazanie Miłości. Moralne życie człowieka i harcerza jest przywiązaniem do chrześcijańskich zasad etycznych niezależnie od wiary w źródło tych wartości.",
      blocks: [
        guideposts(
          "Poznaję postać Jezusa przez współczesne książki i komentarze do Biblii.",
          "Poznaję nauczanie Jezusa (np. przeczytałem Kazanie na Górze z Ewangelii według św. Mateusza).",
          "Czytam współczesne teksty dot. rozumienia zagadnień etycznych, szczególnie etyki chrześcijańskiej (np. L. Kołakowski).",
          "Regularnie słucham podcasterów i youtuberów tłumaczących moralność chrześcijańską.",
          hr(
            "Poznaję stanowisko Kościoła katolickiego (i/lub mojego Kościoła) wobec współczesnych wyzwań bioetycznych. Umiem zająć w dyskusji stanowisko w podobnych sprawach.",
          ),
          hr(
            "Studiuję koncepcje prawa naturalnego chrześcijańskich i niechrześcijańskich autorów.",
          ),
          "Pogłębiam rozumienie cnót kardynalnych (roztropność, sprawiedliwość, umiarkowanie, męstwo) – uczestniczę w dyskusjach, spotkaniach na ten temat.",
          "Potrafię przeanalizować postępowanie wg kryteriów oceny moralnej czynu (przedmiot, intencja i okoliczności). Zastanawiam się nad rolą sumienia w życiu człowieka (np. uczestniczę w dyskusjach).",
          hr(
            "Poznaję zasady moralności seksualnej obowiązujące w moim Kościele. Wiem, co znaczy, że seksualność człowieka ma cel prokreacyjny i jednoczący.",
          ),
        ),
      ],
    },
    {
      title:
        "Poznaję chrześcijaństwo i Kościół, rozwijam osobistą relację z Bogiem",
      description:
        "Kościoły chrześcijańskie przez wieki wytworzyły wielkie bogactwo różnych praktyk pobożnościowych oraz duchowości, które pomagają żyć w duchu własnego wyznania. Doświadczenie różnych praktyk i form duchowych jest też drogą poznania kultury chrześcijańskiej i otwarcia się na działanie Boga dla tych, którzy go poszukują.",
      blocks: [
        guideposts(
          "Uczestniczyłem przynajmniej raz (w życiu lub przynajmniej raz świadomie) w całym Triduum Paschalnym.",
          see(
            "Czytam literaturę chrześcijańską (np. św. Augustyna, Tolkiena, Chestertona, Lewisa, Cormaca McCarthy’ego).",
            "Zajrzyj też do [„Poznaję klasyczne dzieła kultury i kształtuje swoją wrażliwość jako odbiorca sztuki”](/vademecum/guideposts/culture#poznaje-klasyczne-dziela-kultury-i-ksztaltuje-swoja-wrazliwosc-jako-odbiorca-sztuki).",
          ),
          hr(
            "Odbyłem osobistą refleksyjną wędrówkę na łonie natury, w której zmierzyłem się z jednym z transcendentalnych pytań",
            "Zajrzyj też do [„Czuję się częścią świata przyrody”](/vademecum/guideposts/nature#czuje-sie-czescia-swiata-przyrody).",
          ),
          "Poznałem różnice doktrynalne między Kościołami chrześcijańskimi. Wiem, co łączy, a co różni chrześcijaństwo z innymi wielkimi religiami monoteistycznymi.",
          hr(
            "Poznaję żywoty świętych, którzy mnie inspirują, odbyłem intelektualną i fizyczną pielgrzymkę śladem jednego z nich. (W szczególności dla katolików i obrządków wschodnich).",
          ),
          "Uczestniczyłem w kilkudniowej pieszej lub rowerowej pielgrzymce.",
          "Studiuję historię mojego Kościoła. Umiem zmierzyć się z pytaniami o błędy i niemoralne działania mojego Kościoła w przeszłości i współcześnie.",
          "Świadomie podejmuję się ćwiczeń duchowych – np. poszczę w wybranej intencji, regularnie odmawiam różaniec.",
          hr("Uczestniczyłem w zamkniętych rekolekcjach."),
          hr(
            "Podjąłem się stałej pracy ze spowiednikiem. (W szczególności dotyczy katolików).",
          ),
        ),
      ],
    },
    {
      title: "Jestem otwarty na wspólnotę duchową",
      description:
        "Wartości duchowe poznaje się przez dialog z bliźnimi, wspólne stawianie pytań i poszukiwanie odpowiedzi. Chrześcijanie wierzą też, że to sam Bóg objawił się wobec całego Kościoła i ustanowił się jego Głową. Dlatego pogłębiają oni swoją wiarę również przez aktywne uczestnictwo w życiu Kościoła i utożsamianie się z jego wspólnotą. Najważniejszą wspólnotową formą działania Boga wobec Jego Kościoła i Kościoła wobec Boga jest liturgia – życie nią jest szczególnym elementem relacji z Bogiem.",
      blocks: [
        guideposts(
          see(
            "Brałem udział w służbie na wydarzeniu religijnym (np. Lednicy, ŚDM, Golgocie młodych itp).",
            "Zajrzyj też do [„Nieść chętną pomoc bliźnim”](/vademecum/guideposts/service#harcerz-orli).",
          ),
          "Potrafię w ramach działań drużyny (np. na wycieczce/ wędrówce) opowiedzieć o wpływie kościoła na rozwój kultury (np. w kontekście architektury, sztuki, gospodarki, itp.) – posługując się konkretnymi przykładami.",
          "Brałem udział w rekolekcjach dla poszukujących (np. Kurs Alfa itp.).",
          "Rozmawiałem z mnichem lub z siostrą klauzurową na temat ich sposobu życia, motywacji i wiary.",
          "Wziąłem udział w spotkaniu z osobą, która przeżyła nawrócenie.",
          see(
            "Zaangażowałem się we współtworzenie dzieła charytatywnego w mojej wspólnocie – parafii lub duszpasterstwie.",
            "Zajrzyj też do [„Nieść chętną pomoc bliźnim”](/vademecum/guideposts/service#harcerz-orli).",
          ),
          "Współtworzyłem rozbudowaną oprawę liturgii w mojej wspólnocie (np. podczas Triduum Paschalnego, Mszy Pasterskiej, procesji Bożego Ciała).",
          hr(
            "Podjąłem się uczestnictwa w jednej z grup formacyjnych w moim Kościele (np. neokatechumenat, Opus Dei, oaza, KSM, duszpasterstwo Tradycji).",
          ),
          "Potrafię się duchowo przygotować do poszczególnych części Mszy Świętej, wiem, co się dzieje w każdej z nich. (Dotyczy w szczególności katolików i prawosławnych).",
          "Korzystam z lekcjonarza, potrafię odnaleźć właściwe czytania mszalne i zaśpiewać psalm.",
          hr(
            "Potrafię modlić się Liturgią Godzin lub Lectio Divina. (Dotyczy w szczególności katolików).",
          ),
        ),
      ],
    },
    {
      title: "Poznaję Pismo Święte",
      description:
        "Biblia jest fascynującym literackim zapisem korzeni cywilizacji, w której wszyscy wyrastamy niezależnie od naszych przekonań religijnych. Pismo Święte odczytywane zgodnie z Tradycją Kościoła jest dla wierzących w Boga podstawą wiary chrześcijańskiej. Znajomość Biblii jako Słowa Bożego jest drogą do Jego poznania.",
      blocks: [
        guideposts(
          "Znam podstawową strukturę Nowego i Starego Testamentu, przeczytałem wybrane Ewangelie w całości.",
          see(
            "Śledzę, w jaki sposób treść Biblii była inspiracją do stworzenia innych wielkich dzieł literatury i sztuki – np. odwiedziłem wystawę malarstwa religijnego, uczestniczyłem w koncercie pasyjnym, przeczytałem jeden z klasycznych utworów z motywem biblijnym. Uczestniczyłem w spotkaniu/ dyskusji na ten temat.",
            "Zajrzyj też do [„Poznaję klasyczne dzieła kultury i kształtuje swoją wrażliwość jako odbiorca sztuki”](/vademecum/guideposts/culture#poznaje-klasyczne-dziela-kultury-i-ksztaltuje-swoja-wrazliwosc-jako-odbiorca-sztuki).",
          ),
          "Przeczytałem wybrany, współczesny komentarz do Biblii (np. Rozmowy o Biblii, A. Świderkówna), uczestniczyłem w dyskusji na interesujący mnie temat z nią związany.",
          "Regularnie czytam Pismo Święte.",
          hr(
            "Przeczytałem teksty biblijne mówiące o relacji między wiarą a uczynkami. Zapoznałem się z komentarzami mojego Kościoła do tych tekstów.",
          ),
        ),
      ],
    },
  ],
};

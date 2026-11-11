import { guideposts, hr, text } from "../../blocks";
import type { Page } from "../../types";

export const homeland: Page = {
  slug: "guideposts/homeland",
  chapter: "guideposts",
  title: "Małe ojczyzny, Polska i świat",
  description:
    "Historia Polski, lokalny patriotyzm, braterstwo, obronność i postawa obywatelska.",
  icon: "landmark",
  intro: [
    text(
      `Baden-Powell napisał kiedyś, że obywatelskość to „aktywna wierność wobec wspólnoty”. Aktywna, czyli w czynach, a nie tylko w słowach. Wierność, czyli bycie przy niej również wtedy, gdy jest to dla mnie trudne, wymaga wysiłku lub poświęcenia. Wobec wspólnoty, czyli wobec ludzi żyjących razem i połączonych historią, językiem, kulturą.`,
    ),
    text(
      `Zawołanie „Czuwaj!” oznacza dla nas również: *bądź wierny swojej wspólnocie oraz Polsce i szukaj przyjaciół na całym świecie!*`,
    ),
  ],
  sections: [
    {
      title: "Znam polską historię i jej wpływ na teraźniejszość",
      blocks: [
        guideposts(
          "Potrafię opisać historię Polski od czasu I-go rozbioru.",
          "Potrafię zorganizować akcję patriotyczną towarzyszącą świętu narodowemu.",
          "Znam polskie miasta, regiony i ich rolę w historii Polski, podczas ich odwiedzania świadomie pogłębiam tę wiedzę.",
          "Potrafię wygłosić referat lub zrobić prezentację na temat wybranej kontrowersji z historii Polski.",
        ),
      ],
    },
    {
      title: "Jestem lokalnym patriotą",
      blocks: [
        guideposts(
          "Potrafię oprowadzić wycieczkę po miejscu mojego pochodzenia, prezentując elementy jego historii.",
          "Potrafię nawiązać współpracę drużyny z innymi organizacjami lub instytucjami działającymi lokalnie.",
          hr(
            "Dokonałem pozytywnej zmiany w mojej lokalnej społeczności (wspólnymi siłami „sąsiadów” lub np. przy pomocy budżetu obywatelskiego).",
          ),
        ),
      ],
    },
    {
      title: "Buduję braterstwo z ludźmi z Europy i z całego świata",
      blocks: [
        guideposts(
          "Potrafię godnie zaprezentować Polskę w międzynarodowym gronie.",
          "Potrafię zorganizować kilkudniową podróż do innego kraju, w ramach której poznam jego kulturę i historię.",
          "Potrafię porozumieć się po angielsku w codziennych sytuacjach.",
          "Uczę się wybranego języka obcego (innego niż angielski).",
          hr("Potrafię dyskutować w języku obcym."),
          hr(
            "Potrafię ugościć obcokrajowca lub wspomóc imigranta w integracji w polskim społeczeństwie (np. nauka języka, pomoc w sprawach urzędowych, pomoc w znalezieniu pracy).",
          ),
          hr(
            "Potrafię zorganizować działanie, które angażuje Polaków żyjących poza Polską.",
          ),
        ),
      ],
    },
    {
      title: "Jestem gotów do obrony ojczyzny",
      blocks: [
        guideposts(
          "Uczestniczę w działaniach Pogotowia Harcerek i Harcerzy.",
          "Umiem zachować spokój i opanowanie w sytuacji kryzysowej (np. w razie wypadku, ewakuacji).",
          "Przeszedłem kurs Sanitariusza HOPR.",
          "Potrafię strzelać z broni ostrej (realizując tę umiejętność wyłącznie na strzelnicy pod okiem instruktora strzeleckiego).",
          "Posiadam uprawnienia dronowe.",
          "Posiadam świadectwo operatora radiotelefonisty VHF.",
          hr("Zdałem kurs Kwalifikowanej Pierwszej Pomocy."),
          hr(
            "Przeszedłem podstawowe szkolenie obronne (tzw. „szesnastka” WOT).",
          ),
        ),
      ],
    },
    {
      title: "Jestem świadomym i aktywnym obywatelem",
      blocks: [
        guideposts(
          "Znam polskie partie polityczne, ich programy, profile ideowe i poglądy na najważniejsze kwestie społeczno-gospodarcze.",
          "Potrafię bronić swojego stanowiska w wybranej kwestii dotyczącej Polski w debacie z rówieśnikami.",
          "Mam doświadczenie zaangażowania w działalność samorządową, obywatelską lub polityczną (np. w organizacji pozarządowej, partii politycznej, Młodzieżowej Radzie Miasta).",
          hr(
            "Uczestniczę w wyborach, decyzje podejmuję w duchu odpowiedzialności za Polskę.",
            "Sprawdź również: [„Kształtuję swój światopogląd”](/vademecum/guideposts/intellect#ksztaltuje-swoj-swiatopoglad) w obszarze „Rozum i intelekt”.",
          ),
        ),
      ],
    },
  ],
};

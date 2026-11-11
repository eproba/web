import { guideposts, quote, text } from "../../blocks";
import type { Page } from "../../types";

export const service: Page = {
  slug: "guideposts/service",
  chapter: "guideposts",
  title: "Służba",
  description: "Służba harcerza orlego i harcerza Rzeczypospolitej.",
  icon: "hand-heart",
  intro: [
    text(
      `Rozwój w tym obszarze dotyczy rozwijania jednej postawy – postawy służby, której drogowskazy zawarte są w Przyrzeczeniu Harcerskim: na poziomie harcerza orlego – „Niosę chętną pomoc bliźnim”, a na poziomie harcerza Rzeczypospolitej – „Całym życiem pełnię służbę Bogu i Polsce”.`,
    ),
    quote(
      `Mam szczerą wolę całym życiem pełnić służbę Bogu i Polsce, nieść chętną pomoc bliźnim i być posłusznym Prawu Harcerskiemu.`,
    ),
  ],
  sections: [
    {
      title: "Służba harcerza orlego – „Nieść chętną pomoc bliźnim”",
      id: "harcerz-orli",
      rank: "ho",
      blocks: [
        text(
          `Być harcerzem to znaczy służyć! Bez pomagania innym harcerstwo nie ma sensu.`,
        ),
        text(
          `W naszej służbie zdarza się, że dochodzi do paradoksu. Czasem chcąc pomagać jak najskuteczniej i jak najbardziej efektywnie, skupiamy się na „organizowaniu” działań lub grup pomocowych, a przez to oddalamy się od konkretnych ludzi, którym mamy pomóc. Bywa też, że spotkania z tymi osobami są dla nas wręcz trudne i nieprzyjemne – bo są oni zaniedbani, chorzy albo odpychający w sposobie bycia. Niechęć do takich osób to naturalna i zrozumiała reakcja.`,
        ),
        text(
          `Jednakże jako harcerze powinniśmy starać się przełamywać taką niechęć i nie dystansować się od takich osób. Uczymy się patrzeć na świat z „wyobraźnią miłosierdzia”, tzn. umieć dostrzegać ludzi cierpiących i być przy nich – innymi słowy, po prostu solidaryzować się z nimi.`,
        ),
        text(`### Wskazówki`),
        text(`Służba wędrownika zdobywającego HO powinna:`),
        guideposts(
          "dotyczyć pomocy osobom słabszym i potrzebującym (w szczególności: niepełnosprawnym, osobom starszym, bezdomnym, dzieciom z domu dziecka, dzieciom imigrantów itp.),",
          "prowadzić do bezpośredniego spotkania z tymi osobami (powinna dawać możliwość rozmowy). Służba ta nie powinna sprowadzać się jedynie do organizacji darów na ich rzecz czy też być służbą na rzecz idei, wspólnoty lub instytucji (np. służbą Polsce poprzez sprzątanie grobów bohaterów wojennych, służbą Kościołowi poprzez służbę porządkową na procesji, służbą bliźnim poprzez zebranie darów dla hospicjum),",
          "mieć regularny charakter i trwać min. 2 miesiące.",
        ),
      ],
    },
    {
      title:
        "Służba harcerza Rzeczypospolitej – „Całym życiem pełnić służbę Bogu i Polsce”",
      id: "harcerz-rzeczypospolitej",
      rank: "hr",
      blocks: [
        text(`Co to znaczy, że harcerz całym życiem służy Bogu i Polsce?`),
        text(
          `„Całym życiem” to znaczy we wszystkich działaniach, we wszystkich miejscach, sytuacjach i gronach, w których jesteśmy obecni. „Służba Bogu i Polsce” polega zaś na wykonywaniu codziennych obowiązków – w harcerstwie, w szkole, w pracy czy w domu, a także na gotowości do służby i działania w sytuacjach nadzwyczajnych. Zawsze robimy to z myślą o dobru Polski oraz ofiarowujemy owoce tej służby Bogu.`,
        ),
        text(
          `Nie jest to łatwe. Często robimy pożyteczne rzeczy z innych powodów. Czasem chodzi nam o własne korzyści (np. wolontariat w celu zdobycia punktów na studia), czasem o dobrą zabawę i towarzystwo (np. wyjazd na atrakcyjną służbę za granicę), a czasem o spełnienie własnych ambicji (np. pełnienie służby w harcerstwie dla uznania w oczach innych).`,
        ),
        text(
          `Przyrzeczenie Harcerskie wskazuje, że nasza gotowość do służby Bogu, Polsce i bliźnim ma być szczera – czyli nieuwarunkowana wyłącznie korzyściami własnymi.`,
        ),
        text(`### Wskazówki`),
        guideposts(
          "Sprawdź, czy w swoim życiu masz pole regularnej służby, którą sumiennie wykonujesz – w harcerstwie lub poza nim. Jeśli go nie masz, to okres próby powinieneś wykorzystać na jego znalezienie.",
          "Jeśli pełnisz służbę harcerską jako drużynowy albo przyboczny, możesz w ramach tego zadania zorganizować wartościową służbę z udziałem innych harcerzy.",
        ),
      ],
    },
  ],
};

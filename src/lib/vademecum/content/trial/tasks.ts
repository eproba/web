import { example, figure, text } from "../../blocks";
import type { Page } from "../../types";

export const tasks: Page = {
  slug: "trial/tasks",
  chapter: "trial",
  title: "Jak ułożyć zadanie?",
  description:
    "Od sylwetki stopnia przez obszar życia, postawę i drogowskaz do konkretnego zadania.",
  icon: "list-checks",
  intro: [
    text(`
      Aby ułatwić Ci układanie zadań, skonstruowaliśmy dalszą część Vademecum zgodnie z poniższym schematem:
    `),
    figure("task-funnel"),
    text(`
      1. Podstawą jest **sylwetka** zdobywanego stopnia ([HO](/vademecum/ho#sylwetka) i [HR](/vademecum/hr#sylwetka)). Zacznij od jej przeanalizowania. Które jej zapisy są dla Ciebie jeszcze wyzwaniem? A które chciałbyś jeszcze w sobie wzmocnić?
      2. Na podstawie sylwetek stopni i Prawa Harcerskiego określiliśmy [**Obszary życia**](/vademecum/guideposts) – czyli dziedziny, które są ważne w życiu każdego człowieka. Do jakich obszarów odnoszą się zapisy sylwetki, nad którymi chcesz pracować?
      3. Następnie każdy Obszar uszczegółowiliśmy, tzn. odpowiedzieliśmy sobie na pytanie, nad jakimi **Postawami** z danego Obszaru życia powinien pracować człowiek (wyjątek stanowią obszary [Służby](/vademecum/guideposts/service) i [Siły charakteru](/vademecum/guideposts/character) – podejście do nich opisaliśmy w odpowiednich rozdziałach). Która z nich wymaga Twojej pracy?
      4. W kolejnym kroku określiliśmy, w jaki konkretny sposób dana postawa może przejawiać się u człowieka. **Drogowskazy** mówią zatem o tym, jaka wiedza, umiejętności, doświadczenie, nawyki czy zachowania mogą Ci pomóc rozwinąć daną Postawę. Część Drogowskazów, przeznaczonych przede wszystkim dla zdobywających HR, wyróżniliśmy symbolem **HR**.
      5. Ostatni krok należy do Ciebie – jeśli z opiekunem stwierdzicie, że chcecie pracować nad daną postawą, to przyjrzyjcie się zaproponowanym Drogowskazom i ułóżcie odpowiednie **Zadanie**. Jedno zadanie może podążać za Drogowskazami z różnych Postaw.
    `),
  ],
  sections: [
    {
      title: "Przykład",
      blocks: [
        example(`
          Zauważyłeś, że źle Ci idzie w szkole, masz słabe oceny, a w sylwetce harcerza orlego czytasz, że: *Harcerz orli mierzy wysoko i wyrasta ponad przeciętność – orla jest jego lotów potęga!* oraz *Stara się swoim przykładem oddziaływać na otoczenie.* Chciałbyś coś z tym zrobić.

          1. Otwórz Vademecum na stronach opisujących obszar życia [„Rozum i intelekt”](/vademecum/guideposts/intellect). Zobacz, którą postawę chciałbyś wzmocnić albo która jest Twoją słabą stroną.
          2. Załóżmy, że będzie to postawa [„Uczę się metodycznie i regularnie”](/vademecum/guideposts/intellect#ucze-sie-metodycznie-i-regularnie), ponieważ masz problem z takim sposobem uczenia (a jest on bardzo ważny, aby nauka była efektywna).
          3. Spójrz na Drogowskazy, które podpowiedzą Ci, co możesz zrobić, aby zacząć uczyć się metodycznie i regularnie. Załóżmy, że chciałbyś wypracować „stałe pory w ciągu dnia i tygodnia, kiedy uczysz się regularnie (nie tylko pod klasówki)”.
          4. Wymyśl zadanie. Przykłady:
             - Przez 2 miesiące będę uczył się w każdy poniedziałek od 18:00 do 20:00 oraz w czwartek od 17:00 do 20:00 (margines błędu – 80%).
             - Przez miesiąc codziennie będę się uczył w swoim pokoju przez 45 minut od godz. 19:00 (margines błędu – 90%).
             - Na koniec roku będę miał ocenę 4 z matematyki.

          Możesz połączyć w jednym zadaniu pracę nad kilkoma obszarami. Przykładowo, być może nie masz bladego pojęcia o historii Polski (Obszar życia: [„Małe ojczyzny, Polska i świat”](/vademecum/guideposts/homeland) → Postawa „Znam polską historię i jej wpływ na teraźniejszość” → Drogowskaz „Potrafię opisać historię Polski od I rozbioru Polski”). Możesz wtedy uwzględnić to w tym samym zadaniu, na przykład tak:

          - Przez 2 miesiące będę uczył się historii w każdy poniedziałek od 18:00 do 20:00 oraz w czwartek od 17:00 do 20:00 (margines błędu – 80%).
          - Przez miesiąc codziennie będę się uczył lub czytał podręcznik do historii lub „Dzieje Polski” Andrzeja Nowaka, w swoim stałym miejscu do nauki, przez 45 minut od godz. 19:00 (margines błędu – 90%).
        `),
      ],
    },
  ],
};

import { guideposts, hr, text } from "../../blocks";
import type { Page } from "../../types";

export const family: Page = {
  slug: "guideposts/family",
  chapter: "guideposts",
  title: "Rodzina i wybór drogi życiowej",
  description:
    "Rodzina i pochodzenie, relacje z rodzicami, życie domu i rozpoznawanie powołania.",
  icon: "house",
  intro: [
    text(
      `Harcerz jest karny i posłuszny rodzicom – tego uczymy się już na początku harcerskiej ścieżki. Pewnie nie raz mierzyłeś się z tym punktem Prawa Harcerskiego – czasami w duchu pokory, a być może także w duchu sprzeciwu. Teraz, gdy stopniowo zaczynasz brać większą odpowiedzialność za siebie i swoich bliskich, pomyśl o tym punkcie PH z innej perspektywy – już za kilka lat to Ty będziesz musiał brać odpowiedzialność za swoje własne dzieci, zasługiwać swoimi decyzjami na zaufanie i posłuszeństwo oraz kształtować w nich dyscyplinę.`,
    ),
  ],
  sections: [
    {
      title: "Znam swoją rodzinę i moje pochodzenie",
      blocks: [
        guideposts(
          "Znam historię mojej rodziny (w szczególności na tle wydarzeń historii powszechnej).",
          "Utrzymuję kontakt z dziadkami. Podjąłem próbę nawiązania relacji ze słabo znanym mi członkiem dalszej rodziny.",
        ),
      ],
    },
    {
      title: "Buduję głębokie, oparte na szczerości relacje z rodzicami",
      blocks: [
        guideposts(
          "Wykonuję polecenie otrzymane od rodziców lub negocjuję jego zmianę, argumentując swoje zdanie w odpowiedzialny sposób.",
          "Potrafię w gronie rodziny podziękować swoim rodzicom za ich trud opieki nade mną.",
          "Przejmuję od rodziców coraz trudniejsze i bardziej odpowiedzialne zadania związane z funkcjonowaniem naszej rodziny.",
          hr(
            "Potrafię szczerze porozmawiać z moimi rodzicami o moich problemach i trudnościach w domu.",
          ),
        ),
      ],
    },
    {
      title: "Jestem zaangażowany w życie mojej rodziny",
      blocks: [
        guideposts(
          "Potrafię zorganizować wycieczkę dla rodziny lub jej części (np. w wyjazd z ojcem).",
          "Potrafię zaproponować wprowadzenie w życiu rodziny nowego, wspólnego zwyczaju.",
          "Pomagam rodzeństwu w nauce.",
          "Podjąłem próbę poprawienia relacji z członkiem mojej rodziny, z którym mam najsłabsze relacje.",
          hr(
            "Potrafię przez tydzień mieszkać samodzielnie, wykonując wszystkie niezbędne obowiązki domowe (pranie, gotowanie, zakupy, sprzątanie itd.).",
          ),
        ),
      ],
    },
    {
      title: "Rozpoznaję swoje powołanie i przygotowuję się do niego",
      blocks: [
        guideposts(
          "Potrafię przez pół dnia zaopiekować się małym dzieckiem (w tym zmienić pieluszkę, nakarmić je, umyć itp.).",
          "Dbam o swoją czystość – wiem, czym grozi pornografia i rozwiązłość seksualna. Jeśli ten problem mnie dotyczy, powziąłem walkę z oglądaniem przeze mnie pornografii.",
          "Potrafię wyjść z inicjatywą do dziewczyny (np. zaproponować wspólny kurs tańca, zaprosić na randkę itp.).",
          hr("Aktywnie rozeznaję, czy mam powołanie do kapłaństwa."),
          hr(
            "Wiem, co to (zgodnie z katolicką nauką społeczną) znaczy, że seksualność człowieka ma cel prokreacyjny i jednoczący.",
          ),
          hr(
            "Rozwijam relację ze swoją dziewczyną, rozmawiam z nią o wartościach, działamy wspólnie w różnych przedsięwzięciach.",
          ),
        ),
      ],
    },
  ],
};

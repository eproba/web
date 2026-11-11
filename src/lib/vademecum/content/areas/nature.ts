import { guideposts, hr, text } from "../../blocks";
import type { Page } from "../../types";

export const nature: Page = {
  slug: "guideposts/nature",
  chapter: "guideposts",
  title: "Przyroda i puszczaństwo",
  description: "Więź z przyrodą i wiedza o środowisku przyrodniczym.",
  icon: "trees",
  intro: [
    text(
      `Harcerstwo to bezdroża, puszcza, strumienie, góry i jeziora – to świeże powietrze!`,
    ),
    text(
      `Życie harcerskie nierozerwalnie związane jest ze stałym doświadczaniem przyrody. Począwszy od konieczności radzenia sobie z nieprzewidywalnością i surowością pogody, przez ciekawość i zachwyt otaczającą nas puszczą, aż do zrozumienia, że sami jesteśmy kruchą częścią natury. Świadomość odpowiedzialności człowieka i fascynacja złożonością przyrodniczego świata to kapitał, który z harcerstwa wynosimy w życie rodzinne, zawodowe i społeczne.`,
    ),
  ],
  sections: [
    {
      title: "Czuję się częścią świata przyrody",
      blocks: [
        guideposts(
          "Regularnie (np. raz w tygodniu) spędzam czas w otoczeniu przyrody (sportowo, rekreacyjnie, towarzysko), ograniczając korzystanie z rozpraszających dóbr cywilizacyjnych.",
          "Potrafię biwakować w różnych warunkach pogodowych z użyciem nowoczesnych technik bushcraftowych.",
          "Zdobyłem umiejętności niezbędne do dłuższego, kilkudniowego bytowania w terenie.",
          "Wykształciłem nawyk wykorzystywania roweru zamiast pojazdów elektrycznych i spalinowych, świadomie wybieram środki transportu.",
          "Znam zagrożenia wpływające na funkcjonowanie społeczeństw (np. susza hydrologiczna, klęski żywiołowe, zanieczyszczenia) – potrafię przygotować się na sytuacje kryzysowe związane z pogodą lub klimatem.",
          "Pomyślnie przeszedłem próbę „Trzech Piór”.",
        ),
      ],
    },
    {
      title: "Rozwijam swoją wiedzę o środowisku przyrodniczym",
      blocks: [
        guideposts(
          "Korzystam z wiedzy naukowej dotyczącej zjawisk klimatycznych i przyrodniczych, weryfikuję źródła informacji w tej sprawie.",
          "Mam wiedzę dotyczącą cywilizacyjnego oddziaływania na środowisko naturalne – np. procesów produkcji ubrań, wykorzystywanych materiałów i tzw. fast fashion i na jej podstawie dokonuję świadomych wyborów (np. kupuję używane ubrania).",
          hr(
            "Śledzę, w jaki sposób kwestie dotyczące oddziaływania człowieka na środowisko wpływają na polityki publiczne i zmiany w przepisach.",
          ),
        ),
      ],
    },
  ],
};

import { guideposts, hr, note, text } from "../../blocks";
import type { Page } from "../../types";

export const health: Page = {
  slug: "guideposts/health",
  chapter: "guideposts",
  title: "Zdrowie i sprawność fizyczna",
  description: "Sprawność fizyczna, zdrowie, higiena i higiena cyfrowa.",
  icon: "heart-pulse",
  intro: [
    text(
      `**Harcerz jest sprawny i dba o swoje zdrowie!** Od tego będzie zależało, na ile będziemy w stanie pełnić w życiu służbę – w końcu żona potrzebuje zdrowego i zadbanego męża, dzieci potrzebują silnego taty, Polska potrzebuje obywateli zdolnych stawać w jej obronie, pracodawcy poszukują zdrowych współpracowników. Warto o tym myśleć już teraz.`,
    ),
  ],
  sections: [
    {
      title: "Jestem wysportowany i sprawny fizycznie",
      blocks: [
        guideposts(
          "Potrafię zrealizować program treningowy.",
          "Planuję dzień tak, aby w wykonywanie codziennych obowiązków wplatać krótkie aktywności fizyczne (np. spacer, jazda na rowerze, ćwiczenia rozciągające).",
          hr(
            "Mam wyrobiony nawyk regularnego podejmowania aktywności fizycznej. Jest ona częścią mojej tygodniowej rutyny.",
          ),
          hr("Potrafię zrealizować wyczyn fizyczny na poziomie mistrzowskim."),
        ),
      ],
    },
    {
      title: "Dbam o swoje zdrowie",
      blocks: [
        guideposts(
          "Wiem, jaka jest moja właściwa waga, jaka jest odpowiednia dla mnie dieta (np. ile kalorii powinienem spożywać dziennie) i trzymam się jej.",
          "Znam dobre nawyki żywieniowe (regularne posiłki, odpowiednie składniki, unikanie „energetyków” itp.) i wcielam je w życie.",
          "Mam stałe godziny snu (min. 8 godzin dziennie).",
          "Rozumiem ryzyko stosowania jakichkolwiek środków psychoaktywnych (np. alkohol, dopalacze, narkotyki) i uzależniających (np. nikotyna).",
        ),
      ],
    },
    {
      title: "Dbam o swoją higienę i dobry wygląd",
      blocks: [
        guideposts(
          "Regularnie się golę lub strzygę brodę, codziennie myję się i używam dezodorantu.",
          "Potrafię zająć się swoimi problemami dermatologicznymi (np. poprzez konsultacje z kosmetyczką i dermatologiem).",
        ),
      ],
    },
    {
      title: "Zachowuję higienę cyfrową",
      blocks: [
        guideposts(
          "Wiem, jak działa uzależnienie od urządzeń ekranowych i jakie niesie skutki.",
          "Potrafię funkcjonować bez korzystania z jakichkolwiek mediów społecznościowych przez dłuższy czas (np. Wielki Post).",
          "Nie używam telefonu w czasie lekcji, posiłków rodzinnych, przechodząc przez przejście dla pieszych, prowadząc samochód, rower, po godz. 22.00 itd.",
          "Mierzę w aplikacji czas korzystania z urządzeń ekranowych, wyznaczam sobie limity i ich przestrzegam.",
        ),
        note(
          `Sprawdź w jednym z dostępnych w Internecie testów higieny cyfrowej, np. Test Higieny Cyfrowej ICO – Instytut Cyfrowego Obywatelstwa.`,
        ),
      ],
    },
  ],
};

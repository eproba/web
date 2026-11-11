import { signature, text } from "../blocks";
import type { Page } from "../types";

export const welcome: Page = {
  slug: "",
  title: "Wędrowniku!",
  description:
    "Vademecum prób indywidualnych na stopnie harcerza orlego i harcerza Rzeczypospolitej.",
  intro: [
    text(`
      ### Wędrowniku!

      Wędrowniku, nie wiem, czy też tak masz jak ja – ale kiedy zaczynasz coś naprawdę ważnego, z jednej strony czujesz ekscytację, a z drugiej gdzieś z tyłu głowy pojawia się myśl: „to nie będzie łatwe”. Skoro sięgasz po to Vademecum, to pewnie stoisz właśnie przed wyzwaniem zdobycia HO albo HR. Dla mnie to była świetna przygoda – wymagająca, momentami niewygodna, ale bardzo konkretna i zostająca na całe życie.

      Praca nad sobą przypomina pierwsze wyjście w góry. Na dole jest wizja – szczyt, widoki, satysfakcja. Im wyżej, tym trudniej: zimniej, bardziej pod wiatr, nogi bolą, każdy krok kosztuje więcej. W pewnym momencie pojawia się pokusa, żeby zawrócić – wrócić do ciepła, wygody, do tego, co znane. Tylko że… komfort nigdy nie był naszą opcją. I dobrze, bo wszystko, co naprawdę wartościowe, przychodzi z trudem.

      Pomyśl teraz o swoim życiu. Jakie „szczyty” chcesz zdobyć? Jakie cnoty wypracować, z jakimi słabościami się zmierzyć? Warto mierzyć wysoko – bo z czasem wcale nie robi się łatwiej. Ale właśnie ta droga daje coś realnego: życie sensowne, radosne, oparte na służbie i odpowiedzialności.

      W tym Vademecum znajdziesz konkret: jak pracować nad sobą przez stopnie, jak wygląda ich zdobywanie i jak dobrze stawiać sobie zadania. Są też wskazówki, co rozwijać – umiejętności, nawyki, doświadczenia.

      Mierz wysoko. Może spotkamy się kiedyś na szczycie.
    `),
    signature(
      "HR Marcin Mucha (hm.)",
      "Roztropny Niedźwiedź",
      "Naczelnik Harcerzy",
    ),
  ],
  sections: [],
};

/** Closing words of the printed edition. */
export const farewell = {
  quote: [
    "Szczęście nie bierze się z bycia bogatym, ani tylko z odniesienia sukcesu w karierze, ani z pobłażania samemu sobie. Jednym z kroków ku szczęściu jest dbanie o zdrowie i siłę póki jesteś chłopcem, tak abyś jako mężczyzna mógł być użyteczny i czerpać radość z życia. […]",
    "Prawdziwą drogą do szczęścia jest dawanie go innym ludziom. Staraj się zostawić ten świat choć trochę lepszym, niż go zastałeś, a kiedy przyjdzie czas twojej śmierci, będziesz mógł umrzeć szczęśliwy, czując, że w każdym razie nie zmarnowałeś czasu, lecz dałeś z siebie wszystko. Bądź w ten sposób „Gotów”, by żyć szczęśliwie i umierać szczęśliwie – trzymaj się zawsze swojej obietnicy skautowej – nawet gdy przestaniesz być chłopcem – i niech Bóg dopomoże ci w jej dotrzymaniu.",
  ],
  title: "Ostatnie przesłanie Roberta Baden-Powella do skautów",
};

/** Imprint of the printed edition. */
export const imprint = {
  edition: "Vademecum. Próby indywidualne na stopnie HO i HR",
  details: [
    "Regulamin stopni harcerzy przyjęty Uchwałą Naczelnictwa ZHR nr 493/2 z dnia 11 czerwca 2026 r.",
    "Wymagania na stopnie zatwierdzone rozkazem Naczelnika Harcerzy L12/2026 z dnia 18 czerwca 2026 r.",
    "Redakcja: phm. Michał Homenda",
    "Projekt graficzny dodatkowych oznaczeń stopni: hm. Dariusz Grochal",
    "Korekta językowa: Barbara Błoniarz",
    "Skład i opracowanie graficzne: (phm.) Małgorzata Chustecka",
    "ISBN: 978-83-68300-13-0",
    "Wydano nakładem Głównej Kwatery Harcerzy Związku Harcerstwa Rzeczypospolitej, Warszawa 2026",
  ],
  team: [
    "phm. Michał Homenda (Lubelska Chorągiew Harcerzy)",
    "hm. Kajetan Kapuściński (Mazowiecka Chorągiew Harcerzy)",
    "hm. Marek Gajdziński (Mazowiecka Chorągiew Harcerzy)",
    "hm. Andrzej Jaworski (Mazowiecka Chorągiew Harcerzy)",
    "hm. Jan Kamiński (Mazowiecka Chorągiew Harcerzy)",
    "ks. hm. Radosław Jurewicz (Mazowiecka Chorągiew Harcerzy)",
    "hm. Krzysztof Jabłoński (Małopolska Chorągiew Harcerzy)",
    "hm. Michał Kruk (Małopolska Chorągiew Harcerzy)",
    "hm. Michał Dąbrowski (Północno-Zachodnia Chorągiew Harcerzy)",
    "hm. Jan Rogaliński (Wielkopolska Chorągiew Harcerzy)",
    "hm. Adam Kralisz (Łódzka Chorągiew Harcerzy)",
    "hm. Lech Pastwa (Podkarpacka Chorągiew Harcerzy)",
    "hm. Jakub Deląg (Małopolska Chorągiew Harcerzy)",
    "hm. Krzysztof Ulrich (Lubelska Chorągiew Harcerzy)",
    "hm. Szymon Zamorski (Północno-Zachodnia Chorągiew Harcerzy)",
    "phm. Bartosz Kopeć (Mazowiecka Chorągiew Harcerzy)",
    "phm. Bartłomiej Skopek (Podkarpacka Chorągiew Harcerzy)",
    "phm. Maksymilian Gosztyła (Małopolska Chorągiew Harcerzy)",
    "phm. Jakub Wójtowicz (Małopolska Chorągiew Harcerzy)",
    "hm. Adrian Baranski (Pomorska Chorągiew Harcerzy)",
    "hm. Jan Michna (Mazowiecka Chorągiew Harcerzy)",
  ],
};

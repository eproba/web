import { guideposts, hr, text } from "../../blocks";
import type { Page } from "../../types";

export const intellect: Page = {
  slug: "guideposts/intellect",
  chapter: "guideposts",
  title: "Rozum i intelekt",
  description:
    "Nauka, logiczne myślenie, krytycyzm, światopogląd i ciekawość świata.",
  icon: "brain",
  intro: [
    text(
      `Spośród wszystkich stworzeń człowieka charakteryzuje to, że ma wolność i rozum. To rozum pozwala nam odkrywać prawdę, podejmować moralne decyzje, pracować nad sobą czy wielbić Boga. Poważamy ludzi roztropnych, wnikliwych, potrafiących szukać odpowiedzi na złożone problemy. Sami możemy i powinniśmy tacy się stać! Dlatego przykładamy wielką wagę do rozwoju intelektualnego – by sobie i innym służyć rozwagą i mądrymi decyzjami.`,
    ),
  ],
  sections: [
    {
      title: "Uczę się metodycznie i regularnie",
      blocks: [
        guideposts(
          "Mam stałe pory w ciągu dnia i tygodnia, kiedy regularnie się uczę (nie tylko do sprawdzianów).",
          "Potrafię zaplanować swoją naukę i zrealizować ten plan.",
          "Czytam książki zgodnie z ułożonym przeze mnie planem.",
        ),
      ],
    },
    {
      title: "Szkoła i nauka są dla mnie ważne",
      description:
        "Przykładam się do swoich obowiązków szkolnych, korzystam z szans, które daje mi szkoła, uczestniczę w życiu szkolnym.",
      blocks: [
        guideposts(
          "Wybrałem przedmioty szkolne, na których się szczególnie koncentruję i w których wychodzę poza minimum szkolne (np. startuję w konkursach z tych przedmiotów, stawiam sobie wyższe cele dotyczące ocen, biorę udział w olimpiadach, zdobywam certyfikaty).",
          "Potrafię poprawić oceny z przedmiotu, z którego jestem słaby.",
          "Uczestniczę w życiu szkolnym (np. biorę udział w projektach szkolnych i kołach zainteresowań, jestem częścią samorządu szkolnego).",
        ),
      ],
    },
    {
      title: "Myślę logicznie",
      description:
        "Staram się wyciągać wnioski, bazując na logicznych związkach między przesłankami rozumowania, a nie głównie na intuicji i odczuciach.",
      blocks: [
        guideposts(
          "Potrafię napisać tekst, artykuł lub zrobić prezentację, w których przedstawiam swoją tezę i bronię jej argumentami.",
          hr(
            "Potrafię rozbić argument na przesłanki, przeanalizować związki logiczne pomiędzy nimi i w ten sposób określić jego prawdziwość.",
          ),
          hr(
            "Znam najczęstsze błędy w argumentacji (np. błąd odwróconej implikacji, argumentum ad ignorantiam, zwalczanie chochoła, błędne koło, mylenie przyczynowości z korelacją, fałszywa dychotomia).",
          ),
        ),
      ],
    },
    {
      title: "Zachowuję krytycyzm i pokorę intelektualną",
      description:
        "Badam argumenty swoje oraz innych, nie odrzucam ani nie akceptuję poglądów bez zrozumienia ich podstaw.",
      blocks: [
        guideposts(
          "Potrafię poprowadzić dyskusję lub przeprowadzić burzę mózgów (zgodnie z metodyką jej prowadzenia).",
          "Potrafię poszukiwać potrzebnych mi informacji, korzystając ze zróżnicowanych źródeł.",
          "Potrafię zweryfikować, czy jakaś informacja jest prawdziwa czy fałszywa (*fake news, deep fake*).",
          hr("Potrafię w debacie bronić tezy, z którą się nie zgadzam."),
        ),
      ],
    },
    {
      title: "Kształtuję swój światopogląd",
      description:
        "Zapoznaję się z różnymi światopoglądami i koncepcjami społeczno-gospodarczymi oraz potrafię je ocenić na bazie argumentów.",
      blocks: [
        guideposts(
          "Potrafię zgłębić (np. przez przeczytanie książki) wybraną doktrynę społeczną (np. katolicką naukę społeczną, liberalizm, republikanizm, socjalizm) lub kwestię społeczną (np. problem migracji, sprawiedliwości społecznej, zasady pomocniczości, globalnych przepływów kapitału, aborcji).",
          hr(
            "Potrafię nawiązywać relacje z ludźmi o poglądach sprzecznych z moimi lub będących w sytuacjach życiowych zupełnie innych niż moja.",
            "Sprawdź również Drogowskazy z obszaru [„Bóg, wiara i duchowość”](/vademecum/guideposts/faith).",
          ),
        ),
      ],
    },
    {
      title: "Jestem dociekliwy i ciekawy świata",
      blocks: [
        guideposts(
          "Mam potrzebę i wolę poznawania nowych rzeczy dogłębnie, a nie jedynie powierzchownie.",
          "Wycieczki po Polsce i wyjazdy za granicę wykorzystuję do zaplanowanego poznania nowych rejonów, ludzi, zwyczajów itp., a nie wyłącznie do rozrywki i odpoczynku.",
          "Umiem zadawać trafne pytania: przeprowadzić wywiad z ciekawą osobą lub przeprowadzić na potrzeby projektu badanie opinii (np. ankietę) na dany temat.",
          "Otwieram się na dziedziny wiedzy, którymi się na co dzień nie interesuję, ale które mają obecnie znaczenie dla mojego życia rodzinnego, zawodowego lub społecznego.",
          hr(
            "Potrafię odnaleźć i przeczytać artykuł naukowy dotyczący tematu, który mnie interesuje, oraz wziąć udział w wydarzeniu akademickim o takiej tematyce.",
          ),
        ),
      ],
    },
  ],
};

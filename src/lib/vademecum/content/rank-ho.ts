import { facts, important, note, text } from "../blocks";
import type { Page } from "../types";

export const rankHo: Page = {
  slug: "ho",
  chapter: "ho",
  title: "Harcerz orli",
  description:
    "Sylwetka harcerza orlego, warunki zdobycia stopnia, wymagania i wytyczne do zadań indywidualnych.",
  icon: "award",
  sections: [
    {
      id: "sylwetka",
      title: "Sylwetka harcerza orlego",
      blocks: [
        text(`
          Harcerz orli mierzy wysoko i wyrasta ponad przeciętność – orla jest jego lotów potęga! Poszukuje i sprawdza, odważnie próbuje nowych rzeczy. Stara się na nowo, w dojrzały sposób, zrozumieć swoje powinności wynikające z Prawa Harcerskiego, Dekalogu i Przykazania Miłości. Stara się swoim przykładem oddziaływać na otoczenie. Rozwija kompetencje przydatne w aktywnym życiu społecznym i buduje własne opinie na temat otaczającego go świata. Jest wrażliwy, potrafi stanąć po stronie słabszego i pokrzywdzonego. Ma własne pole służby, którą pełni z oddaniem, systematycznie i rzetelnie. Wprawia się w planowaniu swojego rozwoju i konsekwentnie zmierza do postawionych sobie celów.
        `),
      ],
    },
    {
      id: "jak-zdobyc",
      title: "Jak zdobyć HO?",
      blocks: [
        facts(
          ["Wiek zdobywania stopnia", "15–18 lat"],
          [
            "Warunki zdobycia stopnia",
            `
              1. Ułóż i wykonaj zadania w ramach próby indywidualnej.
              2. Wykaż, że spełniasz [wymagania na stopień harcerza orlego](/vademecum/ho#wymagania).
              3. Bierz aktywny udział w życiu drużyny w okresie zdobywania stopnia.
              4. Spełnij dodatkowe wymagania obowiązujące w środowisku.*
            `,
          ],
          ["Czas na wykonanie próby indywidualnej", "do 10 miesięcy"],
          ["Proponowana liczba zadań", "4–6"],
        ),
        text(`
          W Vademecum znajdziesz opis [rytmu próby indywidualnej](/vademecum/trial/rhythm), opis, czym jest [kapituła stopnia](/vademecum/trial/board), informacje na temat [pracy z opiekunem](/vademecum/trial/mentor) oraz [poradnik dot. wyznaczania zadań indywidualnych](/vademecum/trial/tasks) w próbie. Przeczytaj koniecznie rozdział „Układanie próby indywidualnej na stopnie HO i HR”.
        `),
        note(`
          \\* Elementem zdobycia stopnia HO, zgodnie ze zwyczajem przyjętym w środowisku, może być np. zaliczenie próby końcowej. Dodatkowe elementy w zdobywaniu stopnia ustala kapituła lub wprowadza je drużynowy.
        `),
      ],
    },
    {
      id: "wymagania",
      title: "Wymagania na HO",
      blocks: [
        text(`
          Najlepiej, abyś wymagania realizował w praktyce w ramach pracy drużyny – podczas zbiórek i wyjazdów. Jest to zestaw wiedzy i umiejętności, który potrzebny jest każdemu harcerzowi orlemu do pełnego uczestnictwa w harcerskiej wędrówce – podobnie jak sprawności i wiedza harcerska potrzebne są młodzikom, wywiadowcom i ćwikom do leśnego harcowania.

          ### Wędrowanie

          Przed przyznaniem stopnia harcerza orlego harcerz wykaże, że spełnia min. dwa wybrane wymagania:

          - Ma umiejętności niezbędne do wzięcia udziału w wybranej specjalistycznej formie kilkudniowej wędrówki (np. rowerowej, kajakowej, górskiej, wspinaczkowej, żeglarskiej, narciarskiej).
          - Umie zorganizować sobie nocleg w bardzo trudnych warunkach (może to być np. jama śnieżna, legowisko na drzewie, szałas w ulewie, nocleg w hamaku poza sezonem).
          - Umie zaplanować i zorganizować jeden z elementów kilkudniowej wędrówki (np. noclegi, wyżywienie, trasa).

          ### Praca nad sobą

          Przed przyznaniem stopnia harcerza orlego harcerz wykaże, że spełnia min. dwa wybrane wymagania:

          - Potrafi stosować wybraną formę zarządzania czasem.
          - Umie skutecznie wypracować w sobie pozytywny nawyk.
          - Zna i stosuje metody dbania o higienę cyfrową.

          ### Miejsce w społeczeństwie

          Przed przyznaniem stopnia harcerza orlego harcerz wykaże, że spełnia min. dwa wybrane wymagania:

          - Potrafi wykorzystywać w praktyce znajomość języka obcego.
          - Zna założenia programowe największych partii politycznych w kraju. Potrafi omówić główne ugrupowania i postacie w lokalnym samorządzie.
          - Potrafi wziąć aktywny udział w debacie zgodnie z jej regułami (np. w debacie oksfordzkiej, zebraniu wyborczym, debacie wyborczej).
          - Umie wygłosić krótkie (3–5-minutowe) przemówienie popierające jakąś tezę, stosując wybrane zabiegi retoryczne i odnosząc się do argumentacji za tezą przeciwną.
          - Umie ocenić wiarygodność informacji medialnej oraz dotrzeć do jej pierwotnego źródła. Zna kilka najczęściej popełnianych błędów poznawczych i popularne techniki manipulacyjne.
          - Potrafi wykonać pracę budowlaną lub remontową z użyciem elektronarzędzi (np. wymiana syfonu, układanie płytek, szpachlowanie, stolarka ogrodowa, ścianka z płyt g-k, skrzynia).
        `),
        important(`
          1. Na spełnienie wymagań masz czas do końca zdobywania stopnia HO. Możesz je również spełnić, zanim ułożysz zadania w ramach próby indywidualnej oraz uwzględnić te spełnione już wcześniej np. w czasie zdobywania ćwika.
          2. Wymagania możesz spełnić działaniami, które mają charakter zespołowy (np. realizowane są w ramach pracy drużyny lub zajęć szkolnych).
          3. Jeżeli spełnienie wymagań nie jest możliwe w ramach działań i zbiórek drużyny, możesz je również połączyć z zadaniami w ramach Próby Indywidualnej. O tym więcej w [FAQ](/vademecum/trial/faq).
        `),
      ],
    },
    {
      id: "wytyczne",
      title: "Wytyczne do zadań indywidualnych",
      blocks: [
        text(`
          Próba indywidualna na stopień harcerza orlego powinna składać się z 4-6 zadań, wykonanych w ciągu 10 miesięcy. Zdobywając HO, uwzględnij służbę i wyczyn. Szczegółowe wskazówki dotyczące układania zadań znajdziesz w części: [„Drogowskazy”](/vademecum/guideposts).

          ### Służba

          W ramach jednego z zadań indywidualnych podejmie się służby – zgodnie z ustaleniami z drużynowym lub kapitułą stopnia.

          Wskazówki dotyczące tego, jak powinna wyglądać ta służba, znajdziesz w części: „Drogowskazy” – [„Służba”](/vademecum/guideposts/service#harcerz-orli).

          ### Wyczyn

          W ramach jednego z zadań indywidualnych odbędzie wyczyn – zaproponowany przez siebie, zatwierdzony przez drużynowego i przeprowadzany zgodnie ze zwyczajem przyjętym w drużynie lub kapitule.
        `),
      ],
    },
  ],
};

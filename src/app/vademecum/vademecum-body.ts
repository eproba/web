export const VADEMECUM_BODY = `
<a id="reportBtn" class="report-btn" href="mailto:lech.pastwa@zhr.pl" aria-label="Zgłoś poprawkę do tego akapitu"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>Zgłoś poprawkę</a>

<div class="scrim" id="scrim"></div>

<div class="shell">

  <div class="app-top">
    <button class="icon-btn" id="openSidebar" aria-label="Otwórz spis treści">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
    </button>
    <span class="mono" id="appTopTitle" style="font-size:.8rem;color:var(--vad-ink-muted)">Droga Wędrownika</span>
  </div>

  <aside class="sidebar" id="sidebar">
    <a class="brand" href="#" data-page="start" data-crumb-title="Wstęp" aria-label="Vademecum – strona główna">
      <svg class="mark" width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 2C10 6 7 8 7 12.5C7 15 9 17 12 17C15 17 17 15 17 12.5C17 8 14 6 12 2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
        <path d="M12 17V21M12 21L7 19M12 21L17 19M12 21L5 22M12 21L19 22" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      <div>
        <h1>Vademecum</h1>
        <p>Próby indywidualne · HO / HR</p>
      </div>
    </a>

    <label class="search">
      <span class="visually-hidden">Szukaj w drogowskazach</span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>
      <input id="searchInput" type="text" placeholder="Szukaj drogowskazu…" autocomplete="off">
      </label>

    <nav class="tree" aria-label="Spis treści">
      <a href="#" data-page="wedrownik" data-crumb-title="Droga Wędrownika"><span class="n">01</span> Droga Wędrownika</a>

      <details open>
        <summary><span class="n">02</span> Układanie próby
          <svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
        </summary>
        <div class="sub">
          <a href="#" data-page="proba-opiekun" data-crumb-title="Opiekun próby">Opiekun próby</a>
          <a href="#" data-page="proba-kapitula" data-crumb-title="Kapituła">Kapituła</a>
          <a href="#" data-page="proba-rytm" data-crumb-title="Rytm próby indywidualnej">Rytm próby</a>
          <a href="#" data-page="proba-zadanie" data-crumb-title="Jak ułożyć zadanie?">Jak ułożyć zadanie?</a>
          <a href="#" data-page="proba-obszary" data-crumb-title="Nad którymi obszarami pracować?">Które obszary wybrać?</a>
          <a href="#" data-page="proba-faq" data-crumb-title="FAQ">FAQ</a>
        </div>
      </details>

      <details open>
        <summary><span class="n">03</span> Drogowskazy
          <svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
        </summary>
        <div class="sub">
          <a href="#" data-page="obszar-bog" data-crumb-title="Bóg, wiara i duchowość"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 2c1 3 3 4 3 7a3 3 0 11-6 0c0-3 2-4 3-7z"/></svg>Bóg, wiara i duchowość</a>
          <a href="#" data-page="obszar-charakter" data-crumb-title="Siła charakteru"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3l7 3v5c0 5-3 8-7 10-4-2-7-5-7-10V6l7-3z"/></svg>Siła charakteru</a>
          <a href="#" data-page="obszar-intelekt" data-crumb-title="Rozum i intelekt"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 5h6a2 2 0 012 2v13a1.5 1.5 0 00-1.5-1.5H4V5zM20 5h-6a2 2 0 00-2 2v13a1.5 1.5 0 011.5-1.5H20V5z"/></svg>Rozum i intelekt</a>
          <a href="#" data-page="obszar-zdrowie" data-crumb-title="Zdrowie i sprawność fizyczna"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 21s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 11c0 5.6-7 10-7 10z" transform="scale(.9) translate(1.2 1)"/><path d="M12 6v4M9 9l6 0"/></svg>Zdrowie i sprawność</a>
          <a href="#" data-page="obszar-sluzba" data-crumb-title="Służba"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M8 12a3 3 0 106 0 3 3 0 00-6 0z"/><path d="M4 12c1-4 4-6 8-6s7 2 8 6c-1 4-4 6-8 6s-7-2-8-6z"/></svg>Służba</a>
          <a href="#" data-page="obszar-ojczyzny" data-crumb-title="Małe ojczyzny, Polska i świat"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><circle cx="12" cy="12" r="8"/><path d="M12 4v16M4 12h16"/></svg>Małe ojczyzny i Polska</a>
          <a href="#" data-page="obszar-rodzina" data-crumb-title="Rodzina i wybór drogi życiowej"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 21V9l8-5 8 5v12"/><path d="M9 21v-6h6v6"/></svg>Rodzina i droga życiowa</a>
          <a href="#" data-page="obszar-pasje" data-crumb-title="Pasje i umiejętności"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4L12 3z"/></svg>Pasje i umiejętności</a>
          <a href="#" data-page="obszar-kultura" data-crumb-title="Kultura i komunikacja"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M4 4h9l7 7v9H4z"/><path d="M13 4v7h7"/></svg>Kultura i komunikacja</a>
          <a href="#" data-page="obszar-przyroda" data-crumb-title="Przyroda i puszczaństwo"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M20 4c-9 0-16 5-16 13 8 0 13-4 15-9"/><path d="M4 20c2-4 5-7 5-11"/></svg>Przyroda i puszczaństwo</a>
        </div>
      </details>
    </nav>

    <div class="sidebar-foot">
      <a class="pdf-link" href="https://drive.google.com/file/d/1Q4sVe_5xGJZ3iNGZBo4oypMZZAYHrCft/view?usp=sharing" target="_blank" rel="noopener noreferrer">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 3v12m0 0l-4-4m4 4l4-4"/><path d="M4 17v2a2 2 0 002 2h12a2 2 0 002-2v-2"/></svg>
        Pobierz pełne wydanie (PDF)
      </a>
    </div>
  </aside>

  <main>
    <div class="topbar">
      <div class="topbar-right">
        <div class="mode-switch" id="modeSwitch">
          <button data-mode="ho" class="active">Harcerz Orli</button>
          <button data-mode="hr">Harcerz Rzeczypospolitej</button>
        </div>
        <div class="counter-chip">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M20 6L9 17l-5-5"/></svg>
          <span id="counterNum">0</span> dodane
        </div>
      </div>
    </div>

    <article>

      <section class="page active" id="page-start">
        <span class="eyebrow"><span class="dot"></span>Wstęp</span>
        <h1 class="title">Wędrowniku!</h1>

        <div class="lede">
          <p>Wędrowniku, nie wiem, czy też tak masz jak ja – ale kiedy zaczynasz coś naprawdę ważnego, z jednej strony czujesz ekscytację, a z drugiej gdzieś z tyłu głowy pojawia się myśl: „to nie będzie łatwe”. Skoro sięgasz po to Vademecum, to pewnie stoisz właśnie przed wyzwaniem zdobycia HO albo HR. Dla mnie to była świetna przygoda – wymagająca, momentami niewygodna, ale bardzo konkretna i zostająca na całe życie.</p>
          <p>Praca nad sobą przypomina pierwsze wyjście w góry. Na dole jest wizja – szczyt, widoki, satysfakcja. Im wyżej, tym trudniej: zimniej, bardziej pod wiatr, nogi bolą, każdy krok kosztuje więcej. W pewnym momencie pojawia się pokusa, żeby zawrócić – wrócić do ciepła, wygody, do tego, co znane. Tylko że… komfort nigdy nie był naszą opcją. I dobrze, bo wszystko, co naprawdę wartościowe, przychodzi z trudem.</p>
          <p>Pomyśl teraz o swoim życiu. Jakie „szczyty” chcesz zdobyć? Jakie cnoty wypracować, z jakimi słabościami się zmierzyć? Warto mierzyć wysoko – bo z czasem wcale nie robi się łatwiej. Ale właśnie ta droga daje coś realnego: życie sensowne, radosne, oparte na służbie i odpowiedzialności.</p>
          <p>W tym Vademecum znajdziesz konkret: jak pracować nad sobą przez stopnie, jak wygląda ich zdobywanie i jak dobrze stawiać sobie zadania. Są też wskazówki, co rozwijać – umiejętności, nawyki, doświadczenia.</p>
          <p>Mierz wysoko. Może spotkamy się kiedyś na szczycie.</p>
          <p style="text-align:right;margin:1.2rem 0 0"><strong>HR Marcin Mucha (hm.)</strong><br>Roztropny Niedźwiedź<br>Naczelnik Harcerzy</p>
        </div>

        <div class="pager">
          <span></span>
          <a class="next" data-page="wedrownik" data-crumb-title="Droga Wędrownika">
            <span class="lbl">Dalej</span>
            <span class="ttl">Droga Wędrownika →</span>
          </a>
        </div>
      </section>
      <section class="page" id="page-wedrownik">
        <span class="eyebrow"><span class="dot"></span>01 · Rozdział</span>
        <h1 class="title">Droga Wędrownika</h1>

        <section class="track" id="w-symbolika">
          <h2>Symbolika Watry Wędrowniczej</h2>
          <p>Harcerz orli i harcerz Rzeczypospolitej to stopnie zdobywane przez wędrowników. Niezależnie od tego, w jakiej drużynie teraz jesteś, zdobywając je, podążasz wędrowniczym szlakiem, którego treść i cel wskazuje symbol Watry Wędrowniczej – oznaka ruchu wędrowników. Przedstawia on ognisko ułożone sposobem skautowym na długotrwałe palenie, umieszczone na zielonym tle. Znak Watry symbolizuje wędrówkę na szlaku i w codziennym życiu.</p>

          <p>Trzy polana symbolizują trzy główne pola pracy wędrowniczej. Jak drewno dokładane do ogniska, są paliwem do utrzymania symbolicznych płomieni – celów pracy wędrownika. Te pola to:</p>
          <ul class="wskazy plain">
            <li><span class="glyph">●</span><span class="txt"><strong>praca nad sobą</strong>,</span></li>
            <li><span class="glyph">●</span><span class="txt"><strong>szukanie swojego miejsca w społeczeństwie</strong>,</span></li>
            <li><span class="glyph">●</span><span class="txt"><strong>służba</strong>.</span></li>
          </ul>

          <p>Trzy płomienie symbolizują cele pracy wędrownika. W kolejności od najmniejszego płomienia są to:</p>
          <ul class="wskazy plain">
            <li><span class="glyph">●</span><span class="txt"><strong>siła ciała</strong>,</span></li>
            <li><span class="glyph">●</span><span class="txt"><strong>siła umysłu</strong>,</span></li>
            <li><span class="glyph">●</span><span class="txt">oraz najważniejsza – <strong>siła ducha</strong>.</span></li>
          </ul>

          <div class="watra-card">
            <p class="watra-caption" style="margin:0 0 1.1rem;padding:0;border:0;"><strong>WATRA</strong> to znak życia harcerskiego na wędrówce i w codzienności. Ułożona jest w gwiazdę sposobem skautowym na długotrwałe palenie.</p>
            <div class="watra-board">
              <div class="watra-wrap">
                <div class="watra-stage">
                  <div class="wf-tile"><img src="/vademecum/watra.webp" alt="Watra Wędrownicza" width="2000" height="2000"></div>
                  <svg class="wf-arrows" viewBox="0 0 78 70.86" preserveAspectRatio="none" aria-hidden="true">
                    <defs><marker id="wf-head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M1.5 1.5 L8.5 5 L1.5 8.5" fill="none" style="stroke:#efeadb" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></marker></defs>
                    <path d="M22.6 2.23 C24.8 6.33 32.5 7.23 41 7.23" fill="none" style="stroke:#efeadb" stroke-width="0.32" stroke-linecap="round" marker-end="url(#wf-head)"/><path d="M22.6 13.86 C24.8 17.96 32.5 18.86 41 18.86" fill="none" style="stroke:#efeadb" stroke-width="0.32" stroke-linecap="round" marker-end="url(#wf-head)"/><path d="M22.6 23.74 C24.8 27.84 32.5 28.74 41 28.74" fill="none" style="stroke:#efeadb" stroke-width="0.32" stroke-linecap="round" marker-end="url(#wf-head)"/><path d="M21.1 47.54 C25.1 47.54 25.7 45.84 29.7 44.24" fill="none" style="stroke:#efeadb" stroke-width="0.32" stroke-linecap="round" marker-end="url(#wf-head)"/><path d="M28 60.52 C30 60.52 31.31 58.62 32.81 56.42" fill="none" style="stroke:#efeadb" stroke-width="0.32" stroke-linecap="round" marker-end="url(#wf-head)"/><path d="M62.4 36.2 C59 38.5 56.59 40.88 53.59 42.88" fill="none" style="stroke:#efeadb" stroke-width="0.32" stroke-linecap="round" marker-end="url(#wf-head)"/><path d="M66.6 66.49 C70.6 66.49 73.16 59.3 72.16 51.3" fill="none" style="stroke:#efeadb" stroke-width="0.32" stroke-linecap="round" marker-end="url(#wf-head)"/>
                  </svg>
                  <p class="wf-lbl wf-lbl--r" style="right:71.79%;top:0.07%">siła ducha</p>
                  <p class="wf-lbl wf-lbl--r" style="right:71.79%;top:16.48%">siła umysłu</p>
                  <p class="wf-lbl wf-lbl--r" style="right:71.79%;top:30.43%">siła ciała</p>
                  <p class="wf-lbl wf-lbl--r" style="right:73.72%;top:64.00%">służba</p>
                  <p class="wf-lbl wf-lbl--r" style="right:64.87%;top:82.33%">praca nad sobą</p>
                  <p class="wf-lbl" style="left:80.77%;top:48.01%">wyczyn</p>
                  <p class="wf-lbl wf-lbl--r" style="right:15.38%;top:87.67%">szukanie miejsca<br>w społeczeństwie</p>
                </div>
              </div>
            </div>
          </div>

          <p>Znak watry haftuje się na zielonym tle, co ma przypominać, że wszystko realizuje się na tle harcerskiego życia – wędrówce przez świat. Polana i płomienie watry połączone są żarem symbolizującym realizację pracy wędrowniczej poprzez <strong>wyczyn</strong>.</p>

          <p>Wędrownik poznaje specyfikę pracy wędrowniczej podczas próby na naramiennik, realizowanej w drużynie wędrowników. Jeśli masz taką możliwość, przed otwarciem próby indywidualnej na HO podejdź do próby na naramiennik – szczegóły znajdziesz w Regulaminie Naramiennika Wędrowniczego Organizacji Harcerzy ZHR.</p>
        </section>

        <div class="pager">
          <a data-page="start" data-crumb-title="Wstęp">
            <span class="lbl">Wstecz</span>
            <span class="ttl">← Wędrowniku!</span>
          </a>
          <a class="next" data-page="proba-opiekun" data-crumb-title="Opiekun próby">
            <span class="lbl">Dalej</span>
            <span class="ttl">Opiekun próby →</span>
          </a>
        </div>
      </section>
      <section class="page" id="page-proba-opiekun">
        <span class="eyebrow"><span class="dot"></span>02 · Układanie próby</span>
        <h1 class="title">Opiekun próby</h1>

          <p><em><strong>>Opiekun to Twój harcerski starszy brat, który będzie Ci towarzyszył w realizacji próby – od początku aż do jej końca. Przed opiekunem stoją 3 zadania:</strong></em></p>
          <div class="stepper">
            <div class="step">
              <div class="dot">1</div>
              <div class="body">
                <h3>Pomoże lepiej poznać siebie</h3>
                <p>Każdy z nas uczy się samooceny i autorefleksji i szczególnie w pierwszych próbach trudno jest zachować w tym właściwą równowagę. Mamy tendencję do przesadnego krytycyzmu wobec siebie, a niekiedy wręcz przeciwnie – pobłażamy sobie. Opiekun pomoże Ci spojrzeć na siebie z pewnego dystansu i zadba, aby „lustro”, w którym będziesz się przyglądał, nie zniekształciło Twojego obrazu. Jednak tylko opiekun, który Cię dobrze pozna, będzie w stanie Cię wesprzeć – dlatego bądź z nim szczery. Nie próbuj przedstawiać siebie lepszym niż jesteś ani nie koncentruj się wyłącznie na swych słabościach.</p>
                <p>Pamiętaj – w przyszłości też możesz zostać opiekunem próby na stopień młodszego brata – zwróć wtedy szczególną uwagę, aby dobrze poznać harcerza, który obdarzył Cię swoim zaufaniem.</p>
              </div>
            </div>
            <div class="step">
              <div class="dot">2</div>
              <div class="body">
                <h3>Doradzi przy wyborze zadań</h3>
                <p>Opiekun doradzi Ci przy wyborze zadań do próby indywidualnej. Pomoże też ocenić, czy próba jest dobrze skomponowana, realna, a jednocześnie ambitna. Opiekun będzie Ci również towarzyszył w czasie otwierania próby indywidualnej przed kapitułą.</p>
              </div>
            </div>
            <div class="step">
              <div class="dot">3</div>
              <div class="body">
                <h3>Wspiera w realizacji zadań</h3>
                <p>Po otwarciu próby indywidualnej będzie wspierał Cię w realizacji zadań, a jeśli zajdzie taka potrzeba, pomoże podjąć decyzję o zmianie zadania, które się zdezaktualizowało.</p>
              </div>
            </div>
          </div>

          <p>Żeby sprostać tym zadaniom, na opiekuna powinieneś wybrać osobę:</p>
          <ul class="wskazy plain">
            <li><span class="glyph">●</span><span class="txt">której jesteś gotów zaufać,</span></li>
            <li><span class="glyph">●</span><span class="txt">która dobrze Cię zna,</span></li>
            <li><span class="glyph">●</span><span class="txt">która ma doświadczenie przy układaniu prób indywidualnych,</span></li>
            <li><span class="glyph">●</span><span class="txt">która jest mądra i dojrzała,</span></li>
            <li><span class="glyph">●</span><span class="txt">która jest dla Ciebie przykładem harcerskiej postawy.</span></li>
          </ul>
          <p>Oczywiście nie zawsze uda się znaleźć osobę, która będzie spełniała wszystkie powyższe kryteria. Będziesz musiał wtedy zdecydować, kogo wybrać. Pamiętaj jednak, że:</p>
          <div class="callout callout--note">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 9v4m0 4h.01M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L14.7 3.86a2 2 0 00-3.4 0z"/></svg>
            <div>jeśli chcesz zdobywać HO, to Twój opiekun musi mieć stopień HO, ale najlepiej, aby miał już otwartą próbę indywidualną na stopień HR-a. Jeśli chcesz zdobywać HR–a, to Twój opiekun musi mieć stopień HR-a.</div>
          </div>

        <div class="pager">
          <a data-page="wedrownik" data-crumb-title="Droga Wędrownika">
            <span class="lbl">Wstecz</span>
            <span class="ttl">← Droga Wędrownika</span>
          </a>
          <a class="next" data-page="proba-kapitula" data-crumb-title="Kapituła">
            <span class="lbl">Dalej</span>
            <span class="ttl">Kapituła →</span>
          </a>
        </div>
      </section>

      <section class="page" id="page-proba-kapitula">
        <span class="eyebrow"><span class="dot"></span>02 · Układanie próby</span>
        <h1 class="title">Kapituła</h1>

          <p>Z układaniem próby indywidualnej nie jesteście z opiekunem pozostawieni sami sobie. W dobrze działających drużynie lub środowisku w zdobywaniu stopni harcerza orlego i harcerza Rzeczypospolitej pomaga kapituła.</p>
          <p>Kapituła składa się z co najmniej trzech harcerzy, którzy mają zdobywany przez Ciebie stopień. Kapitule przewodniczy instruktor, a jej członkiem jest najprawdopodobniej również Twój drużynowy. Kapituła ma dwa zadania.</p>

          <div class="kap-point">
            <div class="lbl"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>Po pierwsze: zatwierdza kształt Twoich zadań indywidualnych.</div>
            <p>Wybrane przez Ciebie i opiekuna zadania indywidualne mogą się Wam bardzo podobać, ale warto, żeby ktoś jeszcze przyjrzał im się „z boku”. Członkowie kapituły już przeszli przez swoje zmagania ze stopniem, który właśnie zdobywasz i mogą podzielić się swoim doświadczeniem. Jej członkiem może być np. dawny drużynowy, który już założył rodzinę, albo były wędrownik, który właśnie kończy studia. Poza tym, co trzy głowy to nie jedna. Warto skorzystać z mądrości kapituły i w swojej próbie uwzględnić jej propozycje.</p>
          </div>

          <div class="kap-point">
            <div class="lbl"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>Po drugie: kapituła ocenia i zatwierdza wykonanie zadań.</div>
            <p>Próba jest tyle warta, na ile dzięki niej staniesz się lepszym człowiekiem. Jednakże aby móc nazwać ją próbą, to ktoś musi ocenić, czy ją przeszedłeś. Samoocena własnych dokonań to bardzo trudna sztuka – w niektórych aspektach bywamy dla siebie pobłażliwi, w innych jesteśmy wobec siebie nadmiernie surowi. Druhowie z kapituły przychodzą tutaj z pomocą. W braterskiej atmosferze wskażą niedociągnięcia i pochwalą wysiłek. Wspólnie stwierdzicie, czy można uznać każde z zadań za wykonane, czy też trzeba je, w całości albo w części, powtórzyć z ewentualnymi zmianami.</p>
          </div>

          <p>Po stwierdzeniu wykonania zadań indywidualnych kapituła wnioskuje do drużynowego (a w wyjątkowych sytuacjach – do hufcowego) o zamknięcie próby na stopień – który zostaje przyznany rozkazem, o ile wszystkie dodatkowe warunki zostały spełnione.</p>

        <div class="pager">
          <a data-page="proba-opiekun" data-crumb-title="Opiekun próby">
            <span class="lbl">Wstecz</span>
            <span class="ttl">← Opiekun próby</span>
          </a>
          <a class="next" data-page="proba-rytm" data-crumb-title="Rytm próby indywidualnej">
            <span class="lbl">Dalej</span>
            <span class="ttl">Rytm próby indywidualnej →</span>
          </a>
        </div>
      </section>

      <section class="page" id="page-proba-rytm">
        <span class="eyebrow"><span class="dot"></span>02 · Układanie próby</span>
        <h1 class="title">Rytm próby indywidualnej</h1>

          <p>Poniższy schemat przedstawia standardowy sposób prowadzenia próby na HO/HR, z podziałem na etapy. Jeśli zachowacie poniższe wskazówki, próba indywidualna będzie dynamiczna i zwarta.</p>

          <div class="stepper">
            <div class="step">
              <div class="dot">1</div>
              <div class="body">
                <h3>Spotkanie 1 – autorefleksja</h3>
                <p>Celem pierwszego spotkania z opiekunem jest lepsze poznanie samego siebie. Dodatkowo opiekun będzie miał okazję lepiej poznać Ciebie. Nie przygotowuj propozycji zadań na to pierwsze spotkanie – będzie na to czas w kolejnym kroku. W czasie braterskiej i szczerej rozmowy powinieneś zrobić trzy rzeczy.</p>
                <p><strong>Po pierwsze</strong> – w rozmowie z opiekunem spróbuj odpowiedzieć sobie na pytania:</p>
                <ul class="wskazy plain">
                  <li><span class="glyph">●</span><span class="txt">Jakie są Twoje wady i zalety? Wymień po 4.</span></li>
                  <li><span class="glyph">●</span><span class="txt">Jakie masz marzenie na najbliższy rok i na przyszłość (np. co chciałbyś robić za 4 lata)?</span></li>
                  <li><span class="glyph">●</span><span class="txt">Czy jest coś, nad czym chciałbyś popracować?</span></li>
                  <li><span class="glyph">●</span><span class="txt">Jaką Twoją największą zaletę, a jaką wadę wskazaliby Twoi najbliżsi?</span></li>
                  <li><span class="glyph">●</span><span class="txt">Czy któryś punkt Prawa Harcerskiego sprawia Ci szczególny problem?</span></li>
                  <li><span class="glyph">●</span><span class="txt">Jak układają się Twoje relacje z najbliższymi?</span></li>
                </ul>
                <p><strong>Po drugie</strong> – zastanów się, nad którymi sferami swojego życia powinieneś popracować. Wskazówki, które mogą Ci w tym pomóc, znajdziesz niżej.</p>
                <p><strong>Po trzecie</strong> – znajdź w Vademecum wybrane obszary życia i zainspiruj się drogowskazami przy formułowaniu zadań (zobacz: „Obszary w próbach indywidualnych”).</p>
              </div>
            </div>

            <div class="step-gap">1 tydzień</div>

            <div class="step">
              <div class="dot">2</div>
              <div class="body">
                <h3>Spotkanie 2 – propozycje zadań</h3>
                <p>Na drugie spotkanie warto przyjść z propozycjami konkretnych zadań na podstawie wybranych wcześniej obszarów życia i drogowskazów. Wspólnie z opiekunem będziecie mogli je omówić, uszczegółowić lub odrzucić te, które uznacie za słabe. W razie potrzeby wymyślicie nowe propozycje i ustalicie, w jaki sposób można sprawdzić, czy są adekwatne. Po tym spotkaniu rozpocznie się okres przygotowawczy, czyli czas na sprawdzenie, czy zaproponowane zadania są realne do wykonania i odpowiednio dobrane do Twoich potrzeb.</p>
                <div class="callout callout--info">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
                  <div>
                    <b>Przykład</b>
                    <ul>
                      <li>Jeśli zechcesz w ramach próby pojechać na rekolekcje w milczeniu, to w trakcie okresu przygotowawczego powinieneś sprawdzić, w jakich rekolekcjach jesteś w stanie wziąć udział, jak one wyglądają, ile kosztują, w jakich są terminach i lokalizacjach.</li>
                      <li>Jeśli w ramach próby będziesz chciał przez 3 miesiące chodzić na siłownię 2 razy w tygodniu, to w okresie przygotowawczym powinieneś zacząć chodzić na siłownię 2 razy w tygodniu – aby sprawdzić, czy realnie masz takie możliwości czasowe.</li>
                    </ul>
                  </div>
                </div>
                <p>Nie ograniczajcie się przy tym do „typowych”, często wybieranych zadań w Waszym środowisku – to, co było dobre dla Twojego kolegi z drużyny, nie musi być koniecznie dobre dla Ciebie.</p>
                <p><strong>Jeśli istnieje taka potrzeba, możecie spotkać się więcej razy!</strong> Pamiętajcie jednak, aby nie rozciągać przygotowań zbyt długo – między pierwszym spotkaniem a otwarciem próby indywidualnej <strong>nie powinno minąć więcej niż 2 miesiące.</strong></p>
              </div>
            </div>

            <div class="step-gap">okres przygotowawczy · ok. 3 tygodnie</div>

            <div class="step">
              <div class="dot">3</div>
              <div class="body">
                <h3>Decyzja – wybór zadań</h3>
                <p>Wybrane zadania powinny być konkretne i mierzalne. Osoba postronna powinna móc łatwo ocenić, czy zadanie zostało, czy nie zostało wykonane.</p>
                <div class="callout callout--info">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
                  <div>
                    <b>Przykład</b>
                    <div>Załóżmy, że zauważasz potrzebę zadbania o swoje zdrowie i zmienić swój sposób odżywiania. Chociaż <strong><em>„Będę jadł posiłki regularnie”</em></strong> może brzmieć jak konkretne zadanie, to trudno powiedzieć, kiedy będzie można uznać je za wykonane. Co to znaczy regularnie? W tym wypadku konieczne jest dookreślenie:</div>
                    <ul>
                      <li>szczegółowych warunków zadania, np. <strong><em>Będę codziennie jadł śniadanie przed wyjściem do szkoły (do 7:20) i kolejne 4 posiłki maksymalnie co 4 godziny.</em></strong></li>
                      <li>czasu trwania zadania, np. <strong><em>Przez 40 dni z rzędu będę…</em></strong></li>
                    </ul>
                    <div>W ten sposób warunki zadania stają się jasno określone – jeśli przekroczysz ustalony czas, powinieneś zacząć od nowa liczenie 40 dni, a jeśli nie dałeś rady wytrwać 40 dni z rzędu, to zadanie nie zostało wykonane.</div>
                  </div>
                </div>
                <p>Sprawdźcie też, czy wybrane zadania nie kumulują się w czasie. Rzadko udaje się rzetelnie realizować większą liczbę zadań równocześnie. Najlepszym sposobem, by uniknąć takiej kumulacji, jest zaplanowanie konkretnych okresów realizacji poszczególnych zadań – tak, aby się one na siebie nie nakładały i uwzględniały inne zobowiązania (rodzinne, szkolne, harcerskie, spotkania ze znajomymi itp).</p>
                <p><strong>Przykłady</strong></p>
                <ul class="wskazy plain">
                  <li><span class="glyph">●</span><span class="txt">Przygotowując się do koncertu, będę przez 4 tygodnie ćwiczył grę na mandolinie 5 razy w tygodniu po 40 minut (w kwietniu).</span></li>
                  <li><span class="glyph">●</span><span class="txt">Zorganizuję wycieczkę dla całej rodziny pociągiem od Krakowa, zarezerwuję noclegi, przygotuję plan zwiedzania (drugi weekend maja).</span></li>
                </ul>
              </div>
            </div>

            <div class="step-gap">szybko</div>

            <div class="step">
              <div class="dot">4</div>
              <div class="body">
                <h3>Otwarcie próby indywidualnej i jej realizacja</h3>
                <p>Otwieracie próbę indywidualną przed kapitułą/drużynowym i… do dzieła. To jest ten czas, gdy udowadniasz, że potrafisz wykonać zadania i zrealizować cele, które sam sobie obrałeś. Próba indywidualna na HO nie powinna trwać dłużej niż 10 miesięcy. Na HR – nie więcej niż 12 miesięcy.</p>
              </div>
            </div>

            <div class="step optional">
              <div class="dot">•</div>
              <div class="body">
                <h3 style="color:var(--vad-ink-muted)">Spotkanie z opiekunem</h3>
                <p>W czasie próby powinniście się regularnie spotykać z opiekunem, aby omówić Twoje postępy w realizacji zadań. Jeśli w czasie próby razem z opiekunem dojdziecie do przekonania, że jedno z zadań się zdezaktualizowało, to możecie je zmienić – zgłoście się jak najszybciej do kapituły lub drużynowego.</p>
              </div>
            </div>

            <div class="step">
              <div class="dot">5</div>
              <div class="body">
                <h3>Zamknięcie próby indywidualnej i jej podsumowanie</h3>
                <p>Na zamknięcie próby indywidualnej powinieneś przygotować:</p>
                <ul class="wskazy plain">
                  <li><span class="glyph">●</span><span class="txt">materiały prezentujące, jak zrealizowałeś swoje zadania: opisy, zdjęcia, filmiki, plany itp;</span></li>
                  <li><span class="glyph">●</span><span class="txt">podsumowanie zadania – zastanów się, co dała Ci realizacja zadania, czy spełniła swój cel, a jeśli nie – to, co dzisiaj zrobiłbyś inaczej.</span></li>
                </ul>
                <p>Takie podsumowanie jest ważne nie tylko po to, aby zamknąć próbę indywidualną – jest ono także wartościowe dla Ciebie samego, abyś uczył się wyciągać wnioski z własnych działań.</p>
                <div class="callout callout--note">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 9v4m0 4h.01M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L14.7 3.86a2 2 0 00-3.4 0z"/></svg>
                  <div>
                    <b>Uwaga</b>
                    <p style="margin:0 0 .5rem">Pamiętaj, że w przypadku próby na HO poza wykonaniem próby indywidualnej warunkiem zamknięcia stopnia jest spełnianie wymagań.</p>
                    <p style="margin:0">Ponadto kapituła lub drużynowy mogą zaproponować Ci próbę końcową, jednak nie zawsze ma to miejsce.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <div class="pager">
          <a data-page="proba-kapitula" data-crumb-title="Kapituła">
            <span class="lbl">Wstecz</span>
            <span class="ttl">← Kapituła</span>
          </a>
          <a class="next" data-page="proba-zadanie" data-crumb-title="Jak ułożyć zadanie?">
            <span class="lbl">Dalej</span>
            <span class="ttl">Jak ułożyć zadanie? →</span>
          </a>
        </div>
      </section>

      <section class="page" id="page-proba-zadanie">
        <span class="eyebrow"><span class="dot"></span>02 · Układanie próby</span>
        <h1 class="title">Jak ułożyć zadanie?</h1>

          <p>Aby ułatwić Ci układanie zadań, skonstruowaliśmy dalszą część Vademecum zgodnie z poniższym schematem:</p>

          <div class="funnel">
            <div class="funnel-step open">
              <button type="button" class="band" style="width:100%" aria-expanded="true" aria-controls="funnel-panel-1"><span class="num">1</span><span class="lbl">Sylwetka</span><svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
              <div class="fs-panel" id="funnel-panel-1" role="region" aria-label="Sylwetka"><div class="fs-clip"><div class="fs-body">Podstawą jest <strong>sylwetka</strong> zdobywanego stopnia. Zacznij od jej przeanalizowania. Które jej zapisy są dla Ciebie jeszcze wyzwaniem? A które chciałbyś jeszcze w sobie wzmocnić?</div></div></div>
            </div>
            <div class="funnel-step">
              <button type="button" class="band" style="width:85%" aria-expanded="false" aria-controls="funnel-panel-2"><span class="num">2</span><span class="lbl">Obszar życia</span><svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
              <div class="fs-panel" id="funnel-panel-2" role="region" aria-label="Obszar życia"><div class="fs-clip"><div class="fs-body">Na podstawie sylwetek stopni i Prawa Harcerskiego określiliśmy <strong>Obszary życia</strong> – czyli dziedziny, które są ważne w życiu każdego człowieka. Do jakich obszarów odnoszą się zapisy sylwetki, nad którymi chcesz pracować?</div></div></div>
            </div>
            <div class="funnel-step">
              <button type="button" class="band" style="width:70%" aria-expanded="false" aria-controls="funnel-panel-3"><span class="num">3</span><span class="lbl">Postawa</span><svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
              <div class="fs-panel" id="funnel-panel-3" role="region" aria-label="Postawa"><div class="fs-clip"><div class="fs-body">Następnie każdy Obszar uszczegółowiliśmy, tzn. odpowiedzieliśmy sobie na pytanie, nad jakimi <strong>Postawami</strong> z danego Obszaru życia powinien pracować człowiek (wyjątek stanowią obszary Służby i Siły charakteru – podejście do nich opisaliśmy w odpowiednich rozdziałach). Która z nich wymaga Twojej pracy?</div></div></div>
            </div>
            <div class="funnel-step">
              <button type="button" class="band" style="width:55%" aria-expanded="false" aria-controls="funnel-panel-4"><span class="num">4</span><span class="lbl">Drogowskaz</span><svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
              <div class="fs-panel" id="funnel-panel-4" role="region" aria-label="Drogowskaz"><div class="fs-clip"><div class="fs-body">W kolejnym kroku określiliśmy, w jaki konkretny sposób dana postawa może przejawiać się u człowieka. <strong>Drogowskazy</strong> mówią zatem o tym, jaka wiedza, umiejętności, doświadczenie, nawyki czy zachowania mogą Ci pomóc rozwinąć daną Postawę. Część Drogowskazów, przeznaczonych przede wszystkim dla zdobywających HR, wyróżniliśmy symbolem <span class="hr-chip" style="position:static">HR</span>.</div></div></div>
            </div>
            <div class="funnel-step">
              <button type="button" class="band" style="width:40%" aria-expanded="false" aria-controls="funnel-panel-5"><span class="num">5</span><span class="lbl">Zadanie</span><svg class="chev" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg></button>
              <div class="fs-panel" id="funnel-panel-5" role="region" aria-label="Zadanie"><div class="fs-clip"><div class="fs-body">Ostatni krok należy do Ciebie – jeśli z opiekunem stwierdzicie, że chcecie pracować nad daną postawą, to przyjrzyjcie się zaproponowanym Drogowskazom i ułóżcie odpowiednie <strong>Zadanie</strong>. Jedno zadanie może podążać za Drogowskazami z różnych Postaw.</div></div></div>
            </div>
          </div>

          <h3>Przykład</h3>
          <p>Zauważyłeś, że źle Ci idzie w szkole, masz słabe oceny, a w sylwetce harcerza orlego czytasz, że: <em>Harcerz orli mierzy wysoko i wyrasta ponad przeciętność – orla jest jego lotów potęga!</em> oraz <em>Stara się swoim przykładem oddziaływać na otoczenie.</em> Chciałbyś coś z tym zrobić.</p>
          <ol class="steps-num">
            <li>Otwórz Vademecum na stronach opisujących obszar życia <strong>„Rozum i intelekt”</strong>. Zobacz, którą postawę chciałbyś wzmocnić albo która jest Twoją słabą stroną.</li>
            <li>Załóżmy, że będzie to postawa <strong>„Uczę się metodycznie i regularnie”</strong>, ponieważ masz problem z takim sposobem uczenia (a jest on bardzo ważny, aby nauka była efektywna).</li>
            <li>Spójrz na Drogowskazy, które podpowiedzą Ci, co możesz zrobić, aby zacząć uczyć się metodycznie i regularnie. Załóżmy, że chciałbyś wypracować <strong>„stałe pory w ciągu dnia i tygodnia, kiedy uczysz się regularnie (nie tylko pod klasówki)”</strong>.</li>
            <li>Wymyśl zadanie. Przykłady:
              <ul class="wskazy plain">
                <li><span class="glyph">●</span><span class="txt">Przez 2 miesiące będę uczył się w każdy poniedziałek od 18:00 do 20:00 oraz w czwartek od 17:00 do 20:00 (margines błędu – 80%).</span></li>
                <li><span class="glyph">●</span><span class="txt">Przez miesiąc codziennie będę się uczył w swoim pokoju przez 45 minut od godz. 19:00 (margines błędu – 90%).</span></li>
                <li><span class="glyph">●</span><span class="txt">Na koniec roku będę miał ocenę 4 z matematyki.</span></li>
              </ul>
            </li>
          </ol>
          <p>Możesz połączyć w jednym zadaniu pracę nad kilkoma obszarami. Przykładowo, być może nie masz bladego pojęcia o historii Polski (Obszar życia: <strong>„Małe ojczyzny, Polska i świat”</strong> → Postawa <strong>„Znam polską historię i jej wpływ na teraźniejszość”</strong> → Drogowskaz <strong>„Potrafię opisać historię Polski od I rozbioru Polski”</strong>). Możesz wtedy uwzględnić to w tym samym zadaniu, na przykład tak:</p>
          <ul class="wskazy plain">
            <li><span class="glyph">●</span><span class="txt">Przez 2 miesiące będę uczył się historii w każdy poniedziałek od 18:00 do 20:00 oraz w czwartek od 17:00 do 20:00 (margines błędu – 80%).</span></li>
            <li><span class="glyph">●</span><span class="txt">Przez miesiąc codziennie będę się uczył lub czytał podręcznik do historii lub „Dzieje Polski” Andrzeja Nowaka, w swoim stałym miejscu do nauki, przez 45 minut od godz. 19:00 (margines błędu – 90%).</span></li>
          </ul>

          <div class="callout callout--info">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9 18l6-6-6-6"/></svg>
            <div>Zobacz pełny zestaw drogowskazów w <a data-page="obszar-intelekt" data-crumb-title="Rozum i intelekt">Rozum i intelekt</a>.</div>
          </div>

        <div class="pager">
          <a data-page="proba-rytm" data-crumb-title="Rytm próby indywidualnej">
            <span class="lbl">Wstecz</span>
            <span class="ttl">← Rytm próby indywidualnej</span>
          </a>
          <a class="next" data-page="proba-obszary" data-crumb-title="Nad którymi obszarami pracować?">
            <span class="lbl">Dalej</span>
            <span class="ttl">Nad którymi obszarami pracować? →</span>
          </a>
        </div>
      </section>

      <section class="page" id="page-proba-obszary">
        <span class="eyebrow"><span class="dot"></span>02 · Układanie próby</span>
        <h1 class="title">Nad którymi obszarami pracować?</h1>

          <p>Człowiek powinien pracować nad wszystkimi obszarami swojego życia, ale nie nad wszystkimi naraz. Możesz w ramach zadania łączyć różne obszary życia, ale nie przejmuj się, jeśli któregoś w ogóle w niej nie poruszysz – ostatecznie służba i praca nad sobą trwają całe życie.</p>
          <p>Wybierając obszary, w których chcesz się rozwinąć przez zadania próby, kieruj się następującymi wskazówkami.</p>

          <figure class="obszary-fig">
            <div class="of-stage">
              <svg class="of-arrows of-arrows--wide" viewBox="0 0 160 110" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="of-head-w" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M1.5 1.5 L8.5 5 L1.5 8.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></marker></defs><path d="M30 27 C34 40 52 46 74 44.5" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" marker-end="url(#of-head-w)"/><path d="M130 27 C128 38 112 48 96.5 47.5" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" marker-end="url(#of-head-w)"/><path d="M28 83 C30 72 44 66 59.5 64.8" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" marker-end="url(#of-head-w)"/><path d="M132 83 C128 78 112 77 98 76.8" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" marker-end="url(#of-head-w)"/></svg>
              <svg class="of-arrows of-arrows--narrow" viewBox="0 0 100 104" preserveAspectRatio="none" aria-hidden="true"><defs><marker id="of-head-n" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto"><path d="M1.5 1.5 L8.5 5 L1.5 8.5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></marker></defs><path d="M24 26 C25 37 36 44 46 45" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" marker-end="url(#of-head-n)"/><path d="M76 26 C75 37 70 46 65.4 48.5" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" marker-end="url(#of-head-n)"/><path d="M24 78 C24 72 27 67 30.8 65.3" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" marker-end="url(#of-head-n)"/><path d="M76 78 C74 77 70 77 66.8 76.6" fill="none" stroke="currentColor" stroke-width="0.5" stroke-linecap="round" marker-end="url(#of-head-n)"/></svg>
              <div class="of-flame" role="img" aria-label="Ognisko"></div>
              <p class="of-txt of-tl"><strong>ogień na środku pozwala szybciej rozpalić całość –</strong> niektóre obszary są ważniejsze</p>
              <p class="of-txt of-tr"><strong>wzmacniaj ogień, który już płonie –</strong> rozwijaj swoje mocne strony</p>
              <p class="of-txt of-bl"><strong>celem jest rozpalenie całego polana –</strong> rozwój we wszystkich obszarach</p>
              <p class="of-txt of-br"><strong>osuszaj zawilgocone obszary –</strong> zmniejszaj swoje deficyty</p>
            </div>
          </figure>

          <ol class="steps-num">
            <li>W pierwszej kolejności zwróć uwagę na te obszary, w których: chciałbyś szczególnie podjąć pracę nad sobą, np. masz plany i marzenia z nimi związane, oraz w których jesteś uzdolniony lub masz predyspozycje. Staraj się je rozwinąć tak, aby uczynić z nich Twoje mocne strony.</li>
            <li>W drugiej kolejności weź pod uwagę te obszary, w których masz wyraźne problemy, niedomagania czy deficyty i staraj się je zredukować.</li>
            <li>Pamiętaj też, że rozwój człowieka powinien być całościowy, tzn. na swojej ścieżce harcerskiej powinieneś rozwijać się we wszystkich obszarach. Zastanów się, czy jakieś obszary życia nie zostały pominięte w Twoich próbach na wcześniejsze stopnie i czy nie przykładasz zbyt dużej wagi do niektórych z nich (np. do „Zdrowia i sprawności fizycznej”).</li>
          </ol>

        <div class="pager">
          <a data-page="proba-zadanie" data-crumb-title="Jak ułożyć zadanie?">
            <span class="lbl">Wstecz</span>
            <span class="ttl">← Jak ułożyć zadanie?</span>
          </a>
          <a class="next" data-page="proba-faq" data-crumb-title="FAQ">
            <span class="lbl">Dalej</span>
            <span class="ttl">FAQ →</span>
          </a>
        </div>
      </section>

      <section class="page" id="page-proba-faq">
        <span class="eyebrow"><span class="dot"></span>02 · Układanie próby</span>
        <h1 class="title">FAQ</h1>

          <div class="faq">
            <details>
              <summary>Czy każdy harcerz zamykając stopień HO i HR, powinien spełniać wszystko to, co jest zawarte w Drogowskazach?<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></summary>
              <div class="a"><strong>Odpowiedź: Nie!</strong> Prawdopodobnie nie ma takiej osoby na świecie. Drogowskazy mają Cię zainspirować co do tematyki zadania, jeśli zdecydowalibyście się pracować nad daną postawą.</div>
            </details>
            <details>
              <summary>Co, jeśli chciałbym popracować nad daną postawą, ale zaproponowane w Vademecum drogowskazy nie do końca wpisują się w moje życie albo mam lepszy pomysł na zadanie? Czy przy układaniu zadania jestem ograniczony drogowskazami?<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></summary>
              <div class="a"><strong>Odpowiedź: Nie.</strong> Możesz razem z opiekunem ułożyć zadanie w oparciu o kompetencję nie wypisaną poniżej w formie drogowskazu. Pamiętaj jednak, że jest to „wyższa szkoła jazdy” prowadzenia stopnia, więc najlepiej skonsultować to wcześniej z instruktorem.</div>
            </details>
            <details>
              <summary>Czy można łączyć spełnianie wymagań na stopień z zadaniami indywidualnymi w ramach próby indywidualnej?<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></summary>
              <div class="a">
                <p><strong>Odpowiedź: Tak.</strong> Jeżeli zdobycie wiedzy czy umiejętności zawartych w wymaganiach na stopień nie będzie możliwe w ramach zbiórek i wyjazdów drużyny, można połączyć je z zadaniami indywidualnymi w ramach próby indywidualnej. W takiej sytuacji ważne jest, aby skonstruowane zadanie spełniało obydwa cele: zarówno rozwijało Cię indywidualnie, przybliżając do sylwetki stopnia, który zdobywasz; jak i uczyło Cię wymaganej na dany stopień wiedzy czy umiejętności. W ocenie, czy wymyślone przez Ciebie zadanie spełnia kryteria realizacji zarówno wymagania, jak i zadania indywidualnego, pomoże Ci Twój opiekun i kapituła stopnia.</p>
                <p style="margin-top:.6rem"><strong>Przykład</strong><br>Jeżeli w ramach zadania indywidualnego będziesz chciał również spełnić wymaganie dot. umiejętności posługiwania się językiem obcym, w praktyce zadbaj o to, żeby takie zadanie rozwijało w Tobie postawę, nad którą chcesz pracować np. Buduję braterstwo z ludźmi z Europy i z całego świata z obszaru Małe ojczyzny, Polska i świat.</p>
              </div>
            </details>
            <details>
              <summary>Czy opisany powyżej tryb zdobywania HR-a jest jedynym obowiązującym?<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></summary>
              <div class="a"><strong>Odpowiedź: Nie.</strong> Niektóre środowiska eksperymentują również z innymi trybami (np. opierające się na ciągłej pracy ze Starszym Bratem). Jeśli tak jest u Ciebie w środowisku, to po informacje, jak będzie wyglądać próba, skieruj się do swojego drużynowego.</div>
            </details>
          </div>

        <div class="pager">
          <a data-page="proba-obszary" data-crumb-title="Nad którymi obszarami pracować?">
            <span class="lbl">Wstecz</span>
            <span class="ttl">← Nad którymi obszarami pracować?</span>
          </a>
          <a class="next" data-page="obszar-bog" data-crumb-title="Bóg, wiara i duchowość">
            <span class="lbl">Dalej</span>
            <span class="ttl">Drogowskazy: Bóg, wiara i duchowość →</span>
          </a>
        </div>
      </section>

<section class="page" id="page-obszar-bog">
        <span class="eyebrow"><span class="dot"></span>03 · Drogowskazy</span>
        <h1 class="title">Bóg, wiara i duchowość</h1>

        <div class="lede">
          <p>Harcerska idea prowadzi nas przez drogę służby i miłości bliźniego. Głębokie i dojrzałe rozumienie źródeł tej idei to umiejętność stawiania pytań o to, czym jest dobro, prawda i piękno. Chrześcijanie wierzą, że źródłem tych wartości jest Bóg, a pogłębianie wiary jest drogą do ich lepszego poznania, pielęgnowania w swoim życiu i promieniowania nimi na otoczenie. Jednak duchowe potrzeby człowieka są niezależne od tego, czy uważamy się za ludzi wierzących czy też niewierzących albo wątpiących – wszyscy szukamy sensu tych wartości w naszym życiu. Każdy z nas będąc wiernym idei, która nas w ruchu harcerskim połączyła, powinien rozwijać swoją wrażliwość duchową i pogłębiać rozumienie zasad etycznych. To jest harcerska ścieżka wzrastania do dojrzałości moralnej.</p>
          <p>Niezależnie od tego, czy uważasz się za osobę niewierzącą, wątpiącą, obojętną wobec wiary lub głęboko wierzącą, przeczytaj drogowskazy, szukając tych, które będą dla Ciebie inspiracją do duchowego rozwoju w opisanych postawach.</p>
          <p class="signature">Przełącz tryb powyżej — drogowskazy oznaczone <span class="hr-chip" style="position:static">HR</span> są zaadresowane głównie do zdobywających Harcerza Rzeczypospolitej, ale każdy może się nimi zainspirować.</p>
        </div>

        <section class="track postawa" id="bog-p1">
          <h2><span class="idx">01</span> Poszukuję Logosu i transcendencji w świecie</h2>
          <p class="lead">Poszukuję rozumienia głębokich prawd o początku i celu rzeczywistości oraz źródle dobra, prawdy i piękna.</p>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Przeczytałem współczesną książkę lub wybrane teksty dotyczące sensu istnienia, harmonii przyrody lub stworzenia świata.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Szukam odpowiedzi na pytania o to: czym jest dobro a czym zło, jaka jest relacja szczęścia i moralności, gdzie można znaleźć uniwersalne drogowskazy etycznego postępowania. Czytam teksty na ten temat i rozmawiam z osobami, które mają gruntowne w nim rozeznanie – np. z filozofem, etykiem, duchownym. Rozmawiam o tym w gronie harcerskim i nie tylko.</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Studiuję teksty traktujące o idei dobra, cnotach. Próbuję odnieść je do współczesnych wyzwań etycznych i własnego życia.<em class="xref">Zajrzyj też do „<a data-page="obszar-kultura" data-crumb-title="Kultura i komunikacja">Poznaję klasyczne dzieła kultury i kształtuje swoją wrażliwość jako odbiorca sztuki</a>”.</em></span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Poznaję argumenty za istnieniem Boga (np. 5 dróg św. Tomasza z Akwinu, argumenty z przygodności bytu, argumenty ontologiczne, argument Kalam, argumenty z precyzyjnego dostrojenia itp.).</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Z otwartością badam cuda i objawienia.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Śledzę podcasty/ czytam współczesne artykuły, w których poruszane są dylematy dotyczące wiedzy naukowej i wiary.</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Poznaję klasyczne dzieła i teksty traktujące o istocie Boga (np. Ojców Kościoła, Św. Tomasza z Akwinu). Szukam odpowiedzi na pytanie, co to znaczy, że Bóg jest prosty.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="bog-p2">
          <h2><span class="idx">02</span> Kieruję się zasadami etyki chrześcijańskiej</h2>
          <p class="lead">Europejska kultura została ufundowana na etyce chrześcijańskiej, która przenika również ruch harcerski – co wyrażone jest w Prawie i Przyrzeczeniu Harcerskim. Chrześcijanin widzi swoje życie jako odpowiedź człowieka na wezwanie Boga i łaskę bycia z Nim w jedności, dlatego zgłębia nauczanie moralne Kościoła i kształtuje swoje sumienie w oparciu o Dekalog i Przykazanie Miłości. Moralne życie człowieka i harcerza jest przywiązaniem do chrześcijańskich zasad etycznych niezależnie od wiary w źródło tych wartości.</p>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Poznaję postać Jezusa przez współczesne książki i komentarze do Biblii.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Poznaję nauczanie Jezusa (np. przeczytałem Kazanie na Górze z Ewangelii według św. Mateusza).</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Czytam współczesne teksty dot. rozumienia zagadnień etycznych, szczególnie etyki chrześcijańskiej (np. L. Kołakowski).</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Regularnie słucham podcasterów i youtuberów tłumaczących moralność chrześcijańską.</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Poznaję stanowisko Kościoła katolickiego (i/lub mojego Kościoła) wobec współczesnych wyzwań bioetycznych. Umiem zająć w dyskusji stanowisko w podobnych sprawach.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Studiuję koncepcje prawa naturalnego chrześcijańskich i niechrześcijańskich autorów.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Pogłębiam rozumienie cnót kardynalnych (roztropność, sprawiedliwość, umiarkowanie, męstwo) – uczestniczę w dyskusjach, spotkaniach na ten temat.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię przeanalizować postępowanie wg kryteriów oceny moralnej czynu (przedmiot, intencja i okoliczności). Zastanawiam się nad rolą sumienia w życiu człowieka (np. uczestniczę w dyskusjach).</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Poznaję zasady moralności seksualnej obowiązujące w moim Kościele. Wiem, co znaczy, że seksualność człowieka ma cel prokreacyjny i jednoczący.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="bog-p3">
          <h2><span class="idx">03</span> Poznaję chrześcijaństwo i Kościół, rozwijam osobistą relację z Bogiem</h2>
          <p class="lead">Kościoły chrześcijańskie przez wieki wytworzyły wielkie bogactwo różnych praktyk pobożnościowych oraz duchowości, które pomagają żyć w duchu własnego wyznania. Doświadczenie różnych praktyk i form duchowych jest też drogą poznania kultury chrześcijańskiej i otwarcia się na działanie Boga dla tych, którzy go poszukują.</p>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Uczestniczyłem przynajmniej raz (w życiu lub przynajmniej raz świadomie) w całym Triduum Paschalnym.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Czytam literaturę chrześcijańską (np. św. Augustyna, Tolkiena, Chestertona, Lewisa, Cormaca McCarthy’ego).<em class="xref">Zajrzyj też do „<a data-page="obszar-kultura" data-crumb-title="Kultura i komunikacja">Poznaję klasyczne dzieła kultury i kształtuje swoją wrażliwość jako odbiorca sztuki</a>”.</em></span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Odbyłem osobistą refleksyjną wędrówkę na łonie natury, w której zmierzyłem się z jednym z transcendentalnych pytań<em class="xref">Zajrzyj też do „<a data-page="obszar-przyroda" data-crumb-title="Przyroda i puszczaństwo">Czuję się częścią świata przyrody</a>”.</em></span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Poznałem różnice doktrynalne między Kościołami chrześcijańskimi. Wiem, co łączy, a co różni chrześcijaństwo z innymi wielkimi religiami monoteistycznymi.</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Poznaję żywoty świętych, którzy mnie inspirują, odbyłem intelektualną i fizyczną pielgrzymkę śladem jednego z nich. (W szczególności dla katolików i obrządków wschodnich).</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Uczestniczyłem w kilkudniowej pieszej lub rowerowej pielgrzymce.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Studiuję historię mojego Kościoła. Umiem zmierzyć się z pytaniami o błędy i niemoralne działania mojego Kościoła w przeszłości i współcześnie.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Świadomie podejmuję się ćwiczeń duchowych – np. poszczę w wybranej intencji, regularnie odmawiam różaniec.</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Uczestniczyłem w zamkniętych rekolekcjach.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Podjąłem się stałej pracy ze spowiednikiem. (W szczególności dotyczy katolików).</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="bog-p4">
          <h2><span class="idx">04</span> Jestem otwarty na wspólnotę duchową</h2>
          <p class="lead">Wartości duchowe poznaje się przez dialog z bliźnimi, wspólne stawianie pytań i poszukiwanie odpowiedzi. Chrześcijanie wierzą też, że to sam Bóg objawił się wobec całego Kościoła i ustanowił się jego Głową. Dlatego pogłębiają oni swoją wiarę również przez aktywne uczestnictwo w życiu Kościoła i utożsamianie się z jego wspólnotą. Najważniejszą wspólnotową formą działania Boga wobec Jego Kościoła i Kościoła wobec Boga jest liturgia – życie nią jest szczególnym elementem relacji z Bogiem.</p>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Brałem udział w służbie na wydarzeniu religijnym (np. Lednicy, ŚDM, Golgocie młodych itp).<em class="xref">Zajrzyj też do „<a data-page="obszar-sluzba" data-crumb-title="Służba">Nieść chętną pomoc bliźnim</a>”.</em></span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię w ramach działań drużyny (np. na wycieczce/ wędrówce) opowiedzieć o wpływie kościoła na rozwój kultury (np. w kontekście architektury, sztuki, gospodarki, itp.) – posługując się konkretnymi przykładami.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Brałem udział w rekolekcjach dla poszukujących (np. Kurs Alfa itp.).</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Rozmawiałem z mnichem lub z siostrą klauzurową na temat ich sposobu życia, motywacji i wiary.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Wziąłem udział w spotkaniu z osobą, która przeżyła nawrócenie.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Zaangażowałem się we współtworzenie dzieła charytatywnego w mojej wspólnocie – parafii lub duszpasterstwie.<em class="xref">Zajrzyj też do „<a data-page="obszar-sluzba" data-crumb-title="Służba">Nieść chętną pomoc bliźnim</a>”.</em></span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Współtworzyłem rozbudowaną oprawę liturgii w mojej wspólnocie (np. podczas Triduum Paschalnego, Mszy Pasterskiej, procesji Bożego Ciała).</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Podjąłem się uczestnictwa w jednej z grup formacyjnych w moim Kościele (np. neokatechumenat, Opus Dei, oaza, KSM, duszpasterstwo Tradycji).</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię się duchowo przygotować do poszczególnych części Mszy Świętej, wiem, co się dzieje w każdej z nich. (Dotyczy w szczególności katolików i prawosławnych).</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Korzystam z lekcjonarza, potrafię odnaleźć właściwe czytania mszalne i zaśpiewać psalm.</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Potrafię modlić się Liturgią Godzin lub Lectio Divina. (Dotyczy w szczególności katolików).</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="bog-p5">
          <h2><span class="idx">05</span> Poznaję Pismo Święte</h2>
          <p class="lead">Biblia jest fascynującym literackim zapisem korzeni cywilizacji, w której wszyscy wyrastamy niezależnie od naszych przekonań religijnych. Pismo Święte odczytywane zgodnie z Tradycją Kościoła jest dla wierzących w Boga podstawą wiary chrześcijańskiej. Znajomość Biblii jako Słowa Bożego jest drogą do Jego poznania.</p>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Znam podstawową strukturę Nowego i Starego Testamentu, przeczytałem wybrane Ewangelie w całości.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Śledzę, w jaki sposób treść Biblii była inspiracją do stworzenia innych wielkich dzieł literatury i sztuki – np. odwiedziłem wystawę malarstwa religijnego, uczestniczyłem w koncercie pasyjnym, przeczytałem jeden z klasycznych utworów z motywem biblijnym. Uczestniczyłem w spotkaniu/ dyskusji na ten temat.<em class="xref">Zajrzyj też do „<a data-page="obszar-kultura" data-crumb-title="Kultura i komunikacja">Poznaję klasyczne dzieła kultury i kształtuje swoją wrażliwość jako odbiorca sztuki</a>”.</em></span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Przeczytałem wybrany, współczesny komentarz do Biblii (np. Rozmowy o Biblii, A. Świderkówna), uczestniczyłem w dyskusji na interesujący mnie temat z nią związany.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Regularnie czytam Pismo Święte.</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Przeczytałem teksty biblijne mówiące o relacji między wiarą a uczynkami. Zapoznałem się z komentarzami mojego Kościoła do tych tekstów.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>
        <div class="pager">
          <a data-page="proba-faq" data-crumb-title="FAQ">
            <span class="lbl">Wstecz</span>
            <span class="ttl">← Układanie próby: FAQ</span>
          </a>
          <a class="next" data-page="obszar-charakter" data-crumb-title="Siła charakteru">
            <span class="lbl">Dalej</span>
            <span class="ttl">Drogowskazy: Siła charakteru →</span>
          </a>
        </div>
      </section>

<section class="page" id="page-obszar-charakter">
        <span class="eyebrow"><span class="dot"></span>03 · Drogowskazy</span>
        <h1 class="title">Siła charakteru</h1>

        <div class="lede">
          <p>Idea harcerska stawia przed nami wysokie wymagania. Drogą do sprostania tym wymaganiom są ćwiczenia charakteru! Niebawem to nie drużynowy i opiekun próby lub inni starsi harcerscy bracia będą Cię mobilizować do działania i wskazywać obszary do pracy – sam przejmiesz ten ster.</p>
        </div>

        <section class="track" id="charakter-p1">
          <h2>Czym jest cnota?</h2>
          <p>Już jako młodzik nauczyłeś się, że na lilijce znajdują się 3 litery: ONC, czyli Ojczyzna, Nauka, Cnota. Pierwsze dwa wyrazy są jasne – ale co oznacza to trzecie?</p>
          <p>Cnota jest stałą sprawnością rozumu i woli, która skłania nas do czynienia dobra i unikania zła.</p>
        <div class="callout callout--info">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
          <div>
            <b>Przykład</b>
            <div><em>Człowiek z cnotą męstwa będzie z większą łatwością występował w obronie słabszych, a człowiek, który wyćwiczył się w cnocie pracowitości, będzie podejmować żmudne i długotrwałe prace łatwiej niż osoba, która może by i chciała się podjąć takiej pracy, ale zwyczajnie nie daje rady.</em></div>
          </div>
        </div>
          <p>Wszystkie cnoty kierujące naszym życiem, które możemy w sobie kształcić, opierają się na 4 „bazowych” cnotach, zwanych kardynalnymi, którymi są:</p>
          <ul class="wskazy plain">
            <li><span class="glyph">●</span><span class="txt"><strong>męstwo</strong> – czyli zdolność do wytrwania w trudzie;</span></li>
            <li><span class="glyph">●</span><span class="txt"><strong>roztropność</strong> – czyli zdolność do odpowiedniego dobierania środków do celu;</span></li>
            <li><span class="glyph">●</span><span class="txt"><strong>sprawiedliwość</strong> – czyli zdolność oddania każdemu tego, co mu się słusznie należy;</span></li>
            <li><span class="glyph">●</span><span class="txt"><strong>umiarkowanie</strong> – czyli zdolność do właściwego korzystania ze swoich zmysłów.</span></li>
          </ul>
          <p>Jak w praktyce pracować nad wzmacnianiem cnót i zwalczaniem wad? W ramach zadania indywidualnego możesz wypróbować jedną z opisanych niżej metod.</p>
        </section>

        <section class="track" id="charakter-p2">
          <h2><span class="idx">01</span> Wypracuj nawyk i zaplanuj pracę!</h2>
          <p>Wymyśl małe zadanie i podejmij dłuższe wyzwanie (np. 30- lub 60-dniowe), w ramach którego będziesz codziennie wykonywał to małe zadanie. Zaplanuj to, np. ustaw sobie codziennie przypomnienie i zapisuj w kalendarzu, gdy uda Ci się je zrealizować. Realizację zadania możesz też połączyć z jakąś małą nagrodą. Zobaczysz, że pod koniec zrobienie tego zadania będzie Ci przychodziło o wiele łatwiej niż na początku.</p>
        <div class="callout callout--info">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
          <div>
            <b>Przykład</b>
            <div><em>Jeśli masz problem z nieumiarkowaniem polegający na używaniu telefonu do późnych godzin nocnych, przez miesiąc podejmiesz wyzwanie polegające na wyłączaniu telefonu o godz. 20:00 (kupisz sobie budzik, żeby nie używać budzika w telefonie).</em></div>
          </div>
        </div>
        </section>

        <section class="track" id="charakter-p3">
          <h2><span class="idx">02</span> Podejmij wyzwanie i przełam się!</h2>
          <p>Czasami wada zakorzeni się w nas tak głęboko, że aż trudno nam się ruszyć o mały kroczek w kierunku poprawy. Możesz spróbować rzucić się na głęboką wodę i postawić się w sytuacji niekomfortowej, która pozwoli Ci spojrzeć na świat i na siebie innymi oczami.</p>
        <div class="callout callout--info">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
          <div>
            <b>Przykład</b>
            <div><em>Jeśli widzisz w sobie niechęć do jakiejś grupy społecznej (np. „patusów”, imigrantów, kibiców), to podejmij działanie, które zmusi Cię do poznania bliżej tych osób (np. poprzez służbę wśród ukraińskich rodzin).</em></div>
          </div>
        </div>
        </section>

        <section class="track" id="charakter-p4">
          <h2><span class="idx">03</span> Zmień/poszerz towarzystwo!</h2>
          <p>Nasi koledzy w różnych środowiskach mogą mieć na nas zarówno bardzo pozytywny, jak i negatywny wpływ. Przykładowo, jeśli Twoi koledzy nie uczą się, to i Ty nie będziesz miał do tego motywacji.</p>
          <p>Czasami warto się zatem zastanowić, czy nie wejść w nowe środowisko i nie poznać nowych ludzi, którzy pomogą nam w walce o cnotliwe życie.</p>
        <div class="callout callout--info">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
          <div>
            <b>Przykład</b>
            <div><em>Jeśli Ty i Twoi koledzy z klasy masę czasu i zaangażowania przeznaczacie na życie wirtualne/granie na komputerze, pomyśl o zapisaniu się do klubu/koła/towarzystwa zajmującego się jakimś innym hobby, może to być np. klub wspinaczki skałkowej, kurs gry na instrumencie, teatr szkolny itp.</em></div>
          </div>
        </div>
        </section>

        <section class="track" id="charakter-p5">
          <h2><span class="idx">04</span> Znajdź mistrza/brata!</h2>
          <p>Walka o cnoty to zadanie na całe życie. Bardzo wartościowe na tej ścieżce jest znalezienie mistrza (kierownika duchowego, starszego brata itp.), z którym będziesz mógł regularnie pracować nad swoich charakterem.</p>
        <div class="callout callout--info">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
          <div>
            <b>Przykład</b>
            <div><em>Przez okres próby spotykaj się co miesiąc z kierownikiem duchowym. Na każdym spotkaniu omówcie Twoją walkę ze swoją główną wadą, a Ty podejmij wyzwanie na kolejny miesiąc.</em></div>
          </div>
        </div>
        </section>

        <section class="track" id="charakter-p6">
          <h2><span class="idx">05</span> Poczytaj!</h2>
          <p>Nasze wybory i utrwalone postawy wynikają często z niedostatecznej wiedzy. Powierzchowna znajomość tematu sprzyja podtrzymywaniu pasującej nam tezy. Wystaw się na próbę i zmierz się z innymi argumentami. Dzięki temu może Twoje następne decyzje i podejście do tych samych spraw będą oparte na głębszym rozumieniu świata.</p>
        <div class="callout callout--info">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
          <div>
            <b>Przykład</b>
            <div><em>Jeśli czujesz, że zawarta w prawie harcerskim „ofiarność” jest sprzeczna z teoriami ekonomicznymi i wyższymi racjami – być może warto, abyś poczytał więcej na temat sprawiedliwości społecznej u św. Tomasza z Akwinu lub zapoznał się z badaniami dotyczącymi źródeł i skutków nierówności społecznych.</em></div>
          </div>
        </div>
        </section>
        <div class="pager">
          <a data-page="obszar-bog" data-crumb-title="Bóg, wiara i duchowość">
            <span class="lbl">Wstecz</span>
            <span class="ttl">← Drogowskazy: Bóg, wiara i duchowość</span>
          </a>
          <a class="next" data-page="obszar-intelekt" data-crumb-title="Rozum i intelekt">
            <span class="lbl">Dalej</span>
            <span class="ttl">Drogowskazy: Rozum i intelekt →</span>
          </a>
        </div>
      </section>

<section class="page" id="page-obszar-intelekt">
        <span class="eyebrow"><span class="dot"></span>03 · Drogowskazy</span>
        <h1 class="title">Rozum i intelekt</h1>

        <div class="lede">
          <p>Spośród wszystkich stworzeń człowieka charakteryzuje to, że ma wolność i rozum. To rozum pozwala nam odkrywać prawdę, podejmować moralne decyzje, pracować nad sobą czy wielbić Boga. Poważamy ludzi roztropnych, wnikliwych, potrafiących szukać odpowiedzi na złożone problemy. Sami możemy i powinniśmy tacy się stać! Dlatego przykładamy wielką wagę do rozwoju intelektualnego – by sobie i innym służyć rozwagą i mądrymi decyzjami.</p>
          <p class="signature">Przełącz tryb powyżej — drogowskazy oznaczone <span class="hr-chip" style="position:static">HR</span> są zaadresowane głównie do zdobywających Harcerza Rzeczypospolitej, ale każdy może się nimi zainspirować.</p>
        </div>

        <section class="track postawa" id="intelekt-p1">
          <h2><span class="idx">01</span> Uczę się metodycznie i regularnie</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Mam stałe pory w ciągu dnia i tygodnia, kiedy regularnie się uczę (nie tylko do sprawdzianów).</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię zaplanować swoją naukę i zrealizować ten plan.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Czytam książki zgodnie z ułożonym przeze mnie planem.</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="intelekt-p2">
          <h2><span class="idx">02</span> Szkoła i nauka są dla mnie ważne</h2>
          <p class="lead">Przykładam się do swoich obowiązków szkolnych, korzystam z szans, które daje mi szkoła, uczestniczę w życiu szkolnym.</p>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Wybrałem przedmioty szkolne, na których się szczególnie koncentruję i w których wychodzę poza minimum szkolne (np. startuję w konkursach z tych przedmiotów, stawiam sobie wyższe cele dotyczące ocen, biorę udział w olimpiadach, zdobywam certyfikaty).</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię poprawić oceny z przedmiotu, z którego jestem słaby.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Uczestniczę w życiu szkolnym (np. biorę udział w projektach szkolnych i kołach zainteresowań, jestem częścią samorządu szkolnego).</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="intelekt-p3">
          <h2><span class="idx">03</span> Myślę logicznie</h2>
          <p class="lead">Staram się wyciągać wnioski, bazując na logicznych związkach między przesłankami rozumowania, a nie głównie na intuicji i odczuciach.</p>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Potrafię napisać tekst, artykuł lub zrobić prezentację, w których przedstawiam swoją tezę i bronię jej argumentami.</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Potrafię rozbić argument na przesłanki, przeanalizować związki logiczne pomiędzy nimi i w ten sposób określić jego prawdziwość.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Znam najczęstsze błędy w argumentacji (np. błąd odwróconej implikacji, argumentum ad ignorantiam, zwalczanie chochoła, błędne koło, mylenie przyczynowości z korelacją, fałszywa dychotomia).</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="intelekt-p4">
          <h2><span class="idx">04</span> Zachowuję krytycyzm i pokorę intelektualną</h2>
          <p class="lead">Badam argumenty swoje oraz innych, nie odrzucam ani nie akceptuję poglądów bez zrozumienia ich podstaw.</p>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Potrafię poprowadzić dyskusję lub przeprowadzić burzę mózgów (zgodnie z metodyką jej prowadzenia).</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię poszukiwać potrzebnych mi informacji, korzystając ze zróżnicowanych źródeł.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię zweryfikować, czy jakaś informacja jest prawdziwa czy fałszywa (<em>fake news, deep fake</em>).</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Potrafię w debacie bronić tezy, z którą się nie zgadzam.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="intelekt-p5">
          <h2><span class="idx">05</span> Kształtuję swój światopogląd</h2>
          <p class="lead">Zapoznaję się z różnymi światopoglądami i koncepcjami społeczno-gospodarczymi oraz potrafię je ocenić na bazie argumentów.</p>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Potrafię zgłębić (np. przez przeczytanie książki) wybraną doktrynę społeczną (np. katolicką naukę społeczną, liberalizm, republikanizm, socjalizm) lub kwestię społeczną (np. problem migracji, sprawiedliwości społecznej, zasady pomocniczości, globalnych przepływów kapitału, aborcji).</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Potrafię nawiązywać relacje z ludźmi o poglądach sprzecznych z moimi lub będących w sytuacjach życiowych zupełnie innych niż moja.<em class="xref">Sprawdź również Drogowskazy z obszaru „<a data-page="obszar-bog" data-crumb-title="Bóg, wiara i duchowość">Bóg, wiara i duchowość</a>”.</em></span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="intelekt-p6">
          <h2><span class="idx">06</span> Jestem dociekliwy i ciekawy świata</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Mam potrzebę i wolę poznawania nowych rzeczy dogłębnie, a nie jedynie powierzchownie.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Wycieczki po Polsce i wyjazdy za granicę wykorzystuję do zaplanowanego poznania nowych rejonów, ludzi, zwyczajów itp., a nie wyłącznie do rozrywki i odpoczynku.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Umiem zadawać trafne pytania: przeprowadzić wywiad z ciekawą osobą lub przeprowadzić na potrzeby projektu badanie opinii (np. ankietę) na dany temat.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Otwieram się na dziedziny wiedzy, którymi się na co dzień nie interesuję, ale które mają obecnie znaczenie dla mojego życia rodzinnego, zawodowego lub społecznego.</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Potrafię odnaleźć i przeczytać artykuł naukowy dotyczący tematu, który mnie interesuje, oraz wziąć udział w wydarzeniu akademickim o takiej tematyce.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>
        <div class="pager">
          <a data-page="obszar-charakter" data-crumb-title="Siła charakteru">
            <span class="lbl">Wstecz</span>
            <span class="ttl">← Drogowskazy: Siła charakteru</span>
          </a>
          <a class="next" data-page="obszar-zdrowie" data-crumb-title="Zdrowie i sprawność fizyczna">
            <span class="lbl">Dalej</span>
            <span class="ttl">Drogowskazy: Zdrowie i sprawność fizyczna →</span>
          </a>
        </div>
      </section>

<section class="page" id="page-obszar-zdrowie">
        <span class="eyebrow"><span class="dot"></span>03 · Drogowskazy</span>
        <h1 class="title">Zdrowie i sprawność fizyczna</h1>

        <div class="lede">
          <p><strong>Harcerz jest sprawny i dba o swoje zdrowie!</strong> Od tego będzie zależało, na ile będziemy w stanie pełnić w życiu służbę – w końcu żona potrzebuje zdrowego i zadbanego męża, dzieci potrzebują silnego taty, Polska potrzebuje obywateli zdolnych stawać w jej obronie, pracodawcy poszukują zdrowych współpracowników. Warto o tym myśleć już teraz.</p>
          <p class="signature">Przełącz tryb powyżej — drogowskazy oznaczone <span class="hr-chip" style="position:static">HR</span> są zaadresowane głównie do zdobywających Harcerza Rzeczypospolitej, ale każdy może się nimi zainspirować.</p>
        </div>

        <section class="track postawa" id="zdrowie-p1">
          <h2><span class="idx">01</span> Jestem wysportowany i sprawny fizycznie</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Potrafię zrealizować program treningowy.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Planuję dzień tak, aby w wykonywanie codziennych obowiązków wplatać krótkie aktywności fizyczne (np. spacer, jazda na rowerze, ćwiczenia rozciągające).</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Mam wyrobiony nawyk regularnego podejmowania aktywności fizycznej. Jest ona częścią mojej tygodniowej rutyny.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Potrafię zrealizować wyczyn fizyczny na poziomie mistrzowskim.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="zdrowie-p2">
          <h2><span class="idx">02</span> Dbam o swoje zdrowie</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Wiem, jaka jest moja właściwa waga, jaka jest odpowiednia dla mnie dieta (np. ile kalorii powinienem spożywać dziennie) i trzymam się jej.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Znam dobre nawyki żywieniowe (regularne posiłki, odpowiednie składniki, unikanie „energetyków” itp.) i wcielam je w życie.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Mam stałe godziny snu (min. 8 godzin dziennie).</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Rozumiem ryzyko stosowania jakichkolwiek środków psychoaktywnych (np. alkohol, dopalacze, narkotyki) i uzależniających (np. nikotyna).</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="zdrowie-p3">
          <h2><span class="idx">03</span> Dbam o swoją higienę i dobry wygląd</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Regularnie się golę lub strzygę brodę, codziennie myję się i używam dezodorantu.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię zająć się swoimi problemami dermatologicznymi (np. poprzez konsultacje z kosmetyczką i dermatologiem).</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="zdrowie-p4">
          <h2><span class="idx">04</span> Zachowuję higienę cyfrową<sup>1</sup></h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Wiem, jak działa uzależnienie od urządzeń ekranowych i jakie niesie skutki.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię funkcjonować bez korzystania z jakichkolwiek mediów społecznościowych przez dłuższy czas (np. Wielki Post).</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Nie używam telefonu w czasie lekcji, posiłków rodzinnych, przechodząc przez przejście dla pieszych, prowadząc samochód, rower, po godz. 22.00 itd.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Mierzę w aplikacji czas korzystania z urządzeń ekranowych, wyznaczam sobie limity i ich przestrzegam.</span><button class="add-btn">Dodaj</button></li>
          </ul>
          <p style="font-size:.8rem;color:var(--vad-ink-muted);margin:.6rem 0 0"><sup>1</sup> Sprawdź w jednym z dostępnych w Internecie testów higieny cyfrowej, np. Test Higieny Cyfrowej ICO – Instytut Cyfrowego Obywatelstwa.</p>
        </section>
        <div class="pager">
          <a data-page="obszar-intelekt" data-crumb-title="Rozum i intelekt">
            <span class="lbl">Wstecz</span>
            <span class="ttl">← Drogowskazy: Rozum i intelekt</span>
          </a>
          <a class="next" data-page="obszar-sluzba" data-crumb-title="Służba">
            <span class="lbl">Dalej</span>
            <span class="ttl">Drogowskazy: Służba →</span>
          </a>
        </div>
      </section>

<section class="page" id="page-obszar-sluzba">
        <span class="eyebrow"><span class="dot"></span>03 · Drogowskazy</span>
        <h1 class="title">Służba</h1>

        <div class="lede">
          <p>Rozwój w tym obszarze dotyczy rozwijania jednej postawy – postawy służby, której drogowskazy zawarte są w Przyrzeczeniu Harcerskim: na poziomie harcerza orlego – „Niosę chętną pomoc bliźnim”, a na poziomie harcerza Rzeczypospolitej – „Całym życiem pełnię służbę Bogu i Polsce”.</p>
          <p class="signature">Przełącz tryb powyżej — część opisu adresowana jest do zdobywających Harcerza Rzeczypospolitej, ale każdy może się nim zainspirować.</p>
        </div>

        <div class="callout callout--info">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
          <div>
            <b>Postawa</b>
            <div>Mam szczerą wolę całym życiem pełnić służbę Bogu i Polsce, nieść chętną pomoc bliźnim i być posłusznym Prawu Harcerskiemu.</div>
          </div>
        </div>

        <section class="track" id="sluzba-p1" data-for="ho">
          <h2><span class="idx">01</span> Służba harcerza orlego – „Nieść chętną pomoc bliźnim”</h2>
          <p>Być harcerzem to znaczy służyć! Bez pomagania innym harcerstwo nie ma sensu.</p>
          <p>W naszej służbie zdarza się, że dochodzi do paradoksu. Czasem chcąc pomagać jak najskuteczniej i jak najbardziej efektywnie, skupiamy się na „organizowaniu” działań lub grup pomocowych, a przez to oddalamy się od konkretnych ludzi, którym mamy pomóc. Bywa też, że spotkania z tymi osobami są dla nas wręcz trudne i nieprzyjemne – bo są oni zaniedbani, chorzy albo odpychający w sposobie bycia. Niechęć do takich osób to naturalna i zrozumiała reakcja.</p>
          <p>Jednakże jako harcerze powinniśmy starać się przełamywać taką niechęć i nie dystansować się od takich osób. Uczymy się patrzeć na świat z „wyobraźnią miłosierdzia”, tzn. umieć dostrzegać ludzi cierpiących i być przy nich – innymi słowy, po prostu solidaryzować się z nimi.</p>
          <p><strong>Wskazówki</strong></p>
          <p>Służba wędrownika zdobywającego HO powinna:</p>
          <ul class="wskazy plain">
            <li><span class="glyph">●</span><span class="txt">dotyczyć pomocy osobom słabszym i potrzebującym (w szczególności: niepełnosprawnym, osobom starszym, bezdomnym, dzieciom z domu dziecka, dzieciom imigrantów itp.),</span></li>
            <li><span class="glyph">●</span><span class="txt">prowadzić do bezpośredniego spotkania z tymi osobami (powinna dawać możliwość rozmowy). Służba ta nie powinna sprowadzać się jedynie do organizacji darów na ich rzecz czy też być służbą na rzecz idei, wspólnoty lub instytucji (np. służbą Polsce poprzez sprzątanie grobów bohaterów wojennych, służbą Kościołowi poprzez służbę porządkową na procesji, służbą bliźnim poprzez zebranie darów dla hospicjum),</span></li>
            <li><span class="glyph">●</span><span class="txt">mieć regularny charakter i trwać min. 2 miesiące.</span></li>
          </ul>
        </section>

        <section class="track" id="sluzba-p2" data-for="hr">
          <h2><span class="idx">02</span> Służba harcerza Rzeczypospolitej – „Całym życiem pełnić służbę Bogu i Polsce”</h2>
          <p>Co to znaczy, że harcerz całym życiem służy Bogu i Polsce?</p>
          <p>„Całym życiem” to znaczy we wszystkich działaniach, we wszystkich miejscach, sytuacjach i gronach, w których jesteśmy obecni. „Służba Bogu i Polsce” polega zaś na wykonywaniu codziennych obowiązków – w harcerstwie, w szkole, w pracy czy w domu, a także na gotowości do służby i działania w sytuacjach nadzwyczajnych. Zawsze robimy to z myślą o dobru Polski oraz ofiarowujemy owoce tej służby Bogu.</p>
          <p>Nie jest to łatwe. Często robimy pożyteczne rzeczy z innych powodów. Czasem chodzi nam o własne korzyści (np. wolontariat w celu zdobycia punktów na studia), czasem o dobrą zabawę i towarzystwo (np. wyjazd na atrakcyjną służbę za granicę), a czasem o spełnienie własnych ambicji (np. pełnienie służby w harcerstwie dla uznania w oczach innych).</p>
          <p>Przyrzeczenie Harcerskie wskazuje, że nasza gotowość do służby Bogu, Polsce i bliźnim ma być szczera – czyli nieuwarunkowana wyłącznie korzyściami własnymi.</p>
          <p><strong>Wskazówki</strong></p>
          <ul class="wskazy plain">
            <li><span class="glyph">●</span><span class="txt">Sprawdź, czy w swoim życiu masz pole regularnej służby, którą sumiennie wykonujesz – w harcerstwie lub poza nim. Jeśli go nie masz, to okres próby powinieneś wykorzystać na jego znalezienie.</span></li>
            <li><span class="glyph">●</span><span class="txt">Jeśli pełnisz służbę harcerską jako drużynowy albo przyboczny, możesz w ramach tego zadania zorganizować wartościową służbę z udziałem innych harcerzy.</span></li>
          </ul>
        </section>
        <div class="pager">
          <a data-page="obszar-zdrowie" data-crumb-title="Zdrowie i sprawność fizyczna">
            <span class="lbl">Wstecz</span>
            <span class="ttl">← Drogowskazy: Zdrowie i sprawność fizyczna</span>
          </a>
          <a class="next" data-page="obszar-ojczyzny" data-crumb-title="Małe ojczyzny, Polska i świat">
            <span class="lbl">Dalej</span>
            <span class="ttl">Drogowskazy: Małe ojczyzny, Polska i świat →</span>
          </a>
        </div>
      </section>

<section class="page" id="page-obszar-ojczyzny">
        <span class="eyebrow"><span class="dot"></span>03 · Drogowskazy</span>
        <h1 class="title">Małe ojczyzny, Polska i świat</h1>

        <div class="lede">
          <p>Baden-Powell napisał kiedyś, że obywatelskość to „aktywna wierność wobec wspólnoty”. Aktywna, czyli w czynach, a nie tylko w słowach. Wierność, czyli bycie przy niej również wtedy, gdy jest to dla mnie trudne, wymaga wysiłku lub poświęcenia. Wobec wspólnoty, czyli wobec ludzi żyjących razem i połączonych historią, językiem, kulturą.</p>
          <p>Zawołanie „Czuwaj!” oznacza dla nas również: <em>bądź wierny swojej wspólnocie oraz Polsce i szukaj przyjaciół na całym świecie!</em></p>
          <p class="signature">Przełącz tryb powyżej — drogowskazy oznaczone <span class="hr-chip" style="position:static">HR</span> są zaadresowane głównie do zdobywających Harcerza Rzeczypospolitej, ale każdy może się nimi zainspirować.</p>
        </div>

        <section class="track postawa" id="ojczyzny-p1">
          <h2><span class="idx">01</span> Znam polską historię i jej wpływ na teraźniejszość</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Potrafię opisać historię Polski od czasu I-go rozbioru.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię zorganizować akcję patriotyczną towarzyszącą świętu narodowemu.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Znam polskie miasta, regiony i ich rolę w historii Polski, podczas ich odwiedzania świadomie pogłębiam tę wiedzę.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię wygłosić referat lub zrobić prezentację na temat wybranej kontrowersji z historii Polski.</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="ojczyzny-p2">
          <h2><span class="idx">02</span> Jestem lokalnym patriotą</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Potrafię oprowadzić wycieczkę po miejscu mojego pochodzenia, prezentując elementy jego historii.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię nawiązać współpracę drużyny z innymi organizacjami lub instytucjami działającymi lokalnie.</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Dokonałem pozytywnej zmiany w mojej lokalnej społeczności (wspólnymi siłami „sąsiadów” lub np. przy pomocy budżetu obywatelskiego).</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="ojczyzny-p3">
          <h2><span class="idx">03</span> Buduję braterstwo z ludźmi z Europy i z całego świata</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Potrafię godnie zaprezentować Polskę w międzynarodowym gronie.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię zorganizować kilkudniową podróż do innego kraju, w ramach której poznam jego kulturę i historię.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię porozumieć się po angielsku w codziennych sytuacjach.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Uczę się wybranego języka obcego (innego niż angielski).</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Potrafię dyskutować w języku obcym.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Potrafię ugościć obcokrajowca lub wspomóc imigranta w integracji w polskim społeczeństwie (np. nauka języka, pomoc w sprawach urzędowych, pomoc w znalezieniu pracy).</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Potrafię zorganizować działanie, które angażuje Polaków żyjących poza Polską.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="ojczyzny-p4">
          <h2><span class="idx">04</span> Jestem gotów do obrony ojczyzny</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Uczestniczę w działaniach Pogotowia Harcerek i Harcerzy.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Umiem zachować spokój i opanowanie w sytuacji kryzysowej (np. w razie wypadku, ewakuacji).</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Przeszedłem kurs Sanitariusza HOPR.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię strzelać z broni ostrej (realizując tę umiejętność wyłącznie na strzelnicy pod okiem instruktora strzeleckiego).</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Posiadam uprawnienia dronowe.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Posiadam świadectwo operatora radiotelefonisty VHF.</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Zdałem kurs Kwalifikowanej Pierwszej Pomocy.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Przeszedłem podstawowe szkolenie obronne (tzw. „szesnastka” WOT).</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="ojczyzny-p5">
          <h2><span class="idx">05</span> Jestem świadomym i aktywnym obywatelem</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Znam polskie partie polityczne, ich programy, profile ideowe i poglądy na najważniejsze kwestie społeczno-gospodarcze.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię bronić swojego stanowiska w wybranej kwestii dotyczącej Polski w debacie z rówieśnikami.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Mam doświadczenie zaangażowania w działalność samorządową, obywatelską lub polityczną (np. w organizacji pozarządowej, partii politycznej, Młodzieżowej Radzie Miasta).</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Uczestniczę w wyborach, decyzje podejmuję w duchu odpowiedzialności za Polskę.<em class="xref">Sprawdź również: „<a data-page="obszar-intelekt" data-crumb-title="<a data-page="obszar-intelekt" data-crumb-title="Rozum i intelekt">Rozum i intelekt</a>">Kształtuję swój światopogląd</a>” w obszarze „Rozum i intelekt”.</em></span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>
        <div class="pager">
          <a data-page="obszar-sluzba" data-crumb-title="Służba">
            <span class="lbl">Wstecz</span>
            <span class="ttl">← Drogowskazy: Służba</span>
          </a>
          <a class="next" data-page="obszar-rodzina" data-crumb-title="Rodzina i wybór drogi życiowej">
            <span class="lbl">Dalej</span>
            <span class="ttl">Drogowskazy: Rodzina i wybór drogi życiowej →</span>
          </a>
        </div>
      </section>

<section class="page" id="page-obszar-rodzina">
        <span class="eyebrow"><span class="dot"></span>03 · Drogowskazy</span>
        <h1 class="title">Rodzina i wybór drogi życiowej</h1>

        <div class="lede">
          <p>Harcerz jest karny i posłuszny rodzicom – tego uczymy się już na początku harcerskiej ścieżki. Pewnie nie raz mierzyłeś się z tym punktem Prawa Harcerskiego – czasami w duchu pokory, a być może także w duchu sprzeciwu. Teraz, gdy stopniowo zaczynasz brać większą odpowiedzialność za siebie i swoich bliskich, pomyśl o tym punkcie PH z innej perspektywy – już za kilka lat to Ty będziesz musiał brać odpowiedzialność za swoje własne dzieci, zasługiwać swoimi decyzjami na zaufanie i posłuszeństwo oraz kształtować w nich dyscyplinę.</p>
          <p class="signature">Przełącz tryb powyżej — drogowskazy oznaczone <span class="hr-chip" style="position:static">HR</span> są zaadresowane głównie do zdobywających Harcerza Rzeczypospolitej, ale każdy może się nimi zainspirować.</p>
        </div>

        <section class="track postawa" id="rodzina-p1">
          <h2><span class="idx">01</span> Znam swoją rodzinę i moje pochodzenie</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Znam historię mojej rodziny (w szczególności na tle wydarzeń historii powszechnej).</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Utrzymuję kontakt z dziadkami. Podjąłem próbę nawiązania relacji ze słabo znanym mi członkiem dalszej rodziny.</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="rodzina-p2">
          <h2><span class="idx">02</span> Buduję głębokie, oparte na szczerości relacje z rodzicami</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Wykonuję polecenie otrzymane od rodziców lub negocjuję jego zmianę, argumentując swoje zdanie w odpowiedzialny sposób.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię w gronie rodziny podziękować swoim rodzicom za ich trud opieki nade mną.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Przejmuję od rodziców coraz trudniejsze i bardziej odpowiedzialne zadania związane z funkcjonowaniem naszej rodziny.</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Potrafię szczerze porozmawiać z moimi rodzicami o moich problemach i trudnościach w domu.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="rodzina-p3">
          <h2><span class="idx">03</span> Jestem zaangażowany w życie mojej rodziny</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Potrafię zorganizować wycieczkę dla rodziny lub jej części (np. w wyjazd z ojcem).</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię zaproponować wprowadzenie w życiu rodziny nowego, wspólnego zwyczaju.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Pomagam rodzeństwu w nauce.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Podjąłem próbę poprawienia relacji z członkiem mojej rodziny, z którym mam najsłabsze relacje.</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Potrafię przez tydzień mieszkać samodzielnie, wykonując wszystkie niezbędne obowiązki domowe (pranie, gotowanie, zakupy, sprzątanie itd.).</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="rodzina-p4">
          <h2><span class="idx">04</span> Rozpoznaję swoje powołanie i przygotowuję się do niego</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Potrafię przez pół dnia zaopiekować się małym dzieckiem (w tym zmienić pieluszkę, nakarmić je, umyć itp.).</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Dbam o swoją czystość – wiem, czym grozi pornografia i rozwiązłość seksualna. Jeśli ten problem mnie dotyczy, powziąłem walkę z oglądaniem przeze mnie pornografii.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię wyjść z inicjatywą do dziewczyny (np. zaproponować wspólny kurs tańca, zaprosić na randkę itp.).</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Aktywnie rozeznaję, czy mam powołanie do kapłaństwa.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Wiem, co to (zgodnie z katolicką nauką społeczną) znaczy, że seksualność człowieka ma cel prokreacyjny i jednoczący.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Rozwijam relację ze swoją dziewczyną, rozmawiam z nią o wartościach, działamy wspólnie w różnych przedsięwzięciach.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>
        <div class="pager">
          <a data-page="obszar-ojczyzny" data-crumb-title="Małe ojczyzny, Polska i świat">
            <span class="lbl">Wstecz</span>
            <span class="ttl">← Drogowskazy: Małe ojczyzny, Polska i świat</span>
          </a>
          <a class="next" data-page="obszar-pasje" data-crumb-title="Pasje i umiejętności">
            <span class="lbl">Dalej</span>
            <span class="ttl">Drogowskazy: Pasje i umiejętności →</span>
          </a>
        </div>
      </section>

<section class="page" id="page-obszar-pasje">
        <span class="eyebrow"><span class="dot"></span>03 · Drogowskazy</span>
        <h1 class="title">Pasje i umiejętności</h1>

        <div class="lede">
          <p>Harcerstwo jest pociągające o tyle, o ile robisz w nim nowe, ciekawe i inspirujące dla Ciebie rzeczy. Tak samo jest w naszym życiu – w dużej mierze od Ciebie zależy, czy będzie ono nudne i czy będziesz tylko biernie brał to, co przyniesie Ci los, czy raczej przejdziesz je aktywnie, szukając ciekawego zawodu i fascynujących wyzwań.</p>
          <p class="signature">Przełącz tryb powyżej — drogowskazy oznaczone <span class="hr-chip" style="position:static">HR</span> są zaadresowane głównie do zdobywających Harcerza Rzeczypospolitej, ale każdy może się nimi zainspirować.</p>
        </div>

        <section class="track postawa" id="pasje-p1">
          <h2><span class="idx">01</span> Rozwijam nowe umiejętności praktyczne</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Biorę udział w kursach, warsztatach i/lub zajęciach indywidualnych.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Zdobywam uprawnienia państwowe i certyfikaty.</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Poszukuję swojego przyszłego kierunku zawodowego (np. korzystam z doradztwa zawodowego, rozmawiam z pracownikami różnych branż, odwiedzam miejsca pracy).</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Biorę udział w stażach lub praktykach zawodowych.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="pasje-p2">
          <h2><span class="idx">02</span> Znam trud pracy zarobkowej i potrafię gospodarować swoimi pieniędzmi</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Potrafię zarobić na swoje potrzeby 1000 zł.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Pracowałem fizycznie zarobkowo.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię przygotować szczegółowy kilkumiesięczny budżet obejmujący wszystkie moje wpływy i wydatki na moje potrzeby.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię zaoszczędzić pieniądze na swoje wakacje lub na inny cel.</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="pasje-p3">
          <h2><span class="idx">03</span> Mam zainteresowania, które efektywnie rozwijam</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Dzielę się swoimi zainteresowaniami z innymi, uczę ich i dzielę się swoją pasją.</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">W wybranej dziedzinie postawiłem sobie ponadprzeciętny cel i go osiągnąłem.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="pasje-p4">
          <h2><span class="idx">04</span> Wolny czas spędzam w sposób kreatywny i ambitny</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Próbuję poszerzać swoje zainteresowania, zdobywając umiejętności i wiedzę z nowych dziedzin.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Regularnie czytam książki.</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Świadomie i systematycznie uprawiam swoją pasję w celu zachowania równowagi psychicznej.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>
        <div class="pager">
          <a data-page="obszar-rodzina" data-crumb-title="Rodzina i wybór drogi życiowej">
            <span class="lbl">Wstecz</span>
            <span class="ttl">← Drogowskazy: Rodzina i wybór drogi życiowej</span>
          </a>
          <a class="next" data-page="obszar-kultura" data-crumb-title="Kultura i komunikacja">
            <span class="lbl">Dalej</span>
            <span class="ttl">Drogowskazy: Kultura i komunikacja →</span>
          </a>
        </div>
      </section>

<section class="page" id="page-obszar-kultura">
        <span class="eyebrow"><span class="dot"></span>03 · Drogowskazy</span>
        <h1 class="title">Kultura i komunikacja</h1>

        <div class="lede">
          <p>„O co chodzi z tą kulturą w stopniach? Na co to komu?” – to pytanie zadawało sobie już wielu przed Tobą i zapewne zada je sobie wielu po Tobie.</p>
          <p>Pomyśl o tym jako o sztafecie, w której z pokolenia na pokolenie przekazujemy sobie szczególny „język”. Dzięki niemu nie tylko możesz porozumieć się z naszymi przodkami i następcami (czyli również zrozumieć ich) – bez tego języka trudno nam się dogadać między sobą nawet dzisiaj.</p>
          <p class="signature">Przełącz tryb powyżej — drogowskazy oznaczone <span class="hr-chip" style="position:static">HR</span> są zaadresowane głównie do zdobywających Harcerza Rzeczypospolitej, ale każdy może się nimi zainspirować.</p>
        </div>

        <section class="track postawa" id="kultura-p1">
          <h2><span class="idx">01</span> Trzymam klasę i zachowuję kulturę osobistą</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Znam zasady dobrego ubioru (np. wiem, jak łączyć kolory i wzory, jak dobrać rozmiar ubrania itp.), potrafię ubrać się na randkę lub formalną okazję.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Jestem punktualny i komunikuję o ewentualnych opóźnieniach.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Nie przeklinam i nie podnoszę niepotrzebnie głosu.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Znam i stosuję zasady porozumienia bez przemocy (NVC).</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Potrafię przeanalizować swoja postawę w odbytej dyskusji – również pod kątem stosowania nieuczciwych chwytów.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="kultura-p2">
          <h2><span class="idx">02</span> Wypowiadam się w sposób zrozumiały</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Potrafię przygotować i nagrać kilkuminutowe wystąpienie, poprawne pod kątem retorycznym (ustrukturyzowane, z użyciem gestykulacji, bez mówienia „yyy” itp.).</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Poznałem zasady dobrego i ciekawego pisania (np. na kursie lub z książki) i potrafię napisać artykuł, uwzględniając te zasady.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię przygotować konspekt i przeprowadzić ciekawe zajęcia na kursie zastępowych.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię porozumieć się w codziennych sytuacjach w czasie podróży za granicą.</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="kultura-p3">
          <h2><span class="idx">03</span> Poznaję klasyczne dzieła kultury i kształtuję swoją wrażliwość jako odbiorca sztuki</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Umiem przedstawić w dyskusji, w jaki sposób wybrane dzieła z kanonu lektur zmieniły moje spojrzenie na świat i wartości lub prawa nim rządzące.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Co najmniej raz w roku odwiedzam wystawę sztuki.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię, świadomie wybierając repertuar, zorganizować wyjście do teatru, opery lub filharmonii.</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Znam klasyki kina polskiego (np. filmy Kieślowskiego, Wajdy, Kawalerowicza, Koterskiego, Holland) oraz europejskiego (np. filmy Felliniego, Bergmana).</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Potrafię tańczyć dwa tańce towarzyskie.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="kultura-p4">
          <h2><span class="idx">04</span> Wyrażam się za pomocą sztuki</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Staram się uczyć technik artystycznych (również amatorsko) i tworzyć wybrane formy sztuki (np. uczę się gry na nowym instrumencie, założyłem zespół muzyczny z kolegami, gram w teatrze szkolnym, majsterkuję z elementem artystycznym).</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię podzielić się swoimi umiejętnościami artystycznymi w harcerstwie na forum szerszym niż drużyna.</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <div class="callout callout--note">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 9v4m0 4h.01M10.3 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L14.7 3.86a2 2 0 00-3.4 0z"/></svg>
          <div>
            <b>Uwaga</b>
            <div><em>Jeżeli jesteś uczniem szkoły artystycznej (np. muzycznej czy plastycznej), to prawdopodobnie ważniejsza dla Twojego rozwoju artystycznego będzie praca nad postawami opisanymi w obszarach życia „Pasje i umiejętności” oraz „Rozum i intelekt”.</em></div>
          </div>
        </div>
        <div class="pager">
          <a data-page="obszar-pasje" data-crumb-title="Pasje i umiejętności">
            <span class="lbl">Wstecz</span>
            <span class="ttl">← Drogowskazy: Pasje i umiejętności</span>
          </a>
          <a class="next" data-page="obszar-przyroda" data-crumb-title="Przyroda i puszczaństwo">
            <span class="lbl">Dalej</span>
            <span class="ttl">Drogowskazy: Przyroda i puszczaństwo →</span>
          </a>
        </div>
      </section>

<section class="page" id="page-obszar-przyroda">
        <span class="eyebrow"><span class="dot"></span>03 · Drogowskazy</span>
        <h1 class="title">Przyroda i puszczaństwo</h1>

        <div class="lede">
          <p>Harcerstwo to bezdroża, puszcza, strumienie, góry i jeziora – to świeże powietrze!</p>
          <p>Życie harcerskie nierozerwalnie związane jest ze stałym doświadczaniem przyrody. Począwszy od konieczności radzenia sobie z nieprzewidywalnością i surowością pogody, przez ciekawość i zachwyt otaczającą nas puszczą, aż do zrozumienia, że sami jesteśmy kruchą częścią natury. Świadomość odpowiedzialności człowieka i fascynacja złożonością przyrodniczego świata to kapitał, który z harcerstwa wynosimy w życie rodzinne, zawodowe i społeczne.</p>
          <p class="signature">Przełącz tryb powyżej — drogowskazy oznaczone <span class="hr-chip" style="position:static">HR</span> są zaadresowane głównie do zdobywających Harcerza Rzeczypospolitej, ale każdy może się nimi zainspirować.</p>
        </div>

        <section class="track postawa" id="przyroda-p1">
          <h2><span class="idx">01</span> Czuję się częścią świata przyrody</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Regularnie (np. raz w tygodniu) spędzam czas w otoczeniu przyrody (sportowo, rekreacyjnie, towarzysko), ograniczając korzystanie z rozpraszających dóbr cywilizacyjnych.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Potrafię biwakować w różnych warunkach pogodowych z użyciem nowoczesnych technik bushcraftowych.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Zdobyłem umiejętności niezbędne do dłuższego, kilkudniowego bytowania w terenie.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Wykształciłem nawyk wykorzystywania roweru zamiast pojazdów elektrycznych i spalinowych, świadomie wybieram środki transportu.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Znam zagrożenia wpływające na funkcjonowanie społeczeństw (np. susza hydrologiczna, klęski żywiołowe, zanieczyszczenia) – potrafię przygotować się na sytuacje kryzysowe związane z pogodą lub klimatem.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Pomyślnie przeszedłem próbę „Trzech Piór”.</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>

        <section class="track postawa" id="przyroda-p2">
          <h2><span class="idx">02</span> Rozwijam swoją wiedzę o środowisku przyrodniczym</h2>
          <ul class="wskazy">
            <li><span class="glyph">●</span><span class="txt">Korzystam z wiedzy naukowej dotyczącej zjawisk klimatycznych i przyrodniczych, weryfikuję źródła informacji w tej sprawie.</span><button class="add-btn">Dodaj</button></li>
            <li><span class="glyph">●</span><span class="txt">Mam wiedzę dotyczącą cywilizacyjnego oddziaływania na środowisko naturalne – np. procesów produkcji ubrań, wykorzystywanych materiałów i tzw. fast fashion i na jej podstawie dokonuję świadomych wyborów (np. kupuję używane ubrania).</span><button class="add-btn">Dodaj</button></li>
            <li class="hr-only"><span class="glyph">●</span><span class="txt">Śledzę, w jaki sposób kwestie dotyczące oddziaływania człowieka na środowisko wpływają na polityki publiczne i zmiany w przepisach.</span><span class="hr-chip">HR</span><button class="add-btn">Dodaj</button></li>
          </ul>
        </section>
        <div class="pager">
          <a data-page="obszar-kultura" data-crumb-title="Kultura i komunikacja">
            <span class="lbl">Wstecz</span>
            <span class="ttl">← Drogowskazy: Kultura i komunikacja</span>
          </a>
          <span></span>
        </div>
      </section>

<div class="empty-state" id="emptyState">Żaden drogowskaz nie pasuje do wyszukiwania.</div>

    </article>
  </main>

  <aside class="rail">
    <h3>Na tej stronie</h3>
    <ul class="onpage" id="onpage"></ul>

    <h3>Twoja próba</h3>
    <div class="proba-card">
      <div class="head"><b>Wybrane drogowskazy</b><span class="proba-count" id="probaCount">0</span></div>
      <ul class="proba-list" id="probaList"></ul>
      <p class="proba-empty" id="probaEmpty">Kliknij „Dodaj” przy drogowskazie, aby zebrać inspiracje do własnych zadań.</p>
      <button class="proba-cta">
        Przejdź do kreatora próby
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
      </button>
    </div>
  </aside>

</div>`;

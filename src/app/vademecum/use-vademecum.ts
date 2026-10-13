import { type RefObject, useEffect } from "react";

import { createReporter } from "./report";

const START_PAGE = { id: "start", title: "Wstęp" };
const RAIL_SCROLL_OFFSET = 110;

/**
 * Wires up the injected Vademecum markup: page switching, HO/HR mode,
 * on-page rail, search, funnel accordion, MVP-hidden trial list and the
 * report-a-correction button. Everything runs through delegated listeners
 * on the root element.
 */
export function useVademecum(rootRef: RefObject<HTMLDivElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const $ = <T extends HTMLElement = HTMLElement>(selector: string) =>
      root.querySelector<T>(selector);
    const sidebar = $("#sidebar");
    const scrim = $("#scrim");
    const shell = $(".shell");
    const modeSwitch = $("#modeSwitch");
    const railList = $("#onpage");
    const appTopTitle = $("#appTopTitle");
    const emptyState = $("#emptyState");
    const searchInput = $<HTMLInputElement>("#searchInput");
    if (!sidebar || !scrim || !shell || !modeSwitch || !railList) return;

    const reporter = createReporter(root);
    let railSections: Element[] = [];

    const setSidebarOpen = (open: boolean) => {
      sidebar.classList.toggle("open", open);
      scrim.classList.toggle("show", open);
    };

    // ----- right rail ("Na tej stronie")
    const updateActiveRailLink = () => {
      if (railSections.length === 0) return;
      let current = railSections[0];
      for (const section of railSections) {
        if (section.getBoundingClientRect().top - RAIL_SCROLL_OFFSET <= 0)
          current = section;
      }
      railList.querySelectorAll("a").forEach((a) => {
        a.classList.toggle(
          "active",
          a.getAttribute("data-target") === current.id,
        );
      });
    };

    const buildRail = (page: Element) => {
      railSections = Array.from(page.querySelectorAll("section.track[id]"));
      if (railSections.length === 0) {
        railList.innerHTML = '<li class="empty">Brak podrozdziałów</li>';
        return;
      }
      railList.innerHTML = railSections
        .map((section) => {
          const label = (section.querySelector("h2")?.textContent ?? "")
            .replace(/^[\s\d.]+/, "")
            .trim();
          return `<li><a data-target="${section.id}">${label}</a></li>`;
        })
        .join("");
      updateActiveRailLink();
    };

    // ----- pages
    const showPage = (pageId: string, title: string) => {
      const target = root.querySelector(`#page-${pageId}`);
      if (!target) return;
      root
        .querySelectorAll(".page")
        .forEach((p) => p.classList.toggle("active", p === target));
      root.querySelectorAll("[data-page]").forEach((a) => {
        a.classList.toggle("current", a.getAttribute("data-page") === pageId);
      });
      if (appTopTitle) appTopTitle.textContent = title;
      if (searchInput) searchInput.value = "";
      window.scrollTo({ top: 0 });
      reporter.hide();
      buildRail(target);
      setSidebarOpen(false);
    };

    // ----- HO / HR mode
    const setMode = (button: HTMLElement) => {
      modeSwitch
        .querySelectorAll("button")
        .forEach((b) => b.classList.toggle("active", b === button));
      const mode = button.getAttribute("data-mode");
      shell.classList.toggle("mode-ho", mode === "ho");
      shell.classList.toggle("mode-hr", mode === "hr");
    };

    // ----- funnel accordion
    const toggleFunnelStep = (button: HTMLElement) => {
      const step = button.parentElement;
      if (!step) return;
      const open = !step.classList.contains("open");
      step.classList.toggle("open", open);
      button.setAttribute("aria-expanded", String(open));
    };

    // ----- "Twoja próba" (hidden for the MVP via CSS)
    const counterNum = $("#counterNum");
    const probaCount = $("#probaCount");
    const probaList = $("#probaList");
    const probaEmpty = $("#probaEmpty");
    const refreshTrial = () => {
      const added = root.querySelectorAll<HTMLElement>("li.added");
      if (counterNum) counterNum.textContent = String(added.length);
      if (probaCount) probaCount.textContent = String(added.length);
      if (probaEmpty)
        probaEmpty.style.display = added.length === 0 ? "block" : "none";
      if (!probaList) return;
      probaList.innerHTML = "";
      added.forEach((li) => {
        const text = li.querySelector(".txt")?.textContent ?? "";
        const item = document.createElement("li");
        item.textContent = text.length > 78 ? `${text.slice(0, 75)}…` : text;
        probaList.appendChild(item);
      });
    };

    const toggleAdded = (button: HTMLElement) => {
      const li = button.closest("li");
      if (!li) return;
      const added = li.classList.toggle("added");
      button.textContent = added ? "Dodano" : "Dodaj";
      refreshTrial();
    };

    // ----- event handlers
    const handleClick = (e: Event) => {
      const target = e.target as HTMLElement;
      if (reporter.onClick(target)) return;

      if (target.closest("#openSidebar")) return setSidebarOpen(true);
      if (target.closest("#scrim")) return setSidebarOpen(false);

      const modeButton = target.closest<HTMLElement>("#modeSwitch button");
      if (modeButton) return setMode(modeButton);

      const funnelButton = target.closest<HTMLElement>(".funnel-step > .band");
      if (funnelButton) return toggleFunnelStep(funnelButton);

      const addButton = target.closest<HTMLElement>(".add-btn");
      if (addButton) return toggleAdded(addButton);

      const railLink = target.closest<HTMLElement>("#onpage a");
      if (railLink) {
        e.preventDefault();
        root
          .querySelector(`#${railLink.getAttribute("data-target")}`)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      const pageLink = target.closest<HTMLElement>("[data-page]");
      if (pageLink) {
        e.preventDefault();
        showPage(
          pageLink.getAttribute("data-page")!,
          pageLink.getAttribute("data-crumb-title") ||
            pageLink.textContent?.trim() ||
            "",
        );
      }
    };

    const handleSearch = (e: Event) => {
      if (e.target !== searchInput) return;
      const query = (searchInput?.value ?? "").trim().toLowerCase();
      const page = root.querySelector(".page.active");
      if (!page) return;
      const sections = page.querySelectorAll<HTMLElement>("section.postawa");
      let anyVisible = false;
      sections.forEach((section) => {
        let sectionMatches =
          !query ||
          (section.querySelector("h2")?.textContent ?? "")
            .toLowerCase()
            .includes(query);
        section.querySelectorAll<HTMLElement>("li").forEach((li) => {
          const text = li.querySelector(".txt")?.textContent ?? "";
          const match = !query || text.toLowerCase().includes(query);
          li.style.display = match ? "" : "none";
          sectionMatches ||= match;
        });
        section.style.display = sectionMatches ? "" : "none";
        anyVisible ||= sectionMatches;
      });
      emptyState?.classList.toggle("show", !anyVisible && sections.length > 0);
    };

    const handleHover = (e: Event) => reporter.onHover(e.target as Element);
    const handleKey = (e: Event) => reporter.onKey(e as KeyboardEvent);

    // ----- listeners
    const cleanups: Array<() => void> = [];
    const on = (
      target: EventTarget,
      type: string,
      handler: EventListener,
      options?: AddEventListenerOptions,
    ) => {
      target.addEventListener(type, handler, options);
      cleanups.push(() => target.removeEventListener(type, handler, options));
    };
    on(root, "click", handleClick);
    on(root, "input", handleSearch);
    on(root, "mouseover", handleHover);
    on(window, "scroll", updateActiveRailLink, { passive: true });
    on(window, "scroll", reporter.hide, { passive: true });
    on(window, "resize", reporter.hide);
    on(window, "keydown", handleKey);

    shell.classList.add("mode-ho");
    showPage(START_PAGE.id, START_PAGE.title);

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [rootRef]);
}

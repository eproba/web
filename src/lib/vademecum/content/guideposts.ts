import { text } from "../blocks";
import type { Page } from "../types";

export const guideposts: Page = {
  slug: "guideposts",
  chapter: "guideposts",
  title: "Drogowskazy",
  navTitle: "Obszary życia",
  description:
    "Obszary życia, postawy i drogowskazy, które pomogą Ci ułożyć zadania indywidualne.",
  icon: "signpost",
  intro: [
    text(`
      Poniżej opisaliśmy postawy, nad którymi warto pracować w ramach każdego z obszarów, wraz z drogowskazami, które prowadzą do tych postaw. Część Drogowskazów, przeznaczonych przede wszystkim dla zdobywających HR, wyróżniliśmy symbolem **HR**. Pamiętaj jednak, że jeśli zdobywasz HR-a, to wszystkie (również nieoznaczone tym symbolem) Drogowskazy są dla Ciebie.
    `),
  ],
  sections: [],
};

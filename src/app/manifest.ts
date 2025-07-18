import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Epróba",
    short_name: "Epróba",
    id: "pl.zhr.eproba",
    description:
      "Epróba – kompleksowy system zarządzania próbami na stopnie w drużynie harcerskiej.",
    start_url: "/",
    display: "standalone",
    background_color: "#06090F",
    theme_color: "#1abc9c",
    orientation: "portrait-primary",
    scope: "/",
    icons: [
      { src: "/favicon.ico", type: "image/x-icon", sizes: "32x32" },
      {
        src: "/icon-192.png",
        type: "image/png",
        sizes: "192x192",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "any",
      },
      {
        src: "/icon-192-maskable.png",
        type: "image/png",
        sizes: "192x192",
        purpose: "maskable",
      },
      {
        src: "/icon-512-maskable.png",
        type: "image/png",
        sizes: "512x512",
        purpose: "maskable",
      },
    ],
    categories: ["education", "productivity"],
    lang: "pl",
    dir: "ltr",
    related_applications: [
      {
        platform: "play",
        id: "pl.zhr.eproba.pwa",
        url: "https://play.google.com/store/apps/details?id=pl.zhr.eproba.pwa",
      },
    ],
    shortcuts: [
      {
        name: "Twoje próby",
        short_name: "Próby",
        description: "Przejdź do swoich prób",
        url: "/worksheets",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
      {
        name: "Profil",
        short_name: "Profil",
        description: "Zobacz swój profil",
        url: "/profile",
        icons: [{ src: "/icon-192.png", sizes: "192x192" }],
      },
    ],
    display_override: ["window-controls-overlay"],
    screenshots: [
      {
        src: "/screenshots/1.png",
        sizes: "1080x1920",
        type: "image/png",
        label: "Twoje próby w zasięgu ręki",
      },
      {
        src: "/screenshots/2.png",
        sizes: "1080x1920",
        type: "image/png",
        label: "Zarządzaj próbami i zadaniami",
      },
      {
        src: "/screenshots/3.png",
        sizes: "1080x1920",
        type: "image/png",
        label: "Regulamin",
      },
      {
        src: "/screenshots/4.png",
        sizes: "1080x1920",
        type: "image/png",
        label: "Statystyki drużyny",
      },
      {
        src: "/screenshots/5.png",
        sizes: "1080x1920",
        type: "image/png",
        label: "Uniwersalna aplikacja",
      },
      {
        src: "/screenshots/6.png",
        sizes: "1080x1920",
        type: "image/png",
        label: "Edycja próby",
      },
      {
        src: "/screenshots/7.png",
        sizes: "1080x1920",
        type: "image/png",
        label: "Szablony organizacji",
      },
    ],
  };
}

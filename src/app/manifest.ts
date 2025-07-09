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
    background_color: "#ffffff",
    theme_color: "#1abc9c",
    orientation: "portrait-primary",
    scope: "/",
    icons: [
      { src: "/favicon.ico", type: "image/x-icon", sizes: "32x32" },
      { src: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { src: "/icon-512.png", type: "image/png", sizes: "512x512" },
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
    prefer_related_applications: false,
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
  };
}

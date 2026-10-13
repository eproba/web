"use client";

import { useRef } from "react";

import { useVademecum } from "./use-vademecum";
import { VADEMECUM_BODY } from "./vademecum-body";
import "./vademecum.css";

/**
 * Web version of "Vademecum – Próby indywidualne na stopnie HO i HR".
 *
 * The content is markup injected as a raw string (vademecum-body.ts) and
 * styled by vademecum.css, which is scoped under `.vademecum-root` so it
 * cannot collide with the app's own design tokens (shadcn `--border`,
 * `--background`, etc.). Interactivity lives in use-vademecum.ts. The route
 * is public (see proxy.ts) and keeps no data.
 */
export default function VademecumPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useVademecum(rootRef);

  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin="anonymous"
      />
      <link
        href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Public+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
        rel="stylesheet"
      />
      <div
        ref={rootRef}
        className="vademecum-root"
        dangerouslySetInnerHTML={{ __html: VADEMECUM_BODY }}
      />
    </>
  );
}

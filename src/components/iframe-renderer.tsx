"use client";

import { useEffect, useRef, useState } from "react";

/**
 * `IframeRenderer` is a React component that renders an iframe with dynamic height adjustment.
 * It's designed to work with proxy to old version of the site, allowing it to display content from a specified URL.
 */
export function IframeRenderer({ src }: { src: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState("24px");

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const updateHeight = () => {
      try {
        const newHeight = iframe.contentWindow?.document.body.scrollHeight;
        if (newHeight) setHeight(`${newHeight}px`);
      } catch {
        // Cross-origin iframe, cannot access
      }
    };

    // Listen for resize events inside the iframe
    const onLoad = () => {
      updateHeight();
      try {
        iframe.contentWindow?.addEventListener("resize", updateHeight);

        // Observe DOM changes for more accurate height updates
        const observer = new MutationObserver(updateHeight);
        observer.observe(iframe.contentWindow!.document.body, {
          childList: true,
          subtree: true,
          attributes: true,
        });

        // Cleanup
        return () => {
          iframe.contentWindow?.removeEventListener("resize", updateHeight);
          observer.disconnect();
        };
      } catch {
        // Cross-origin iframe, cannot access
      }
    };

    iframe.addEventListener("load", onLoad);

    return () => {
      iframe.removeEventListener("load", onLoad);
    };
  }, []);

  if (!src) return null;

  return (
    <iframe
      ref={iframeRef}
      src={src}
      className="w-full mb-8"
      style={{ height }}
    />
  );
}

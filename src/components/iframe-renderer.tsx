"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";

/**
 * `IframeRenderer` is a React component that renders an iframe with dynamic height adjustment.
 * It's designed to work with proxy to old version of the site, allowing it to display content from a specified URL.
 */
export function IframeRenderer({ src }: { src: string }) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const updateHeight = () => {
      try {
        iframe.style.height = "auto"; // Reset height to auto to get accurate scrollHeight
        const newHeight = iframe.contentWindow?.document.body.scrollHeight;
        if (newHeight) containerRef.current!.style.height = `${newHeight}px`;
        iframe.style.height = `100%`; // Set height to 100% to fill the container
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
    <AnimatePresence>
      <motion.div
        ref={containerRef}
        className="w-full mb-8 transition-all duration-100"
      >
        <iframe
          ref={iframeRef}
          src={src}
          className="w-full border-none h-full"
        />
      </motion.div>
    </AnimatePresence>
  );
}

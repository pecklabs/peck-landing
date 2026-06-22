"use client";

import { sendGAEvent } from "@next/third-parties/google";
import { useEffect } from "react";

const downloadHref = "https://github.com/pecklabs/peck/releases/latest/download/Peck.dmg";

function getDownloadLocation(link) {
  if (link.closest(".hero-actions")) {
    return "hero";
  }

  if (link.closest("footer")) {
    return "footer";
  }

  return "unknown";
}

export default function DownloadTracking() {
  useEffect(() => {
    function handleClick(event) {
      if (!(event.target instanceof Element)) {
        return;
      }

      const link = event.target.closest(`a[href="${downloadHref}"]`);

      if (!link) {
        return;
      }

      sendGAEvent("event", "download_dmg", {
        href: link.href,
        location: getDownloadLocation(link)
      });
    }

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}

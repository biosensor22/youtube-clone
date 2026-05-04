"use client";

import { getDominantColor } from "@/shared/lib/hooks";
import { useEffect, useState } from "react";

export function useDominantColor(url: string) {
  const [color, setColor] = useState("255,255,255");

  useEffect(() => {
    let cancelled = false;

    async function getColor() {
      try {
        const result = await getDominantColor(url);
        if (!cancelled) setColor(result);
      } catch {
        if (!cancelled) setColor("255,255,255");
      }
    }

    if (!url) return;

    getColor();

    return () => {
      cancelled = true;
    };
  }, [url]);

  return color;
}

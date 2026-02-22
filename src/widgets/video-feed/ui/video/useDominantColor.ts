"use client";

import { getDominantColor } from "@/shared/lib/hooks";
import { useEffect, useState } from "react";

export function useDominantColor(url: string) {
  const [color, setColor] = useState("");

  useEffect(() => {
    async function getColor() {
      const result = await getDominantColor(url);
      setColor(result);
      console.log(result);
    }
    getColor();
  }, []);
  return color;
}

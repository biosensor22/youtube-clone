"use client";

import { useState, useRef } from "react";
import { createPortal } from "react-dom";

export function useCursorTooltip(
  text: string,
  options?: { delay?: number; offsetX?: number; offsetY?: number },
) {
  const { delay = 500, offsetX = 50, offsetY = 20 } = options || {};

  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  const timerRef = useRef<number | null>(null);
  const lastCoordsRef = useRef<{ x: number; y: number } | null>(null);

  const handleMouseMove = (e: MouseEvent) => {
    const newCoords = { x: e.clientX + offsetX, y: e.clientY + offsetY };

    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = window.setTimeout(() => {
      setCoords(newCoords);
      setIsVisible(true);
      lastCoordsRef.current = newCoords;
    }, delay);
  };

  const show = (e: MouseEvent) => {
    handleMouseMove(e);
    window.addEventListener("mousemove", handleMouseMove);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setIsVisible(false);
    window.removeEventListener("mousemove", handleMouseMove);
  };

  const tooltip = isVisible
    ? createPortal(
        <div
          style={{
            position: "fixed",
            top: coords.y,
            left: coords.x,
            transform: "translate(-50%, 0)",
          }}
          className="
            bg-(--bg-dark) text-white/90 font-light border-white border-[0.5px] px-3 py-1 shadow-lg
            text-xs pointer-events-none z-100
          "
        >
          {text}
        </div>,
        document.body,
      )
    : null;

  return { show, hide, tooltip };
}

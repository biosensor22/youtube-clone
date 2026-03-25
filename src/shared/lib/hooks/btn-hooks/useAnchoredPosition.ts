"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

export type AnchoredPosition = {
  left: number;
  top: number;
  width: number;
};

type UseAnchoredPositionOptions = {
  isActive?: boolean;
  verticalOffset?: number;
};

export function useAnchoredPosition<T extends HTMLElement>(
  triggerRef: RefObject<T | null>,
  options: UseAnchoredPositionOptions = {},
) {
  const { isActive = true, verticalOffset = 0 } = options;
  const frameRef = useRef<number | null>(null);
  const [position, setPosition] = useState<AnchoredPosition>({
    left: 0,
    top: 0,
    width: 0,
  });

  const updatePosition = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const rect = trigger.getBoundingClientRect();
    setPosition((prev) => {
      const next = {
        left: Math.round(rect.left),
        top: Math.round(rect.bottom + verticalOffset),
        width: Math.round(rect.width),
      };

      if (
        prev.left === next.left &&
        prev.top === next.top &&
        prev.width === next.width
      ) {
        return prev;
      }

      return next;
    });
  }, [triggerRef, verticalOffset]);

  const schedulePositionUpdate = useCallback(() => {
    if (frameRef.current !== null) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      updatePosition();
    });
  }, [updatePosition]);

  const updatePositionOnNextFrame = schedulePositionUpdate;

  useEffect(() => {
    if (!isActive) return;

    const update = () => schedulePositionUpdate();
    update();

    window.addEventListener("resize", update);

    let resizeObserver: ResizeObserver | null = null;
    if ("ResizeObserver" in window && triggerRef.current) {
      resizeObserver = new ResizeObserver(update);
      resizeObserver.observe(triggerRef.current);
    }

    return () => {
      window.removeEventListener("resize", update);
      resizeObserver?.disconnect();

      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };
  }, [isActive, schedulePositionUpdate, triggerRef]);

  return { position, updatePosition, updatePositionOnNextFrame };
}

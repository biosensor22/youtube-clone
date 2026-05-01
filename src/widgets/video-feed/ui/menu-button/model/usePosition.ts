"use client";

import { RefObject, useLayoutEffect, useState } from "react";

const positions = {
  right: "right",
  left: "left",
  top: "top",
  bottom: "bottom",
} as const;

const viewportGap = 8;

type HorizontalPosition = typeof positions.left | typeof positions.right;
type VerticalPosition = typeof positions.top | typeof positions.bottom;

type MenuPosition = {
  horizontal: HorizontalPosition;
  vertical: VerticalPosition;
};

export function usePosition(ref: RefObject<HTMLDivElement | null>) {
  const [position, setPosition] = useState<MenuPosition>({
    horizontal: positions.right,
    vertical: positions.bottom,
  });

  useLayoutEffect(() => {
    const handlePosition = () => {
      const modal = ref.current;

      if (!modal) {
        return;
      }

      const anchor = modal.offsetParent ?? modal.parentElement;
      const anchorRect =
        anchor instanceof HTMLElement
          ? anchor.getBoundingClientRect()
          : modal.getBoundingClientRect();
      const modalRect = modal.getBoundingClientRect();

      const canFitRight =
        anchorRect.left + modalRect.width + viewportGap <= window.innerWidth;
      const canFitLeft = anchorRect.right - modalRect.width - viewportGap >= 0;
      const horizontal =
        canFitRight || !canFitLeft ? positions.right : positions.left;

      const canFitBottom =
        anchorRect.bottom + modalRect.height + viewportGap <=
        window.innerHeight;
      const vertical = canFitBottom ? positions.bottom : positions.top;

      setPosition((current) =>
        current.horizontal === horizontal && current.vertical === vertical
          ? current
          : { horizontal, vertical },
      );
    };

    handlePosition();
    window.addEventListener("resize", handlePosition);
    window.addEventListener("scroll", handlePosition, true);

    return () => {
      window.removeEventListener("resize", handlePosition);
      window.removeEventListener("scroll", handlePosition, true);
    };
  }, [ref]);

  return { position };
}

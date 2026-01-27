import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type Position = "top" | "bottom" | "left" | "right";

export function useTooltip(
  text: string,
  options?: {
    delay?: number;
    position?: Position;
  },
) {
  const { delay = 500, position = "top" } = options || {};

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const show = () => {
    timeoutRef.current = window.setTimeout(() => {
      if (!triggerRef.current) return;

      const rect = triggerRef.current.getBoundingClientRect();

      const map = {
        top: {
          top: rect.top - 8,
          left: rect.left + rect.width / 2,
        },
        bottom: {
          top: rect.bottom + 8,
          left: rect.left + rect.width / 2,
        },
        left: {
          top: rect.top + rect.height / 2,
          left: rect.left - 8,
        },
        right: {
          top: rect.top + rect.height / 2,
          left: rect.right + 8,
        },
      };

      setCoords(map[position]);
      setIsOpen(true);
    }, delay);
  };

  const hide = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsOpen(false);
  };

  useEffect(() => hide, []);

  const tooltip = isOpen
    ? createPortal(
        <div
          style={{
            top: coords.top,
            left: coords.left,
            transform:
              position === "top"
                ? "translate(-50%, -100%)"
                : position === "bottom"
                  ? "translate(-50%, 35%)"
                  : position === "left"
                    ? "translate(-100%, -50%)"
                    : "translate(0, -50%)",
          }}
          className="
          fixed z-900
          rounded-sm bg-(--tip-bg-color) px-2 py-2
          text-[12px] font-normal text-white
          whitespace-nowrap
          shadow-lg
          pointer-events-none
        "
        >
          {text}
        </div>,
        document.body,
      )
    : null;

  return {
    triggerRef,
    tooltip,
    onMouseEnter: show,
    onMouseLeave: hide,
    onFocus: show,
    onBlur: hide,
  };
}

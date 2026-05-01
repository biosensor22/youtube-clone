"use client";

import { useEffect, type RefObject } from "react";

export function useLockPageScroll(
  modalRef: RefObject<HTMLElement | null>,
  scrollableSelector = ".scrollbar-side",
) {
  useEffect(() => {
    const modal = modalRef.current;

    const iframes = document.querySelectorAll("iframe");
    iframes.forEach((iframe) => (iframe.style.pointerEvents = "none"));

    const preventScroll = (e: WheelEvent | TouchEvent) => {
      const modal = modalRef.current;
      if (!modal) {
        e.preventDefault();
        return;
      }

      const scrollable = modal.querySelector(scrollableSelector) as HTMLElement;
      if (!scrollable?.contains(e.target as Node)) {
        e.preventDefault();
        return;
      }

      if (e instanceof WheelEvent) {
        const atTop = scrollable.scrollTop <= 0 && e.deltaY < 0;
        const atBottom =
          scrollable.scrollTop + scrollable.clientHeight >=
            scrollable.scrollHeight && e.deltaY > 0;
        if (atTop || atBottom) e.preventDefault();
      }
    };

    const scrollY = window.scrollY;
    const lockPagePosition = () => {
      if (window.scrollY !== scrollY) window.scrollTo(0, scrollY);
    };

    window.addEventListener("wheel", preventScroll, { passive: false });
    window.addEventListener("touchmove", preventScroll, { passive: false });
    window.addEventListener("scroll", lockPagePosition);

    return () => {
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      window.removeEventListener("scroll", lockPagePosition);
      iframes.forEach((iframe) => (iframe.style.pointerEvents = ""));
    };
  }, [modalRef, scrollableSelector]);
}

import { useAppSelector } from "@/app/providers/hooks";
import { useEffect } from "react";

export function useSideMenuScroll() {
  const isOpen = useAppSelector((state) => state.menu.isOpen);

  useEffect(() => {
    const html = document.documentElement;

    if (isOpen) {
      html.classList.add("lock-scroll");
    } else {
      html.classList.remove("lock-scroll");
    }

    return () => html.classList.remove("lock-scroll");
  }, [isOpen]);
}

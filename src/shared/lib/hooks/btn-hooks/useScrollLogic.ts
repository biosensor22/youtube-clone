"use client";

import { useRef, useState, useEffect } from "react";

export function useScrollLogic<T>(id: T) {
  const [activeId, setIsActiveId] = useState<T>(id);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeft(scrollLeft > 0);
      setShowRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  const scrollPrev = () =>
    scrollRef.current?.scrollBy({
      left: -200,
      behavior: "smooth",
    });

  const scrollNext = () =>
    scrollRef.current?.scrollBy({
      left: 200,
      behavior: "smooth",
    });

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  useEffect(() => {
    setIsActiveId(id);
  }, [id]);

  return {
    activeId,
    showLeft,
    showRight,
    scrollRef,
    checkScroll,
    setIsActiveId,
    scrollPrev,
    scrollNext,
  };
}

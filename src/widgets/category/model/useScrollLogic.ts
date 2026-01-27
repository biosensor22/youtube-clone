import { useRef, useState, useEffect } from "react";
import { useUserCategories } from "@/entities/category/model/useUserCategories";

export function useScrollLogic() {
  const userId = "user_1";
  const [activeId, setIsActiveId] = useState("t1");
  const { categories, isLoading } = useUserCategories(userId);

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
  }, [categories]);

  return {
    isLoading,
    activeId,
    showLeft,
    showRight,
    scrollRef,
    categories,
    checkScroll,
    setIsActiveId,
    scrollPrev,
    scrollNext,
  };
}

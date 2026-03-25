"use client";

import {
  CategoryButton,
  NextListBtn,
  PrevListBtn,
  useScrollLogic,
} from "@/widgets/category";

export function SearchFilters() {
  const {
    isLoading,
    activeId,
    showLeft,
    showRight,
    scrollRef,
    checkScroll,
    setIsActiveId,
    scrollPrev,
    scrollNext,
  } = useScrollLogic();

  const filters = [
    { id: "t1", label: "All" },
    { id: "t2", label: "Shorts" },
    { id: "t3", label: "Videos" },
    { id: "t4", label: "Unwatched" },
    { id: "t5", label: "Watched" },
    { id: "t6", label: "Recently uploaded" },
    { id: "t7", label: "Live" },
    { id: "t8", label: "Under 4 mins" },
    { id: "t9", label: "4–20 mins" },
    { id: "t10", label: "Over 20 mins" },
  ];

  if (isLoading) return <div className="h-13"></div>;

  return (
    <div className="group relative h-13 w-screen text-(--main-text-color) sm:w-full">
      {showLeft && (
        <div className="absolute bottom-0 left-0 z-10 flex items-center rounded-full pr-10">
          <PrevListBtn onClick={scrollPrev} />
        </div>
      )}

      <div
        ref={scrollRef}
        onScroll={checkScroll}
        className="no-scrollbar ml-2 flex h-full w-screen gap-2 overflow-x-auto scroll-smooth pt-5 sm:w-[calc(100%-20px)]"
      >
        {filters.map((filter) => (
          <CategoryButton
            key={filter.id}
            label={filter.label}
            isActive={filter.id === activeId}
            onClick={() => setIsActiveId(filter.id)}
          />
        ))}
      </div>

      {showRight && (
        <div className="absolute right-10 bottom-0 flex items-center rounded-full pl-10">
          <NextListBtn onClick={scrollNext} />
        </div>
      )}
    </div>
  );
}

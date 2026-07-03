"use client";

import { CategoryButton, NextListBtn, PrevListBtn } from "@/widgets/category";
import { useScrollLogic } from "@/shared/lib/hooks";
import { useUserCategories } from "@/entities/category";

export function CategoriesList() {
  const { categories } = useUserCategories("userId");
  const {
    activeId,
    showLeft,
    showRight,
    scrollRef,
    checkScroll,
    setIsActiveId,
    scrollPrev,
    scrollNext,
  } = useScrollLogic(categories[0]?.id ?? 0);

  return (
    <div className="relative text-(--main-text-color) sm:w-full w-screen h-13 group z-100">
      {showLeft && (
        <div className="rounded-full absolute left-0 bottom-0 z-10 flex items-center pr-10">
          <PrevListBtn onClick={scrollPrev} />
        </div>
      )}

      <div className="overflow-hidden sm:w-[calc(100%-20px)] md:w-[calc(100%-80px)] w-[calc(100%-50px)]">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex sm:w-[calc(100%-20px)] w-screen ml-2 h-full pt-5 gap-2 overflow-x-auto scroll-smooth no-scrollbar"
        >
          {categories.map((category) => (
            <CategoryButton
              key={category.id}
              label={category.label}
              isActive={category.id === activeId}
              onClick={() => setIsActiveId(category.id)}
            />
          ))}
        </div>
      </div>
      {showRight && (
        <div className="rounded-full absolute right-10 sm:left-[calc(100%-80px)] md:left-[calc(100%-150px)] bottom-0 flex items-center pl-10">
          <NextListBtn onClick={scrollNext} />
        </div>
      )}
    </div>
  );
}

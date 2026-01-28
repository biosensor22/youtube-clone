"use client";

import { CategoryButton } from "./CategoryButton";
import { NextListBtn } from "./NextListBtn";
import { PrevListBtn } from "./PrevListBtn";
import { useScrollLogic } from "../model/useScrollLogic";

export function CategoriesList() {
  const {
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
  } = useScrollLogic();

  if (isLoading) return <div className="h-13"></div>;

  return (
    <div className="relative text-white sm:w-full w-screen h-13 group z-100">
      {showLeft && (
        <div className="rounded-full absolute left-0 bottom-0 z-10 flex items-center pr-10">
          <PrevListBtn onClick={scrollPrev} />
        </div>
      )}

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

      {showRight && (
        <div className="rounded-full absolute right-10 bottom-0 flex items-center pl-10">
          <NextListBtn onClick={scrollNext} />
        </div>
      )}
    </div>
  );
}

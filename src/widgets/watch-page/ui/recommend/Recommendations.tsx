"use client";

import clsx from "clsx";
import type { VideoItem } from "@/entities/video-cards";
import { Card } from "./Card";
import { NextListIcon, PrevListIcon } from "@/shared/ui";
import { useScrollLogic } from "@/shared/lib/hooks";

export type RecommendationsProps = {
  recommendations: VideoItem[];
};

export function Recommendations({ recommendations }: RecommendationsProps) {
  const filters = [
    { id: 1, title: "All" },
    { id: 2, title: "From your search" },
    { id: 3, title: `From ${recommendations[0].author}` },
    { id: 4, title: "Related" },
    { id: 5, title: "For you" },
    { id: 6, title: "Recently uploaded" },
    { id: 7, title: "Watched" },
  ];
  const {
    activeId,
    showLeft,
    showRight,
    scrollRef,
    checkScroll,
    setIsActiveId,
    scrollPrev,
    scrollNext,
  } = useScrollLogic(filters[0]?.id ?? 0);

  return (
    <aside className="min-w-0 relative mt-1 scroll-smooth">
      <div className="flex">
        {showLeft && (
          <div className="z-100 -mt-1 absolute rounded-full hover:bg-(--hover-btn-color) cursor-pointer h-10 w-10 flex justify-center items-center">
            <PrevListIcon className="w-6 h-6" onClick={scrollPrev} />
          </div>
        )}

        <div
          className="no-scrollbar w-[95%] flex items-center gap-2 overflow-x-auto"
          style={{
            maskImage: `
      linear-gradient(to right,
        ${showLeft ? "transparent 10%" : "black 0%"},
        black 20%,
        black 80%,
        ${showRight ? "transparent 90%" : "black 100%"}
      )
    `,
          }}
          ref={scrollRef}
          onScroll={checkScroll}
        >
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setIsActiveId(filter.id)}
              className={clsx(
                "px-3 -pt-2 py-1 h-8 rounded-lg text-[14px] font-semibold cursor-pointer whitespace-nowrap",
                {
                  "bg-white text-black": filter.id === activeId,
                  "bg-(--border-color)": filter.id !== activeId,
                },
              )}
            >
              {filter.title}
            </button>
          ))}
        </div>
        {showRight && (
          <div className="z-100 -mt-1 absolute rounded-full hover:bg-(--hover-btn-color) cursor-pointer right-0 h-10 w-10 flex justify-center items-center">
            <NextListIcon onClick={scrollNext} />
          </div>
        )}
      </div>

      <div className="mt-3 space-y-2">
        {recommendations.map((video) => (
          <Card
            key={video.id}
            id={video.id}
            thumbnail={video.thumbnail}
            author={video.author}
            title={video.title}
            duration={video.duration}
            views={video.views}
            publishedAt={video.publishedAt}
          />
        ))}
      </div>
    </aside>
  );
}

"use client";

import { useState } from "react";
import type { VideoItem } from "@/entities/video-cards";
import { RecommendCard } from "./RecommendCard";
export type RecommendationsProps = {
  recommendations: VideoItem[];
};

export const recommendationFilters = [
  "All",
  "From channel",
  "Related",
  "Recently uploaded",
];

export function Recommendations({ recommendations }: RecommendationsProps) {
  const [activeFilter, setActiveFilter] = useState(recommendationFilters[0]);

  return (
    <aside className="min-w-0">
      <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
        {recommendationFilters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`h-8 shrink-0 rounded-lg px-3 text-sm font-medium ${
              activeFilter === filter
                ? "bg-white text-black"
                : "bg-(--btn-bg-color) text-(--main-text-color) hover:bg-(--hover-btn-color)"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-3 space-y-2">
        {recommendations.map((video) => (
          <RecommendCard
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

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { VideoItem } from "@/entities/video-cards";
import { timeAgo, numberConvert } from "@/shared/lib/hooks";
import {
  BlockIcon,
  ClockIcon,
  MenuIcon,
  NotIcon,
  QueueIcon,
  ReportIcon,
} from "@/shared/ui/icons";

type RecommendationsProps = {
  recommendations: VideoItem[];
};

const recommendationFilters = [
  "All",
  "From channel",
  "Related",
  "Recently uploaded",
];

const recommendationMenuItems = [
  {
    id: "queue",
    label: "Add to queue",
    icon: <QueueIcon className="h-5 w-5" />,
  },
  {
    id: "watch-later",
    label: "Save to Watch later",
    icon: <ClockIcon className="h-5 w-5" />,
  },
  { id: "not", label: "Not interested", icon: <NotIcon className="h-5 w-5" /> },
  {
    id: "block",
    label: "Don't recommend channel",
    icon: <BlockIcon className="h-5 w-5" />,
  },
  { id: "report", label: "Report", icon: <ReportIcon className="h-5 w-5" /> },
];

export function Recommendations({ recommendations }: RecommendationsProps) {
  const [activeFilter, setActiveFilter] = useState(recommendationFilters[0]);
  const [openedMenuId, setOpenedMenuId] = useState<string | null>(null);

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
                : "bg-(--btn-bg-color) text-white hover:bg-(--hover-btn-color)"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="mt-3 space-y-2">
        {recommendations.map((video) => (
          <div
            key={video.id}
            className="group relative flex gap-2 rounded-xl p-1.5 hover:bg-(--btn-bg-color)"
          >
            <Link
              href={`/watch/${video.id}`}
              className="flex min-w-0 flex-1 gap-2.5"
            >
              <div className="relative h-23.5 w-42 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="168px"
                />
                <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1 text-[11px] font-medium">
                  {video.duration}
                </span>
              </div>

              <div className="min-w-0 pr-1">
                <p className="line-clamp-2 text-[14px] font-medium leading-5">
                  {video.title}
                </p>
                <p className="mt-1 text-[12px] text-(--grey-text-color)">
                  {video.author}
                </p>
                <p className="mt-0.5 text-[12px] text-(--grey-text-color)">
                  {numberConvert(video.views)} views •{" "}
                  {timeAgo(video.publishedAt)}
                </p>
              </div>
            </Link>

            <button
              onClick={() =>
                setOpenedMenuId((prev) => (prev === video.id ? null : video.id))
              }
              aria-label="Recommendation options"
              className="mt-1 h-8 w-8 shrink-0 rounded-full p-1.5 opacity-100 hover:bg-(--hover-btn-color) sm:opacity-0 sm:group-hover:opacity-100"
            >
              <MenuIcon className="h-5 w-5" />
            </button>

            {openedMenuId === video.id ? (
              <>
                <button
                  onClick={() => setOpenedMenuId(null)}
                  className="fixed inset-0 z-20 cursor-default"
                  aria-label="Close menu"
                />
                <div className="absolute right-0 top-10 z-30 w-64 overflow-hidden rounded-xl border border-(--border-color) bg-(--dark-grey-bg) py-2 shadow-[0_8px_24px_rgba(0,0,0,0.45)]">
                  {recommendationMenuItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setOpenedMenuId(null)}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-left text-sm hover:bg-(--hover-btn-color)"
                    >
                      <span className="inline-flex h-5 w-5 items-center justify-center">
                        {item.icon}
                      </span>
                      <span>{item.label}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>
    </aside>
  );
}

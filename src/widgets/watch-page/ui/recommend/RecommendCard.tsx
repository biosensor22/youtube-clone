"use client";

import { useState } from "react";
import { MenuIcon } from "@/shared/ui/icons";
import { RecommendMenuItems } from "./RecommendMenuItems";
import { RecommendMenuItem } from "./RecommendMenuItem";
import { RecommendLink } from "./RecommendLink";

type RecommendationCardProps = {
  id: string;
  thumbnail: string;
  author: string;
  title: string;
  duration: string;
  views: number;
  publishedAt: string;
};

export function RecommendCard({
  id,
  thumbnail,
  author,
  title,
  duration,
  views,
  publishedAt,
}: RecommendationCardProps) {
  const [openedMenuId, setOpenedMenuId] = useState<string | null>(null);

  return (
    <div
      key={id}
      className="group relative flex gap-2 rounded-xl p-1.5 hover:bg-(--btn-bg-color)"
    >
      <RecommendLink
        id={id}
        thumbnail={thumbnail}
        author={author}
        title={title}
        duration={duration}
        views={views}
        publishedAt={publishedAt}
      />

      <button
        onClick={() => setOpenedMenuId((prev) => (prev === id ? null : id))}
        aria-label="Recommendation options"
        className="mt-1 h-8 w-8 shrink-0 rounded-full p-1.5 opacity-100
         hover:bg-(--hover-btn-color) sm:opacity-0 sm:group-hover:opacity-100"
      >
        <MenuIcon className="h-5 w-5" />
      </button>

      {openedMenuId === id ? (
        <>
          <button
            onClick={() => setOpenedMenuId(null)}
            className="fixed inset-0 z-20 cursor-default"
            aria-label="Close menu"
          />
          <div className="absolute top-10 right-0 z-30 bg-(--dark-grey-bg) rounded-xl w-65 flex flex-col">
            {RecommendMenuItems.map((item) => (
              <RecommendMenuItem
                key={item.id}
                id={item.id}
                icon={item.icon}
                label={item.label}
                onClose={() => setOpenedMenuId(null)}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

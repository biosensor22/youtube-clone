"use client";

import { useState } from "react";
import { MenuIcon } from "@/shared/ui/icons";
import { MenuItems } from "./MenuItems";
import { MenuItem } from "./MenuItem";
import { RecommendLink } from "./Link";

type RecommendationCardProps = {
  id: string;
  thumbnail: string;
  author: string;
  title: string;
  duration: string;
  views: number;
  publishedAt: string;
};

export function Card({
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
    <div key={id} className="group relative flex gap-2 ">
      <div className="group absolute rounded-xl hover:bg-(--btn-bg-color) h-[calc(100%+8px)] w-[calc(100%+5px)] -left-1 -top-1 " />
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
        className="absolute flex items-center rotate-90 bottom-0 right-0 h-9 w-9 shrink-0 rounded-full p-1.5 opacity-100
         hover:bg-(--hover-btn-color) sm:opacity-0 sm:group-hover:opacity-100"
      >
        <MenuIcon className="h-6 w-6" />
      </button>

      {openedMenuId === id ? (
        <>
          <button
            onClick={() => setOpenedMenuId(null)}
            className="fixed inset-0 z-20 cursor-default"
            aria-label="Close menu"
          />
          <div className="absolute top-37.5 right-0 z-30 bg-(--dark-grey-bg) rounded-xl w-65 flex flex-col">
            {MenuItems.map((item) => (
              <MenuItem
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

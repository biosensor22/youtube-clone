"use client";

import Link from "next/link";
import { MenuButton, useDominantColor } from "@/widgets/video-feed";
import { HoverBg, Thumbnail } from "./card-parts";

type PlaylistProps = {
  id: string;
  type: string;
  title: string;
  thumbnail: string;
  author: string;
  videosCount: number;
  priority: boolean;
};

export function PlaylistCard({
  id,
  type,
  title,
  thumbnail,
  author,
  priority,
}: PlaylistProps) {
  const watchPath = `/watch/${id}`;
  const dominantColor = useDominantColor(thumbnail);
  return (
    <div className="group w-full relative cursor-pointer">
      <Link href={watchPath}>
        <HoverBg thumbnail={thumbnail} />
      </Link>
      <div className="w-full pb-6 flex flex-col gap-y-3">
        <div className="relative">
          <div className="absolute -top-2.5  items-center flex flex-col w-full">
            <div
              style={{ "--bg": dominantColor } as React.CSSProperties}
              className="w-[90%] h-1 mb-px bg-[rgba(var(--bg),0.2)] border border-transparent rounded-t-3xl"
            />
            <div
              style={{ "--bg": dominantColor } as React.CSSProperties}
              className="w-[95%] h-1 bg-[rgba(var(--bg),0.5)] border border-transparent rounded-t-3xl"
            />
          </div>
          <Link href={watchPath}>
            <Thumbnail
              thumbnail={thumbnail}
              title={title}
              priority={priority}
            />
            <p className="absolute bottom-2 right-2 text-[12px] font-medium bg-black/70 rounded-md px-1 py-px">
              Mix
            </p>
          </Link>
        </div>
        <div className="gap-x-3 relative">
          <div className="absolute right-1 ">
            <MenuButton type={type} />
          </div>
          <Link href={watchPath}>
            <p className="font-medium max-w-[calc(100%-20px)]">{title}</p>
            <p className="text-[14px] text-(--grey-text-color)">{author}</p>
          </Link>
        </div>
      </div>
    </div>
  );
}

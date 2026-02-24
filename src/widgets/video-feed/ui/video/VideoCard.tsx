"use client";

import Image from "next/image";
import Link from "next/link";
import { timeAgo, viewsConvert } from "@/shared/lib/hooks";
import { MenuButton } from "@/widgets/video-feed";
import { NoteIcon } from "@/shared/ui/icons";
import { useDominantColor } from "./useDominantColor";

type VideoProps = {
  id: string;
  type: string;
  title: string;
  thumbnail: string;
  author: string;
  duration: string;
  views: number;
  authorAvatar: string;
  publishedAt: string;
  priority: boolean;
};

export function VideoCard({
  id,
  type,
  title,
  thumbnail,
  author,
  duration,
  views,
  authorAvatar,
  publishedAt,
  priority,
}: VideoProps) {
  const dominantColor = useDominantColor(thumbnail);
  return (
    <div className="group w-full relative">
      <div
        className={`w-full h-full absolute rounded-xl cursor-pointer
        group-hover:bg-[rgba(var(--bg),0.2)] bg-[rgba(var(--bg),0)] duration-150 group-hover:scale-105
        `}
        style={{ "--bg": dominantColor } as React.CSSProperties}
      />
      <div
        className={` rounded-xl pb-6 flex items-center flex-col gap-y-3 
       
        `}
      >
        <div className="relative cursor-pointer">
          <Image
            className="rounded-xl"
            width={1200}
            height={400}
            src={thumbnail}
            alt={title}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwMDAwIi8+"
            priority={priority}
          />
          <div
            className="absolute justify-center items-center flex bottom-2 right-2 text-[12px]
         font-medium bg-black/70 rounded-md px-1 py-px gap-1"
          >
            {id.startsWith("music") ? <NoteIcon /> : ""}
            <p>{duration}</p>
          </div>
        </div>
        <div className="flex gap-x-3 w-full cursor-pointer">
          <Image
            className="rounded-full w-9 h-9 "
            width={40}
            height={40}
            src={authorAvatar}
            alt={author}
            priority
          />
          <div className="w-full relative">
            <div className="absolute right-1 cursor-pointer">
              <MenuButton type={type} />
            </div>
            <div>
              <p className="font-medium cursor-pointer max-w-[calc(100%-20px)]">
                {title}
              </p>

              <Link href="/">
                <p className="text-[14px] text-(--grey-text-color) hover:text-white duration-150">
                  {author}
                </p>
              </Link>

              <div className="flex items-center gap-x-2 cursor-pointer">
                <p className="text-(--grey-text-color)">
                  {viewsConvert(views)} views
                </p>
                <p className="text-[14px] text-(--grey-text-color)">
                  {timeAgo(publishedAt)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

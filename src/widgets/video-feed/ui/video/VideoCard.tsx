"use client";

import Image from "next/image";
import Link from "next/link";
import { timeAgo } from "@/shared/lib/timeAgo";
import { viewsConvert } from "@/shared/lib/viewsConvert";
import { MenuButton } from "../menu-button/ui/MenuButton";

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
}: VideoProps) {
  return (
    <div className=" w-full min-h-89.75 flex items-center flex-col gap-y-3 px-2">
      <div className="relative">
        <Image
          className="rounded-xl"
          width={1200}
          height={400}
          src={thumbnail}
          alt={title}
        />
        <p className="absolute bottom-2 right-2 text-[12px] font-medium bg-black/70 rounded-md px-1 py-px">
          {duration}
        </p>
      </div>
      <div className="flex gap-x-3 w-full">
        <Image
          className="rounded-full w-9 h-9"
          width={40}
          height={40}
          src={authorAvatar}
          alt={author}
        />
        <div className="w-full relative">
          <div className="absolute right-0 cursor-pointer">
            <MenuButton type={type} />
          </div>
          <div>
            <p className="font-medium">{title}</p>

            <Link href="/">
              <p className="text-[14px] text-(--grey-text-color) hover:text-white duration-150">
                {author}
              </p>
            </Link>

            <div className="flex items-center gap-x-2">
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
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { viewsConvert } from "@/shared/lib/viewsConvert";

type PlaylistProps = {
  id: string;
  type: string;
  title: string;
  thumbnail: string;
  author: string;
  viewers: number;
  isLive: boolean;
  startedAt: string;
  authorAvatar: string;
};

export function StreamCard({
  id,
  type,
  title,
  thumbnail,
  author,
  viewers,
  isLive,
  startedAt,
  authorAvatar,
}: PlaylistProps) {
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
        <p className="absolute bottom-2 right-2 text-[12px] font-medium bg-(--live-red-bg) rounded-md px-1.5 py-0.5">
          LIVE
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
        <div>
          <p className="font-medium">{title}</p>
          <Link href="/">
            <p className="text-[14px] text-(--grey-text-color) hover:text-white duration-150">
              {author}
            </p>
          </Link>

          <div className="flex items-center gap-x-2">
            <p className="text-(--grey-text-color) text-[14px]">
              {viewsConvert(viewers)} watching
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import { MenuButton } from "../menu-button/ui/MenuButton";

type PlaylistProps = {
  id: string;
  type: string;
  title: string;
  thumbnail: string;
  author: string;
  videosCount: number;
};

export function PlaylistCard({
  id,
  type,
  title,
  thumbnail,
  author,
  videosCount,
}: PlaylistProps) {
  return (
    <div className="w-full min-h-89.75 flex flex-col items-center gap-y-3 px-2">
      <div className="relative ">
        <Image
          className="rounded-xl"
          width={1200}
          height={400}
          src={thumbnail}
          alt={title}
        />
        <p className="absolute bottom-2 right-2 text-[12px] font-medium bg-black/70 rounded-md px-1 py-px">
          Mix
        </p>
      </div>
      <div className="flex gap-x-3 w-full relative">
        <div className="absolute right-0 cursor-pointer">
          <MenuButton type={type} />
        </div>
        <div>
          <p className=" font-medium">{title}</p>

          <p className="text-[14px] text-(--grey-text-color)">{author}</p>
        </div>
      </div>
    </div>
  );
}

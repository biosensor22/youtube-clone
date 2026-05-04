"use client";

import Link from "next/link";
import { numberConvert } from "@/shared/lib/hooks";
import { MenuButton } from "@/widgets/video-feed";
import { LiveIcon } from "@/shared/ui/icons";
import { HoverBg, Thumbnail, Avatar } from "./card-parts";

type StreamProps = {
  id: string;
  type: string;
  title: string;
  thumbnail: string;
  author: string;
  viewers: number;
  isLive: boolean;
  startedAt: string;
  authorAvatar: string;
  priority: boolean;
};

export function StreamCard({
  id,
  type,
  title,
  thumbnail,
  author,
  viewers,
  authorAvatar,
  priority,
}: StreamProps) {
  const watchPath = `/watch/${id}`;

  return (
    <div className="group w-full relative cursor-pointer">
      <Link href={watchPath}>
        <HoverBg thumbnail={thumbnail} />
      </Link>
      <div className=" w-full pb-6 flex items-center flex-col gap-y-3">
        <Link href={watchPath} className="relative block">
          <Thumbnail thumbnail={thumbnail} title={title} priority={priority} />
          <div
            className="absolute flex justify-center items-center bottom-2 right-2 text-[12px]
         font-medium bg-(--live-red-bg) rounded-sm px-1 gap-1 py-px"
          >
            <LiveIcon className="w-3 h-3" />
            <p>LIVE</p>
          </div>
        </Link>

        <div className="flex gap-x-3 w-full relative">
          <div>
            <div className="border-2 border-(--live-red-bg) p-0.5 rounded-full w-11">
              <Avatar author={author} authorAvatar={authorAvatar} />
            </div>
            <div className="absolute text-[10px] bg-(--live-red-bg) px-0.5 rounded-sm top-7.5 left-2.75">
              LIVE
            </div>
          </div>
          <div>
            <div className="flex w-full pr-10">
              <Link href={watchPath}>
                <p className="font-medium">{title}</p>
              </Link>
              <div className="absolute right-1">
                <MenuButton type={type} />
              </div>
            </div>
            <Link className="flex" href="/">
              <p className="text-[14px] text-(--grey-text-color) hover:text-(--main-text-color) duration-150">
                {author}
              </p>
            </Link>

            <div className="flex items-center gap-x-2">
              <p className="text-(--grey-text-color) text-[14px]">
                {numberConvert(viewers)} watching
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

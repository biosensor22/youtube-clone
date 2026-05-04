"use client";

import Link from "next/link";
import { timeAgo, numberConvert } from "@/shared/lib/hooks";
import { MenuButton } from "@/widgets/video-feed";
import { HoverBg, Thumbnail, Avatar, Duration } from "./card-parts";

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
  const watchPath = `/watch/${id}`;

  return (
    <div className="group w-full relative cursor-pointer">
      <Link href={watchPath}>
        <HoverBg thumbnail={thumbnail} />
      </Link>

      <div className={`rounded-xl pb-6 flex items-center flex-col gap-y-3`}>
        <Link href={watchPath} className="relative block">
          <Thumbnail thumbnail={thumbnail} title={title} priority={priority} />

          <Duration id={id} duration={duration} />
        </Link>
        <div className="flex gap-x-3 w-full ">
          <Avatar author={author} authorAvatar={authorAvatar} />
          <div className="w-full relative">
            <div className="absolute right-1 ">
              <MenuButton type={type} />
            </div>
            <div>
              <Link href={watchPath}>
                <p className="font-medium max-w-[calc(100%-32px)]">{title}</p>
              </Link>
              <Link href="/">
                <p className="text-[14px] text-(--grey-text-color) hover:text-(--main-text-color) duration-150">
                  {author}
                </p>
              </Link>
              <div className="flex items-center gap-x-2 ">
                <p className="text-(--grey-text-color)">
                  {numberConvert(views)} views
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

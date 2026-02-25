"use client";

import Image from "next/image";
import Link from "next/link";
import { viewsConvert } from "@/shared/lib/hooks";
import { MenuButton, useDominantColor } from "@/widgets/video-feed";
import { LiveIcon } from "@/shared/ui/icons";

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
}: StreamProps) {
  const dominantColor = useDominantColor(thumbnail);

  return (
    <div className="group w-full relative">
      <div
        className={`w-full h-full absolute rounded-xl cursor-pointer
        group-hover:bg-[rgba(var(--bg),0.2)] bg-[rgba(var(--bg),0)] duration-150 group-hover:scale-105
        `}
        style={{ "--bg": dominantColor } as React.CSSProperties}
      />
      <div className=" w-full pb-6 flex items-center flex-col gap-y-3 cursor-pointer">
        <div className="relative">
          <Image
            className="rounded-xl"
            width={1200}
            height={400}
            src={thumbnail}
            alt={title}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwMDAwIi8+"
          />
          <div
            className="absolute flex justify-center items-center bottom-2 right-2 text-[12px]
         font-medium bg-(--live-red-bg) rounded-sm px-1 gap-1 py-px"
          >
            <LiveIcon className="w-3 h-3" />
            <p>LIVE</p>
          </div>
        </div>
        <div className="flex gap-x-3 w-full relative cursor-pointer">
          <div className="border-2 absolute border-(--live-red-bg) p-0.5 rounded-full h-11 w-11">
            <Image
              className="rounded-full w-9 h-9"
              width={40}
              height={40}
              src={authorAvatar}
              alt={author}
            />
          </div>
          <div className="absolute text-[10px] bg-(--live-red-bg) px-0.5 rounded-sm top-7.5 left-2.75">
            LIVE
          </div>
          <div>
            <div className="flex ml-14">
              <p className="font-medium max-w-[calc(100%-20px)]">{title}</p>
              <div className="absolute right-1 cursor-pointer">
                <MenuButton type={type} />
              </div>
            </div>
            <Link className="flex ml-14" href="/">
              <p className="text-[14px] text-(--grey-text-color) hover:text-white duration-150">
                {author}
              </p>
            </Link>

            <div className="flex ml-14 items-center gap-x-2 ">
              <p className="text-(--grey-text-color) text-[14px]">
                {viewsConvert(viewers)} watching
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

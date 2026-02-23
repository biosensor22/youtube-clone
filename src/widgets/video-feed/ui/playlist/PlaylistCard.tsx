"use client";

import Image from "next/image";
import { MenuButton } from "../menu-button/ui/MenuButton";
import { useDominantColor } from "../video/useDominantColor";

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
  const dominantColor = useDominantColor(thumbnail);
  return (
    <div className="group w-full relative">
      <div
        className={`w-full h-full -mt-4 absolute rounded-xl cursor-pointer 
        group-hover:bg-[rgba(var(--bg),0.2)] bg-[rgba(var(--bg),0)] duration-150 group-hover:scale-105
        `}
        style={{ "--bg": dominantColor } as React.CSSProperties}
      />
      <div className="w-full pb-6 flex flex-col gap-y-3">
        <div className="relative">
          <div className="absolute -top-3 cursor-pointer items-center flex flex-col w-full">
            <div
              style={{ "--bg": dominantColor } as React.CSSProperties}
              className="w-[90%] h-1.5 bg-[rgba(var(--bg),0.2)] border border-(--bg-dark) rounded-t-full"
            />
            <div
              style={{ "--bg": dominantColor } as React.CSSProperties}
              className="w-[95%] h-1.5 bg-[rgba(var(--bg),0.2)] border border-(--bg-dark) rounded-t-full"
            />
          </div>
          <Image
            className="rounded-xl"
            width={1200}
            height={400}
            src={thumbnail}
            alt={title}
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwMDAwIi8+"
          />
          <p className="absolute bottom-2 right-2 text-[12px] font-medium bg-black/70 rounded-md px-1 py-px">
            Mix
          </p>
        </div>
        <div className="flex gap-x-3 w-full relative">
          <div className="absolute right-1 cursor-pointer">
            <MenuButton type={type} />
          </div>
          <div>
            <p className="cursor-pointer font-medium max-w-[calc(100%-20px)]">
              {title}
            </p>

            <p className="text-[14px] text-(--grey-text-color) cursor-pointer">
              {author}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

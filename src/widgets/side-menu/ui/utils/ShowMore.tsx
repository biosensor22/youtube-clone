"use client";

import clsx from "clsx";
import Link from "next/link";
import { NextListIcon } from "@/shared/ui/icons";
import { usePress } from "@/shared/lib/hooks";

type ShowMoreProps = {
  isActive: boolean;
};

export function ShowMore({ isActive }: ShowMoreProps) {
  const { pressed, onPress, onRelease } = usePress();

  return (
    <Link
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      className={clsx(
        "px-3 gap-4.5 h-10 rounded-xl text-white text-sm flex justify-start items-center bg-transparent",
        {
          "bg-(--active-btn-color)": pressed,
          "hover:bg-(--hover-btn-color)": !pressed,
        },
      )}
      href=""
    >
      <NextListIcon
        className={clsx({
          "rotate-270": isActive,
          "rotate-90": !isActive,
        })}
      />
      <p>{isActive ? "Show fewer" : "Show More"}</p>
    </Link>
  );
}

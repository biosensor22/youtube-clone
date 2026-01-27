"use client";

import Link from "next/link";
import { NextListIcon } from "@/shared/ui/icons/category-icons/NextListIcon";
import { usePress } from "@/shared/ui/hooks/usePress";

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
      className={`px-3 gap-4.5 h-10 rounded-xl text-white text-sm flex justify-start items-center
					${
            pressed
              ? "bg-(--active-btn-color)"
              : "hover:bg-(--hover-btn-color) bg-transparent"
          }`}
      href=""
    >
      <NextListIcon className={` ${isActive ? "rotate-270" : "rotate-90"}`} />
      <p>{isActive ? "Show fewer" : "Show More"}</p>
    </Link>
  );
}

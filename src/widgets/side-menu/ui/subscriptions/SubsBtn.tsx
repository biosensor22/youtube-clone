"use client";

import Link from "next/link";
import { NextListIcon } from "@/shared/ui/icons/category-icons/NextListIcon";
import { usePress } from "@/shared/ui/hooks/usePress";

export function SubsBtn() {
  const { pressed, onPress, onRelease } = usePress();

  return (
    <Link
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      className={`px-3 h-10 rounded-xl text-white font-semibold flex justify-start items-center
					${
            pressed
              ? "bg-(--active-btn-color)"
              : "hover:bg-(--hover-btn-color) bg-transparent"
          }`}
      href=""
    >
      <p>Subscriptions</p>
      <NextListIcon className="w-4 mt-0.5 ml-2" />
    </Link>
  );
}

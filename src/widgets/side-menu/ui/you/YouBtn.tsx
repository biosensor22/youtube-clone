"use client";

import clsx from "clsx";
import Link from "next/link";
import { NextListIcon } from "@/shared/ui/icons";
import { usePress } from "@/shared/lib/hooks";

export function YouBtn() {
  const { pressed, onPress, onRelease } = usePress();

  return (
    <Link
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      className={clsx(
        "px-3 h-10 rounded-xl text-(--main-text-color) font-semibold flex justify-start items-center bg-transparent",
        {
          "bg-(--active-btn-color)": pressed,
          "hover:bg-(--hover-btn-color)": !pressed,
        },
      )}
      href=""
    >
      <p>You</p>
      <NextListIcon className="w-4 mt-0.5 ml-2" />
    </Link>
  );
}

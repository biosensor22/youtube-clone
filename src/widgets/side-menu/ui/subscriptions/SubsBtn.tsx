"use client";

import clsx from "clsx";
import Link from "next/link";
import { NextListIcon } from "@/shared/ui/icons";
import { usePress } from "@/shared/lib/hooks";

export function SubsBtn() {
  const { pressed, onPress, onRelease } = usePress();

  return (
    <Link
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      className={clsx(
        "px-3 h-10 rounded-xl text-(--main-text-color) font-semibold flex justify-start items-center",
        pressed
          ? "bg-(--active-btn-color)"
          : "bg-transparent hover:bg-(--hover-btn-color)",
      )}
      href=""
    >
      <p>Subscriptions</p>
      <NextListIcon className="w-4 mt-0.5 ml-2" />
    </Link>
  );
}

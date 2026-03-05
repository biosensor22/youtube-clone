"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePress } from "@/shared/lib/hooks";

interface BtnProps {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export function NavBtn({ label, path, icon }: BtnProps) {
  const { pressed, onPress, onRelease } = usePress();
  return (
    <Link
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      href={path}
      className={clsx(
        "flex text-sm text-(--main-text-color) mt-1 rounded-xl px-3 py-2 gap-5.5 bg-transparent",
        {
          "bg-(--active-btn-color)": pressed,
          "hover:bg-(--hover-btn-color)": !pressed,
        },
      )}
    >
      {icon}
      <p>{label}</p>
    </Link>
  );
}

"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePress } from "@/shared/lib/hooks";

interface BtnProps {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export function SideBarButton({ label, path, icon }: BtnProps) {
  const { pressed, onPress, onRelease } = usePress();

  return (
    <Link
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      className={clsx(
        "text-(--main-text-color) justify-center flex flex-col items-center text-[10px] gap-1 w-16 py-4 rounded-xl bg-transparent",
        {
          "bg-(--active-btn-color)": pressed,
          "hover:bg-(--hover-btn-color)": !pressed,
        },
      )}
      href={path}
    >
      {icon}
      {label}
    </Link>
  );
}

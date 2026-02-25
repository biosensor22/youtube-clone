"use client";

import clsx from "clsx";
import Link from "next/link";
import { SettingsIcon } from "@/shared/ui/icons";
import { usePress } from "@/shared/lib/hooks";

export function SettingsBtn() {
  const { pressed, onPress, onRelease } = usePress();

  return (
    <Link
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      href="/"
      className={clsx("p-2 rounded-full bg-transparent", {
        "bg-(--active-btn-color)": pressed,
        "hover:bg-(--hover-btn-color)": !pressed,
      })}
    >
      <SettingsIcon />
    </Link>
  );
}

"use client";

import Link from "next/link";
import clsx from "clsx";
import { HomeIcon } from "@/shared/ui/icons";
import { useCursorToolTip, usePress } from "@/shared/lib/hooks";
import { urlPaths } from "@/shared/api/urlPaths";

type HomeLinkProps = {
  isActive: string;
  onActive: () => void;
};

export function HomeLink({ isActive, onActive }: HomeLinkProps) {
  const { pressed, onPress, onRelease } = usePress();
  const tooltip = useCursorToolTip("Home", { delay: 500 });

  return (
    <Link
      onMouseEnter={(e) => tooltip.show(e.nativeEvent)}
      onMouseLeave={() => {
        tooltip.hide();
        onRelease();
      }}
      onClick={onActive}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      className={clsx("flex rounded-xl px-3 py-2 gap-5 ", {
        "bg-(--btn-bg-color)": isActive === urlPaths.home,
        "active:bg-(--active-btn-color)": pressed,
        "hover:bg-(--hover-btn-color)": !pressed,
      })}
      href="/"
    >
      <HomeIcon isActive={isActive} />
      {tooltip.tooltip}

      <p>Home</p>
    </Link>
  );
}

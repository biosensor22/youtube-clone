"use client";

import clsx from "clsx";
import Link from "next/link";
import { ShortsIcon } from "@/shared/ui/icons";
import { useCursorToolTip, usePress } from "@/shared/lib/hooks";
import { urlPaths } from "@/shared/api/urlPaths";
import { close } from "@/widgets/side-menu/model";
import { useDispatch } from "react-redux";

type ShortsLinkProps = {
  isActive: string;
  onActive: () => void;
};

export function ShortsLink({ isActive, onActive }: ShortsLinkProps) {
  const dispatch = useDispatch();
  const { pressed, onPress, onRelease } = usePress();
  const tooltip = useCursorToolTip("Shorts", { delay: 500 });

  return (
    <Link
      onMouseEnter={(e) => tooltip.show(e.nativeEvent)}
      onMouseLeave={() => {
        tooltip.hide();
        onRelease();
      }}
      onClick={() => {
        onActive();
        dispatch(close());
      }}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      className={clsx("flex rounded-xl px-3 py-2 gap-5 ", {
        "bg-(--btn-bg-color)": isActive === urlPaths.shorts,
        "active:bg-(--active-btn-color)": pressed,
        "hover:bg-(--hover-btn-color)": !pressed,
      })}
      href="/shorts"
    >
      <ShortsIcon isActive={isActive} />
      {tooltip.tooltip}

      <p>Shorts</p>
    </Link>
  );
}

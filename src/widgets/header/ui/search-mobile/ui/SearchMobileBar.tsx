"use client";

import clsx from "clsx";

import { SearchIcon } from "@/shared/ui/icons";
import { useToolTip, usePress } from "@/shared/lib/hooks";

export function SearchMobileBar() {
  const { pressed, onPress, onRelease } = usePress();
  const {
    triggerRef,
    onMouseEnter,
    onMouseLeave,
    tooltip: tooltipNode,
  } = useToolTip("Search", { delay: 100, position: "bottom" });

  return (
    <div
      ref={triggerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => {
        onMouseLeave();
        onRelease();
      }}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      className={clsx(
        "rounded-full p-1 transition-colors duration-150 cursor-pointer bg-transparent",
        {
          "bg-(--active-btn-color)": pressed,
          "hover:bg-(--hover-btn-color)": !pressed,
        },
      )}
    >
      <SearchIcon />
      {tooltipNode}
    </div>
  );
}

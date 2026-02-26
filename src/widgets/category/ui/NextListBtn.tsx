"use client";

import clsx from "clsx";
import { NextListIcon } from "@/shared/ui/icons";
import { useToolTip, usePress } from "@/shared/lib/hooks";

interface NextListBtnProps {
  onClick?: () => void;
}

export function NextListBtn({ onClick }: NextListBtnProps) {
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
      className="bg-4 rounded-full bg-(--category-btn)"
    >
      <div
        onMouseDown={onPress}
        onMouseUp={() => {
          onRelease();
          onClick?.();
        }}
        onMouseLeave={onRelease}
        className={clsx(
          "rounded-full cursor-pointer p-1.5 scale-125 transition-colors duration-150 bg-transparent",
          {
            "bg-(--active-btn-color)": pressed,
            "hover:bg-(--hover-btn-color)": !pressed,
          },
        )}
      >
        <NextListIcon />
        {tooltipNode}
      </div>
    </div>
  );
}

"use client";

import clsx from "clsx";
import { MicroIcon } from "@/shared/ui/icons";
import { useToolTip, usePress } from "@/shared/lib/hooks";

export function VoiceSearch() {
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
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={() => {
        onMouseLeave();
        onRelease();
      }}
      className={clsx(
        "items-center justify-center flex w-full rounded-full cursor-pointer",
        {
          "active:bg-(--active-btn-color)": pressed,
          "hover:bg-(--hover-btn-color)": !pressed,
        },
      )}
    >
      <MicroIcon />
      {tooltipNode}
    </div>
  );
}

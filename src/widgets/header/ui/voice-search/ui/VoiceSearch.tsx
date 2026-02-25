"use client";

import clsx from "clsx";
import { MicroIcon } from "@/shared/ui/icons";
import { useToolTip, usePress } from "@/shared/lib/hooks";

export function VoiceSearch() {
  const { pressed, onPress, onRelease } = usePress();
  const tooltip = useToolTip("Search with your voice", {
    delay: 100,
    position: "bottom",
  });

  return (
    <div
      ref={tooltip.triggerRef}
      onMouseEnter={tooltip.onMouseEnter}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={() => {
        (tooltip.onMouseLeave(), onRelease());
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
      {tooltip.tooltip}
    </div>
  );
}

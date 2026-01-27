"use client";

import { MicroIcon } from "@/shared/ui/icons/header-icons";
import { usePress } from "@/shared/ui/hooks/usePress";
import { useTooltip } from "@/shared/ui/hooks/useToolTip";

export function VoiceSearch() {
  const { pressed, onPress, onRelease } = usePress();
  const tooltip = useTooltip("Search with your voice", {
    delay: 100,
    position: "bottom",
  });

  return (
    <div
      ref={tooltip.triggerRef}
      onMouseEnter={tooltip.onMouseEnter}
      onMouseLeave={() => {
        tooltip.onMouseLeave(), onRelease();
      }}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      className={`items-center justify-center flex w-full rounded-full
				cursor-pointer 
				${pressed ? "active:bg-(--active-btn-color)" : "hover:bg-(--hover-btn-color)"}
				`}
    >
      <MicroIcon />
      {tooltip.tooltip}
    </div>
  );
}

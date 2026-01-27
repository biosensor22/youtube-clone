"use client";

import { SearchIcon } from "@/shared/ui/icons/header-icons";
import { usePress } from "@/shared/ui/hooks/usePress";
import { useTooltip } from "@/shared/ui/hooks/useToolTip";

export function SearchMobileBar() {
  const { pressed, onPress, onRelease } = usePress();
  const tooltip = useTooltip("Search", {
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
      className={`
         rounded-full p-1
        transition-colors duration-150 cursor-pointer
        ${
          pressed
            ? "bg-(--active-btn-color)"
            : "hover:bg-(--hover-btn-color) bg-transparent"
        }
      `}
    >
      <SearchIcon />
      {tooltip.tooltip}
    </div>
  );
}

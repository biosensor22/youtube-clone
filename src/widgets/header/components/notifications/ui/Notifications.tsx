"use client";

import { usePress } from "@/shared/ui/hooks/usePress";
import { NotificationIcon } from "@/shared/ui/icons/header-icons";
import { useTooltip } from "@/shared/ui/hooks/useToolTip";

export function Notifications() {
  const { pressed, onPress, onRelease } = usePress();
  const tooltip = useTooltip("Notifications", {
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
        inline-flex rounded-full p-2
        transition-colors duration-150 cursor-pointer mx-2.5
        ${
          pressed
            ? "bg-(--active-btn-color)"
            : "hover:bg-(--hover-btn-color) bg-transparent"
        }
      `}
    >
      <NotificationIcon />
      {tooltip.tooltip}
    </div>
  );
}

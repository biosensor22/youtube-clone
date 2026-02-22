"use client";

import { usePress } from "@/shared/lib/hooks";
import { NotificationIcon } from "@/shared/ui/icons";
import { useToolTip } from "@/shared/lib/hooks";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggle } from "@/widgets/header/ui/notifications/model";
import { useNotificationContext } from "./NotificationContext";

export function NotificationBtn() {
  const dispatch = useDispatch();
  const { triggerRef: contextRef } = useNotificationContext();
  const { pressed, onPress, onRelease } = usePress();
  const tooltip = useToolTip("Notifications", {
    delay: 100,
    position: "bottom",
  });

  useEffect(() => {
    if (tooltip.triggerRef.current) {
      contextRef.current = tooltip.triggerRef.current;
    }
  }, [tooltip.triggerRef, contextRef]);

  const handleToggle = () => {
    dispatch(toggle());
  };

  return (
    <div
      onClick={handleToggle}
      ref={tooltip.triggerRef}
      onMouseEnter={tooltip.onMouseEnter}
      onMouseLeave={() => {
        tooltip.onMouseLeave();
        onRelease();
      }}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      className={`inline-flex rounded-full p-2 relative transition-colors duration-150 cursor-pointer mx-2.5 ${
        pressed
          ? "bg-(--active-btn-color)"
          : "hover:bg-(--hover-btn-color) bg-transparent"
      }`}
    >
      <NotificationIcon />
      {tooltip.tooltip}
    </div>
  );
}

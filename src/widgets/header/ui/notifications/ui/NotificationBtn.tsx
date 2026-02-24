"use client";

import { NotificationIcon } from "@/shared/ui/icons";
import { useToolTip, usePress } from "@/shared/lib/hooks";

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
      className={`inline-flex rounded-full p-2 relative transition-colors duration-150 cursor-pointer mx-2.5
        text-white text-[9px]
         ${
           pressed
             ? "bg-(--active-btn-color)"
             : "hover:bg-(--hover-btn-color) bg-transparent"
         }`}
    >
      <div className="h-3 w-3 right-2 top-2 bg-red-600 rounded-full absolute flex justify-center items-center">
        4
      </div>
      <NotificationIcon />
      {tooltip.tooltip}
    </div>
  );
}

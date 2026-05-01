"use client";

import clsx from "clsx";
import { NotificationIcon } from "@/shared/ui/icons";
import { useToolTip, usePress } from "@/shared/lib/hooks";
import { useEffect } from "react";
import { useNotificationContext } from "./NotificationContext";
import { useCountNotif } from "@/entities/notifications";
import { markAllRead } from "@/features/notifications/mark-all-read/api/markAllRead";

export function NotificationBtn() {
  const { countOfNotif, clearNotifCount } = useCountNotif();
  const { triggerRef: contextRef, open, toggle } = useNotificationContext();
  const { pressed, onPress, onRelease } = usePress();
  const {
    triggerRef,
    onMouseEnter,
    onMouseLeave,
    tooltip: tooltipNode,
  } = useToolTip("Search", { delay: 100, position: "bottom" });

  useEffect(() => {
    if (triggerRef.current) {
      contextRef.current = triggerRef.current;
    }
  }, [triggerRef, contextRef]);

  const handleClick = () => {
    clearNotifCount();
    toggle();
    void markAllRead();
  };

  const handleMouseLeave = () => {
    onMouseLeave();
    onRelease();
  };

  return (
    <div
      onClick={handleClick}
      ref={triggerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      className={clsx(
        "inline-flex rounded-full p-2 relative transition-colors duration-150 cursor-pointer mx-2.5 text-(--main-text-color) text-[12px] bg-transparent",
        {
          "bg-(--active-btn-color)": pressed,
          "hover:bg-(--hover-btn-color)": !pressed,
        },
      )}
    >
      <div
        className={clsx(
          "h-5 min-w-5 px-1 left-5 top-1 mb-1 border-2 border-black bg-red-600 rounded-full absolute flex justify-center items-center",
          {
            hidden: countOfNotif === 0,
            block: countOfNotif > 0,
          },
        )}
      >
        <p className="mb-0.5">{countOfNotif > 9 ? "9+" : countOfNotif}</p>
      </div>
      <NotificationIcon />
      {tooltipNode}
    </div>
  );
}

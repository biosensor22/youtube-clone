"use client";

import clsx from "clsx";
import { NotificationIcon } from "@/shared/ui/icons";
import { useToolTip, usePress } from "@/shared/lib/hooks";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toggle } from "@/widgets/header/ui/notifications/model";
import { useNotificationContext } from "./NotificationContext";
import { useCountNotif, fetchClearNotif } from "@/entities/notifications";

export function NotificationBtn() {
  const { countOfNotif, clearNotifCount } = useCountNotif();
  const dispatch = useDispatch();
  const { triggerRef: contextRef } = useNotificationContext();
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

  const handleToggle = () => {
    dispatch(toggle());
  };

  return (
    <div
      onClick={() => {
        clearNotifCount();
        handleToggle();
        fetchClearNotif();
      }}
      ref={triggerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => {
        onMouseLeave();
        onRelease();
      }}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      className={clsx(
        "inline-flex rounded-full p-2 relative transition-colors duration-150 cursor-pointer mx-2.5 text-white text-[12px] bg-transparent",
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

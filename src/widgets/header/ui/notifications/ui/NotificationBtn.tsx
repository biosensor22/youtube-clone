"use client";

import clsx from "clsx";
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
      onClick={handleToggle}
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
      <div className="h-5 w-5 right-0 top-1 mb-1 border-2 border-black bg-red-600 rounded-full absolute flex justify-center items-center">
        <p className="mb-0.5">4</p>
      </div>
      <NotificationIcon />
      {tooltipNode}
    </div>
  );
}

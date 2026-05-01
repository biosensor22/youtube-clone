"use client";

import clsx from "clsx";
import { ArrowIcon } from "@/shared/ui";
import { usePress } from "@/shared/lib/hooks";
import { useMenuLogic } from "@/widgets/header/ui/profile-menu";

export function BackBtn() {
  const { pressed, onPress, onRelease } = usePress();
  const handleBack = useMenuLogic("to-profile");

  return (
    <div className="flex  items-center mt-1 px-1">
      <div
        onMouseDown={onPress}
        onMouseUp={onRelease}
        className={clsx(
          "w-10 h-10 rounded-full justify-center flex cursor-pointer",
          {
            "bg-(--active-btn-color)": pressed,
            "hover:bg-(--hover-btn-color)": !pressed,
          },
        )}
        onClick={handleBack}
      >
        <ArrowIcon className="w-6.5 text-white" />
      </div>
      <p className="text-[16px] ml-1">Accounts</p>
    </div>
  );
}

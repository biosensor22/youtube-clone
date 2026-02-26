"use client";

import clsx from "clsx";
import { PlusIcon } from "@/shared/ui/icons";
import { usePress } from "@/shared/lib/hooks";
import { useDispatch } from "react-redux";
import { toggle } from "@/widgets/header/ui/create-btn/model";

export function CreateButton() {
  const { pressed, onPress, onRelease } = usePress();
  const dispatch = useDispatch();

  const handleToggle = () => {
    dispatch(toggle());
  };

  return (
    <div
      onClick={handleToggle}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      className={clsx(
        "text-white font-semibold bg-(--btn-bg-color) rounded-full px-2.75 h-9 justify-center flex cursor-pointer",
        {
          "active:bg-(--active-btn-color)": pressed,
          "hover:bg-(--hover-btn-color)": !pressed,
        },
      )}
    >
      <div className="flex justify-center items-center gap-2">
        <PlusIcon />
        <p className="text-sm">Create</p>
      </div>
    </div>
  );
}

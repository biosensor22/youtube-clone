"use client";

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
      className={`text-white font-semibold bg-(--btn-bg-color) rounded-full px-2.75 h-9 justify-center flex cursor-pointer
        ${
          pressed
            ? "active:bg-(--active-btn-color)"
            : "hover:bg-(--hover-btn-color)"
        }
				
        `}
    >
      <div className="flex justify-center items-center gap-2">
        <PlusIcon />
        <p className="text-sm">Create</p>
      </div>
    </div>
  );
}

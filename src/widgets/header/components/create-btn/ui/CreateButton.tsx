"use client";

import { PlusIcon } from "@/shared/ui/icons/header-icons";
import { usePress } from "@/shared/ui/hooks/usePress";

export function CreateButton() {
  const { pressed, onPress, onRelease } = usePress();

  return (
    <div
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      className={`text-white font-semibold bg-(--btn-bg-color) rounded-full px-2.75 py-1.5 h-10 justify-center flex cursor-pointer
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

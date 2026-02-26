"use client";

import { toggle } from "@/widgets/side-menu/model";
import { useDispatch } from "react-redux";

import { BurgerBtnIcon } from "@/shared/ui/icons";
import { usePress } from "@/shared/lib/hooks";
import clsx from "clsx";

export function SideMenuBtn() {
  const { pressed, onPress, onRelease } = usePress();
  const dispatch = useDispatch();

  const toggleHandler = () => {
    dispatch(toggle());
  };

  return (
    <div
      onClick={toggleHandler}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      className={clsx(
        "inline-flex rounded-full p-2 transition-colors duration-150 cursor-pointer",
        pressed
          ? "bg-(--active-btn-color)"
          : "bg-transparent hover:bg-(--hover-btn-color)",
      )}
    >
      <BurgerBtnIcon />
    </div>
  );
}

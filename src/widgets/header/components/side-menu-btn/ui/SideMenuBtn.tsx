"use client";

import { toggle } from "@/widgets/side-menu/model/menuSlice";
import { useDispatch } from "react-redux";

import { BurgerBtnIcon } from "@/shared/ui/icons/header-icons";
import { usePress } from "@/shared/ui/hooks/usePress";

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
      className={`
        inline-flex rounded-full p-2
        transition-colors duration-150 cursor-pointer
        ${
          pressed
            ? "bg-(--active-btn-color)"
            : "hover:bg-(--hover-btn-color) bg-transparent"
        }
      `}
    >
      <BurgerBtnIcon />
    </div>
  );
}

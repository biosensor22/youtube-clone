"use client";

import { useMenuOpen } from "../model/useMenuOpen";
import { ModalMenu } from "./ModalMenu";
import { MenuIcon } from "@/shared/ui/icons/feed-icons";
import { useRef } from "react";
import { usePress } from "@/shared/ui/hooks/usePress";
import { useClickOutside } from "../model/useClickOutside";

type MenuBtnProps = {
  type: string;
};

export function MenuButton({ type }: MenuBtnProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { opened, menuRef, onSwitch, onClose } = useMenuOpen();
  const { pressed, onPress, onRelease } = usePress();
  useClickOutside({ menuRef, opened, onClose });

  return (
    <div
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      className={`rounded-full p-1.5 absolute -right-2 -top-1
        ${
          pressed
            ? "bg-(--active-btn-color)"
            : "hover:bg-(--hover-btn-color) bg-transparent"
        }
        `}
    >
      <MenuIcon onClick={onSwitch} />

      <div
        ref={menuRef}
        className={`
          absolute $
          ${
            opened
              ? "opacity-100 pointer-events-auto z-9"
              : "opacity-0 pointer-events-none -z-100"
          }
        `}
      >
        <ModalMenu ref={modalRef} type={type} />
      </div>
    </div>
  );
}

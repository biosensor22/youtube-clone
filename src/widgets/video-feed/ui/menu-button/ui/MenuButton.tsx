"use client";

import clsx from "clsx";
import { useRef, useEffect } from "react";
import { ModalMenu } from "./ModalMenu";
import { MenuIcon } from "@/shared/ui/icons";
import { useLockPageScroll, usePress } from "@/shared/lib/hooks";
import { useClickOutside, useMenuOpen } from "@/widgets/video-feed";

type MenuBtnProps = {
  type: string;
};

export function MenuButton({ type }: MenuBtnProps) {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const { opened, menuRef, onSwitch, onClose } = useMenuOpen();
  const { pressed, onPress, onRelease } = usePress();
  useClickOutside({ menuRef, opened, onClose });

  useEffect(() => {
    const classList = document.documentElement.classList;

    if (opened) {
      classList.add("lock-scroll");
    } else {
      classList.remove("lock-scroll");
    }
    return () => classList.remove("lock-scroll");
  }, [opened]);

  return (
    <div
      onClick={onSwitch}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      className={clsx(
        "rounded-full p-1.5 absolute -right-2 -top-1",
        pressed
          ? "bg-(--active-btn-color)"
          : "bg-transparent hover:bg-(--hover-btn-color)",
      )}
    >
      <MenuIcon />

      <div
        ref={menuRef}
        className={clsx(
          "absolute",
          opened
            ? "opacity-100 pointer-events-auto z-9"
            : "opacity-0 pointer-events-none -z-100",
        )}
      >
        <ModalMenu ref={modalRef} type={type} />
      </div>
    </div>
  );
}

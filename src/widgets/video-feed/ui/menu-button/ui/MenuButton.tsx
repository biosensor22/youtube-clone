"use client";

import { useMenuOpen } from "../model/useMenuOpen";
import { ModalMenu } from "./ModalMenu";
import { MenuIcon } from "@/shared/ui/icons/feed-icons";
import { useEffect } from "react";

type MenuBtnProps = {
  type: string;
};

export function MenuButton({ type }: MenuBtnProps) {
  const { opened, menuRef, onSwitch, onClose } = useMenuOpen();

  useEffect(() => {
    function clickOutsite(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    document.addEventListener("click", clickOutsite);

    return () => {
      document.removeEventListener("click", clickOutsite);
    };
  }, [opened]);
  return (
    <div>
      <MenuIcon onClick={onSwitch} />

      <div
        ref={menuRef}
        className={`${opened ? "opacity-100 pointer-events-auto z-9" : "opacity-0 pointer-events-none -z-100"}
        absolute 
        `}
      >
        <ModalMenu type={type} />
      </div>
    </div>
  );
}

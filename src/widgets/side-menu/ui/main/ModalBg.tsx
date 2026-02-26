"use client";

import clsx from "clsx";
import { close } from "@/widgets/side-menu/model";
import { useAppDispatch, useAppSelector } from "@/app/providers/hooks";

export function ModalBg() {
  const isOpen = useAppSelector((state) => state.menu.isOpen);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(close());
  };

  return (
    <div
      onClick={handleClose}
      className={clsx(
        "fixed w-screen inset-0 bg-black/40 transition-opacity duration-100",
        {
          "opacity-100 z-100": isOpen,
          "opacity-0 -z-10": !isOpen,
        },
      )}
    />
  );
}

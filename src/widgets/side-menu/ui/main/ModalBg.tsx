"use client";

import { useAppSelector } from "@/app/providers/hooks";
import { close } from "../../model";
import { useDispatch } from "react-redux";

export function ModalBg() {
  const isOpen = useAppSelector((state) => state.menu.isOpen);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(close());
  };

  return (
    <div
      onClick={handleClose}
      className={`fixed inset-0 bg-black/40 duration-100
			${isOpen ? "opacity-100 z-100" : "opacity-0 -z-10"}
				`}
    ></div>
  );
}

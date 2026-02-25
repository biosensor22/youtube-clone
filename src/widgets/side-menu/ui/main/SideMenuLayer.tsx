"use client";

import clsx from "clsx";
import { useAppSelector } from "@/app/providers/hooks";

export function SideMenuLayer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isOpen = useAppSelector((state) => state.menu.isOpen);

  return (
    <div
      className={clsx(
        "fixed top-0 -left-60 h-full bg-(--bg-dark) pt-2 transition-all ease-in-out duration-300",
        {
          "translate-x-60 w-60 pointer-events-auto z-100 opacity-100": isOpen,
          "w-0 pointer-events-none opacity-0 -z-10": !isOpen,
        },
      )}
    >
      {children}
    </div>
  );
}

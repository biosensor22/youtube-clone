"use client";

import { forwardRef } from "react";
import { MenuCard } from "./MenuCard";

type MenuBtnProps = {
  type: string;
};

export type BtnItems = {
  id: number;
  label: string;
  icon: React.ReactNode;
};

export const ModalMenu = forwardRef<HTMLDivElement, MenuBtnProps>(
  ({ type }, ref) => {
    return <MenuCard type={type} ref={ref} />;
  },
);

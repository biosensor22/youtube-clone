"use client";

import { useRef, useState } from "react";

export function useMenuOpen() {
  const [opened, setOpened] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const onSwitch = () => setOpened((prev) => !prev);
  const onClose = () => setOpened(false);

  return { opened, menuRef, onSwitch, onClose };
}

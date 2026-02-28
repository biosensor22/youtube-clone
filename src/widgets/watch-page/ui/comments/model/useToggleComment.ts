"use client";

import { useRef, useState } from "react";
import { useClickOutside } from "@/shared/lib/hooks";

export function useToggleComment() {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const optionsTriggerRef = useRef<HTMLButtonElement>(null);
  const { modalRef } = useClickOutside(optionsTriggerRef, () =>
    setIsOptionsOpen(false),
  );

  const optionsToggle = () => {
    setIsOptionsOpen((prev) => !prev);
  };
  const optionsClose = () => {
    setIsOptionsOpen(false);
  };

  return {
    optionsClose,
    optionsToggle,
    isOptionsOpen,
    modalRef,
    optionsTriggerRef,
  };
}

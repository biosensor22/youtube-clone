"use client";

import { useRef, useState } from "react";
import { useClickOutside } from "@/shared/lib/hooks";

export function useActionsMenu() {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const optionsTriggerRef = useRef<HTMLButtonElement>(null);
  const { modalRef } = useClickOutside(optionsTriggerRef, () =>
    setIsOptionsOpen(false),
  );

  const toggleOptions = () => {
    setIsOptionsOpen((prev) => !prev);
  };

  const closeOptions = () => {
    setIsOptionsOpen(false);
  };

  return {
    isOptionsOpen,
    optionsTriggerRef,
    modalRef,
    toggleOptions,
    closeOptions,
  };
}

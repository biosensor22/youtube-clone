"use client";

import { useLayoutEffect, type RefObject } from "react";
import type { ActionMenuItem, SecondaryActionItem } from "../model";

type OptionsMenuProps = {
  isOpen: boolean;
  modalRef: RefObject<HTMLDivElement | null>;
  overflowSecondaryActions: SecondaryActionItem[];
  videoOptions: ActionMenuItem[];
  onClose: () => void;
};

export function OptionsMenu({
  isOpen,
  modalRef,
  overflowSecondaryActions,
  videoOptions,
  onClose,
}: OptionsMenuProps) {
  useLayoutEffect(() => {
    const menu = modalRef.current;
    if (!isOpen || !menu) return;

    const rect = menu.getBoundingClientRect();

    if (rect.right > window.innerWidth) {
      menu.style.left = "auto";
      menu.style.right = "0";
    }

    if (rect.bottom > window.innerHeight) {
      menu.style.top = "auto";
      menu.style.bottom = "100%";
      menu.style.marginBottom = "0.25rem";
      menu.style.marginTop = "0";
    }

    return () => {
      menu.style.left = "";
      menu.style.right = "";
      menu.style.top = "";
      menu.style.bottom = "";
      menu.style.marginBottom = "";
      menu.style.marginTop = "";
    };
  }, [isOpen, modalRef]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="absolute left-0 top-full z-30 mt-1 w-38.5 overflow-hidden rounded-xl bg-(--dark-grey-bg) py-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
    >
      {overflowSecondaryActions.map((action) => (
        <button
          key={action.id}
          onClick={onClose}
          className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[15px] hover:bg-(--hover-btn-color)"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center">
            {action.icon}
          </span>
          <span>{action.label}</span>
        </button>
      ))}

      {videoOptions.map((item) => (
        <button
          key={item.id}
          onClick={onClose}
          className="flex w-full items-center gap-2.5 px-3 py-2 text-left text-[15px] hover:bg-(--hover-btn-color)"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center">
            {item.icon}
          </span>
          <span>{item.label}</span>
        </button>
      ))}
    </div>
  );
}

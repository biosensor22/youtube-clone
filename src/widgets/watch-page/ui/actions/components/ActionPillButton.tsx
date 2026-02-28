import { forwardRef } from "react";
import type { ReactNode } from "react";

type ActionPillButtonProps = {
  label: string;
  icon: ReactNode;
  onClick?: () => void;
  className?: string;
};

export const ActionPillButton = forwardRef<
  HTMLButtonElement,
  ActionPillButtonProps
>(({ label, icon, onClick, className = "" }, ref) => {
  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-(--btn-bg-color) px-3 text-[15px] font-medium hover:bg-(--hover-btn-color) ${className}`}
    >
      {icon}
      {label}
    </button>
  );
});

ActionPillButton.displayName = "ActionPillButton";

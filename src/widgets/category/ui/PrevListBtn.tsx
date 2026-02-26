import clsx from "clsx";
import { PrevListIcon } from "@/shared/ui/icons";
import { useToolTip, usePress } from "@/shared/lib/hooks";

interface PrevListBtnProps {
  onClick?: () => void;
}

export function PrevListBtn({ onClick }: PrevListBtnProps) {
  const { pressed, onPress, onRelease } = usePress();
  const {
    triggerRef,
    onMouseEnter,
    onMouseLeave,
    tooltip: tooltipNode,
  } = useToolTip("Search", { delay: 100, position: "bottom" });
  return (
    <div
      ref={triggerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={() => {
        onMouseLeave();
        onRelease();
      }}
      className="rounded-full bg-(--category-btn)"
    >
      <div
        onMouseDown={onPress}
        onMouseUp={() => {
          onRelease();
          onClick?.();
        }}
        onMouseLeave={onRelease}
        className={clsx(
          "rounded-full cursor-pointer p-1.5 scale-125 transition-colors duration-150 bg-transparent",
          {
            "bg-(--active-btn-color)": pressed,
            "hover:bg-(--hover-btn-color)": !pressed,
          },
        )}
      >
        <PrevListIcon />
        {tooltipNode}
      </div>
    </div>
  );
}

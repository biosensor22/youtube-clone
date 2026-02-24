import { PrevListIcon } from "@/shared/ui/icons";
import { useToolTip, usePress } from "@/shared/lib/hooks";

interface PrevListBtnProps {
  onClick?: () => void;
}

export function PrevListBtn({ onClick }: PrevListBtnProps) {
  const { pressed, onPress, onRelease } = usePress();
  const tooltip = useToolTip("Previous", {
    delay: 100,
    position: "bottom",
  });

  return (
    <div
      ref={tooltip.triggerRef}
      onMouseEnter={tooltip.onMouseEnter}
      onMouseLeave={() => {
        (tooltip.onMouseLeave(), onRelease());
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
        className={`
          rounded-full cursor-pointer p-1.5 scale-125
          transition-colors duration-150
          ${
            pressed
              ? "bg-(--active-btn-color)"
              : "hover:bg-(--hover-btn-color) bg-transparent"
          }
        `}
      >
        <PrevListIcon />
        {tooltip.tooltip}
      </div>
    </div>
  );
}

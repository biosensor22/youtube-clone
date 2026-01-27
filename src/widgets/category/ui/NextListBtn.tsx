import { usePress } from "@/shared/ui/hooks/usePress";
import { NextListIcon } from "@/shared/ui/icons/category-icons/NextListIcon";
import { useTooltip } from "@/shared/ui/hooks/useToolTip";

interface NextListBtnProps {
  onClick?: () => void;
}

export function NextListBtn({ onClick }: NextListBtnProps) {
  const { pressed, onPress, onRelease } = usePress();
  const tooltip = useTooltip("Next", {
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
      className="bg-4 rounded-full bg-(--category-btn)"
    >
      <div
        onMouseDown={onPress}
        onMouseUp={() => {
          onRelease();
          onClick?.();
        }}
        onMouseLeave={onRelease}
        className={`
          rounded-full cursor-pointer p-1.5 scale-125 transition-colors duration-150
          ${
            pressed
              ? "bg-(--active-btn-color)"
              : "hover:bg-(--hover-btn-color) bg-transparent"
          }
        `}
      >
        <NextListIcon />
        {tooltip.tooltip}
      </div>
    </div>
  );
}

import { MenuIcon } from "@/shared/ui/icons";
import { usePress } from "@/shared/lib/hooks";

export function NotifOptionsBtn() {
  const { pressed, onPress, onRelease } = usePress();

  return (
    <div
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      className={`rounded-full p-1.5 h-9 cursor-pointer
        ${
          pressed
            ? "bg-(--active-btn-color)"
            : "hover:bg-(--hover-btn-color) bg-transparent"
        }
        `}
    >
      <MenuIcon />
    </div>
  );
}

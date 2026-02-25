import { MenuIcon } from "@/shared/ui/icons";
import { usePress } from "@/shared/lib/hooks";
import clsx from "clsx";

export function NotifOptionsBtn() {
  const { pressed, onPress, onRelease } = usePress();

  return (
    <div
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      className={clsx(
        "rounded-full p-1.5 h-9 cursor-pointer",
        pressed
          ? "bg-(--active-btn-color)"
          : "bg-transparent hover:bg-(--hover-btn-color)",
      )}
    >
      <MenuIcon />
    </div>
  );
}

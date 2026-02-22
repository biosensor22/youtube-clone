import Link from "next/link";
import { SettingsIcon } from "@/shared/ui/icons/SettingsIcon";
import { usePress } from "@/shared/lib/hooks";

export function SettingsBtn() {
  const { pressed, onPress, onRelease } = usePress();

  return (
    <Link
      onMouseDown={onPress}
      onMouseUp={onRelease}
      onMouseLeave={onRelease}
      href="/"
      className={`p-2 rounded-full

				${
          pressed
            ? "bg-(--active-btn-color)"
            : "hover:bg-(--hover-btn-color) bg-transparent"
        }`}
    >
      <SettingsIcon />
    </Link>
  );
}

"use client";

import { usePress } from "@/shared/ui/hooks/usePress";
import { HomeIcon } from "@/shared/ui/icons/side-nav";
import { useCursorTooltip } from "@/shared/ui/hooks/useCursorTooltip";

import Link from "next/link";

type HomeLinkProps = {
  isActive: string;
  onActive: () => void;
};

export function HomeLink({ isActive, onActive }: HomeLinkProps) {
  const { pressed, onPress, onRelease } = usePress();
  const tooltip = useCursorTooltip("Home", { delay: 500 });

  return (
    <Link
      onMouseEnter={(e) => tooltip.show(e.nativeEvent)}
      onMouseLeave={() => {
        tooltip.hide();
        onRelease();
      }}
      onClick={onActive}
      onMouseDown={onPress}
      onMouseUp={onRelease}
      className={`flex rounded-xl px-3 py-2 gap-5
					${isActive === "home" ? "bg-(--btn-bg-color)" : "bg-transparent"}
					${pressed ? "active:bg-(--active-btn-color)" : "hover:bg-(--hover-btn-color)"}
					`}
      href="/"
    >
      <HomeIcon isActive={isActive} />
      {tooltip.tooltip}

      <p>Home</p>
    </Link>
  );
}

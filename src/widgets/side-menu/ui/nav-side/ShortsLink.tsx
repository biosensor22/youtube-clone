import { usePress } from "@/shared/lib/hooks/btn-hooks/usePress";
import { ShortsIcon } from "@/shared/ui/icons/side-nav";
import { useCursorToolTip } from "@/shared/lib/hooks/btn-hooks/useCursorToolTip";

import Link from "next/link";

type ShortsLinkProps = {
  isActive: string;
  onActive: () => void;
};

export function ShortsLink({ isActive, onActive }: ShortsLinkProps) {
  const { pressed, onPress, onRelease } = usePress();
  const tooltip = useCursorToolTip("Shorts", { delay: 500 });

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
					${isActive === "shorts" ? "bg-(--btn-bg-color)" : "bg-transparent"}
					${pressed ? "active:bg-(--active-btn-color)" : "hover:bg-(--hover-btn-color)"}
					`}
      href="/"
    >
      <ShortsIcon isActive={isActive} />
      {tooltip.tooltip}

      <p>Shorts</p>
    </Link>
  );
}

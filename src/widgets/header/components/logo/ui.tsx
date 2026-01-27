"use client";

import { YouTubeIcon } from "@/shared/ui/icons/header-icons";
import { useCursorTooltip } from "@/shared/ui/hooks/useCursorTooltip";
import Link from "next/link";

export function LogoHome() {
  const tooltip = useCursorTooltip("YouTube Home", { delay: 500 });

  return (
    <div
      onMouseEnter={(e) => tooltip.show(e.nativeEvent)}
      onMouseLeave={tooltip.hide}
      className="w-23.25 h-5 relative flex"
    >
      <Link href="/">
        <YouTubeIcon />
        {tooltip.tooltip}
      </Link>
      <span className="text-[10px] text-neutral-400 leading-none p-1 -mt-1 absolute -right-5.25 -top-1.25">
        UA
      </span>
    </div>
  );
}

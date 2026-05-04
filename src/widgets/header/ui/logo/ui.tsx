"use client";

import Link from "next/link";
import { YouTubeIcon } from "@/shared/ui/icons";
import { useCursorToolTip } from "@/shared/lib/hooks";
import { getUserCountry } from "@/entities/user/api/getUserCountry";
import { useState, useEffect } from "react";

export function LogoHome() {
  const tooltip = useCursorToolTip("YouTube Home", { delay: 500 });
  const [country, setCountry] = useState<string>("");

  useEffect(() => {
    async function getData() {
      return await getUserCountry();
    }
    getData().then(setCountry);
  }, []);

  return (
    <div
      onMouseEnter={(e) => tooltip.show(e.nativeEvent)}
      onMouseLeave={tooltip.hide}
      className="w-23.25 h-5 relative flex"
    >
      <Link href="/" aria-label="Home">
        <YouTubeIcon aria-hidden="true" />
        {tooltip.tooltip}
      </Link>
      <span className="text-[10px] text-neutral-400 leading-none p-1 -mt-1 absolute -right-5.25 -top-1.25">
        {country}
      </span>
    </div>
  );
}

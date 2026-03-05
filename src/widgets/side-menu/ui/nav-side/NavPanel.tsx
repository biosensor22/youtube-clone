"use client";

import { useState } from "react";
import { HomeLink } from "./HomeLink";
import { ShortsLink } from "./ShortsLink";
import { usePathname } from "next/navigation";
import { urlPaths } from "@/shared/api/urlPaths";

export function NavPanel() {
  const pathname = usePathname();
  const [isActive, setIsActive] = useState(pathname);

  return (
    <div className="text-(--main-text-color) text-[14px] font-semibold gap-1 flex flex-col w-50">
      <HomeLink
        onActive={() => setIsActive(urlPaths.home)}
        isActive={isActive}
      />

      <ShortsLink
        onActive={() => setIsActive(urlPaths.shorts)}
        isActive={isActive}
      />
    </div>
  );
}

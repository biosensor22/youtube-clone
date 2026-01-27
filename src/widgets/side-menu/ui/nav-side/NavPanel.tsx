"use client";

import { useState } from "react";
import { HomeLink } from "./HomeLink";
import { ShortsLink } from "./ShortsLink";

export function NavPanel() {
  const [isActive, setIsActive] = useState("home");

  return (
    <div className="text-white text-[14px] font-semibold gap-1 flex flex-col w-50">
      <HomeLink onActive={() => setIsActive("home")} isActive={isActive} />

      <ShortsLink onActive={() => setIsActive("shorts")} isActive={isActive} />
    </div>
  );
}

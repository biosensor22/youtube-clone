"use client";

import { SideBarButton } from "./SideBarButton";
import {
  HomeIcon,
  ShortsIcon,
  SubscriptionsIcon,
  YouIcon,
} from "@/shared/ui/icons/side-nav";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function SideBar() {
  const pathname = usePathname().replace(/^\/+/, "");
  const [isActive, setIsActive] = useState(!pathname ? "home" : pathname);

  const navItems = [
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: (
        <HomeIcon onSwitch={() => setIsActive("home")} isActive={isActive} />
      ),
    },
    {
      id: "shorts",
      label: "Shorts",
      path: "/shorts",
      icon: (
        <ShortsIcon
          onSwitch={() => setIsActive("shorts")}
          isActive={isActive}
        />
      ),
    },
    {
      id: "subscriptions",
      label: "Subscriptions",
      path: "/subscriptions",
      icon: (
        <SubscriptionsIcon
          onSwitch={() => setIsActive("subscriptions")}
          isActive={isActive}
        />
      ),
    },
    {
      id: "you",
      label: "You",
      path: "/you",
      icon: <YouIcon onSwitch={() => setIsActive("you")} isActive={isActive} />,
    },
  ];

  return (
    <aside className="fixed z-10 left-1 top-10 w-16 h-10 hidden items-center flex-col mt-5 @mdxs:flex">
      {navItems.map((item) => (
        <SideBarButton
          key={item.id}
          label={item.label}
          path={item.path}
          icon={item.icon}
        />
      ))}
    </aside>
  );
}

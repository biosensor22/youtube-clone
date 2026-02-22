"use client";

import { SideBarButton } from "./SideBarButton";
import {
  HomeIcon,
  ShortsIcon,
  SubscriptionsIcon,
  YouIcon,
} from "@/shared/ui/icons";
import { usePathname } from "next/navigation";

export function SideBar() {
  const pathname = usePathname();
  const current = pathname === "/" ? "home" : pathname.replace(/^\/+/, "");

  const navItems = [
    {
      id: "home",
      label: "Home",
      path: "/",
      icon: <HomeIcon isActive={current === "home"} />,
    },
    {
      id: "shorts",
      label: "Shorts",
      path: "/shorts",
      icon: <ShortsIcon isActive={current === "shorts"} />,
    },
    {
      id: "subscriptions",
      label: "Subscriptions",
      path: "/subscriptions",
      icon: <SubscriptionsIcon isActive={current === "subscriptions"} />,
    },
    {
      id: "you",
      label: "You",
      path: "/you",
      icon: <YouIcon isActive={current === "you"} />,
    },
  ];

  return (
    <aside className="fixed z-10 left-1 top-10 w-16 hidden items-center flex-col mt-5 @mdxs:flex">
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

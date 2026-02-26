"use client";

import { SideBarButton } from "./SideBarButton";
import {
  HomeIcon,
  ShortsIcon,
  SubscriptionsIcon,
  YouIcon,
} from "@/shared/ui/icons";
import { usePathname } from "next/navigation";

export const urlPaths = {
  home: "/",
  shorts: "/shorts",
  subscriptions: "/subscriptions",
  you: "/you",
};

export function SideBar() {
  const pathname = usePathname();
  console.log(pathname);

  const navItems = [
    {
      id: "home",
      label: "Home",
      path: urlPaths.home,
      icon: <HomeIcon isActive={pathname} />,
    },
    {
      id: "shorts",
      label: "Shorts",
      path: urlPaths.shorts,
      icon: <ShortsIcon isActive={pathname} />,
    },
    {
      id: "subscriptions",
      label: "Subscriptions",
      path: urlPaths.subscriptions,
      icon: <SubscriptionsIcon isActive={pathname} />,
    },
    {
      id: "you",
      label: "You",
      path: urlPaths.you,
      icon: <YouIcon isActive={pathname} />,
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

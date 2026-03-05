"use client";

import Image from "next/image";
import { SplitLine } from "@/shared/ui";
import { SettingsBtn } from "./SettingsBtn";
import { Notification } from "./Notification";
import { useNotifications } from "@/entities/notifications";
import { useClickOutside } from "@/shared/lib/hooks";
import { useNotificationContext } from "@/widgets/header/ui/notifications";

export function NotificationModal() {
  const { notifications, isLoading } = useNotifications("dwadw");
  const { triggerRef, close } = useNotificationContext();
  const { modalRef } = useClickOutside(triggerRef, close);

  if (isLoading)
    return (
      <div
        className="
      fixed flex flex-col w-[calc(100%-12px)] top-2 h-160 rounded-xl max-w-120 bg-(--bg-drop-menu)
       z-11 mobile:top-14 small:right-20 small:left-auto left-2 mobile:w-[90vw] justify-center items-center"
      >
        <Image
          src="/loaders.gif"
          width={75}
          height={75}
          alt="loading"
          unoptimized
        />
      </div>
    );

  return (
    <div
      ref={modalRef}
      className="
      fixed flex flex-col w-[calc(100%-12px)] top-2 max-h-160.5 rounded-xl max-w-120 bg-(--bg-drop-menu)
       z-11 mobile:top-14 small:right-20 small:left-auto left-2 mobile:w-[90vw]  overflow-hidden"
    >
      <div className="w-full flex items-center text-(--main-text-color) justify-between py-1 px-3 font-normal">
        <p>Notifications</p>
        <SettingsBtn />
      </div>
      <SplitLine />
      <div className="text-(--main-text-color) min-h-20 scrollbar-side">
        {notifications.map((item) => (
          <Notification key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

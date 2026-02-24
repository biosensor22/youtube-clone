"use client";

import { createContext, useContext, useRef, RefObject } from "react";
import { NotificationModal } from "@/widgets/header/ui/notifications";
import { useAppSelector } from "@/app/providers/hooks";

type NotificationContextType = {
  triggerRef: RefObject<HTMLDivElement | null>;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("NotificationContext used outside Provider");
  return context;
};

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const isOpen = useAppSelector((state) => state.notif.isOpen);

  return (
    <NotificationContext.Provider value={{ triggerRef }}>
      {isOpen && <NotificationModal />}

      {children}
    </NotificationContext.Provider>
  );
};

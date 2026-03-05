"use client";

import {
  createContext,
  useContext,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import { NotificationModal } from "@/widgets/header/ui/notifications";

type NotificationContextType = {
  triggerRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const NotificationContext = createContext<NotificationContextType | null>(null);

export function useNotificationContext() {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("NotificationContext used outside Provider");
  return context;
}

export function NotificationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<NotificationContextType>(
    () => ({
      triggerRef,
      isOpen,
      open: () => setIsOpen(true),
      close: () => setIsOpen(false),
      toggle: () => setIsOpen((v) => !v),
    }),
    [isOpen],
  );

  return (
    <NotificationContext.Provider value={value}>
      {isOpen && <NotificationModal />}
      {children}
    </NotificationContext.Provider>
  );
}

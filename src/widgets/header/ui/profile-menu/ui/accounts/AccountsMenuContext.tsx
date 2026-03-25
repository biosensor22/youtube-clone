"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useCallback,
  type RefObject,
} from "react";
import { useAnchoredPosition, type AnchoredPosition } from "@/shared/lib/hooks";
import { useDropProfileContext } from "../DropProfileContext";

type AccountsMenuContextType = {
  triggerRef: RefObject<HTMLDivElement | null>;
  position: AnchoredPosition;
  updatePosition: () => void;
  isOpen: boolean;
  openAccounts: () => void;
  closeAccounts: () => void;
};

const AccountsMenuContext = createContext<AccountsMenuContextType | null>(null);

export function useAccountsMenuContext() {
  const context = useContext(AccountsMenuContext);
  if (!context) throw new Error("AccountsMenuContext used outside Provider");
  return context;
}

export function AccountsMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { triggerRef } = useDropProfileContext();
  const [isOpen, setIsOpen] = useState(false);
  const { position, updatePosition, updatePositionOnNextFrame } =
    useAnchoredPosition(triggerRef, {
      isActive: isOpen,
      verticalOffset: 4,
    });

  const openAccounts = useCallback(() => {
    setIsOpen(true);
    updatePositionOnNextFrame();
  }, [updatePositionOnNextFrame]);

  const closeAccounts = useCallback(() => {
    setIsOpen(false);
  }, []);

  const value = useMemo<AccountsMenuContextType>(
    () => ({
      triggerRef,
      position,
      updatePosition,
      isOpen,
      openAccounts,
      closeAccounts,
    }),
    [closeAccounts, isOpen, openAccounts, position, triggerRef, updatePosition],
  );

  return (
    <AccountsMenuContext.Provider value={value}>
      {children}
    </AccountsMenuContext.Provider>
  );
}

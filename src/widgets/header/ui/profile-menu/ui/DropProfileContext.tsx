"use client";

import {
  createContext,
  useContext,
  useState,
  useMemo,
  useRef,
  useCallback,
  type RefObject,
} from "react";
import { useAnchoredPosition, type AnchoredPosition } from "@/shared/lib/hooks";

type DropProfileContextType = {
  triggerRef: RefObject<HTMLDivElement | null>;
  position: AnchoredPosition;
  updatePosition: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const DropProfileContext = createContext<DropProfileContextType | null>(null);

export function useDropProfileContext() {
  const context = useContext(DropProfileContext);
  if (!context) throw new Error("DropProfileContext used outside Provider");
  return context;
}

export function DropProfileProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const triggerRef = useRef<HTMLDivElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const { position, updatePosition, updatePositionOnNextFrame } =
    useAnchoredPosition(triggerRef, {
      isActive: isOpen,
      verticalOffset: 4,
    });

  const open = useCallback(() => {
    setIsOpen(true);
    updatePositionOnNextFrame();
  }, [updatePositionOnNextFrame]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  const toggle = useCallback(() => {
    setIsOpen((v) => {
      const next = !v;
      if (next) updatePositionOnNextFrame();
      return next;
    });
  }, [updatePositionOnNextFrame]);

  const value = useMemo<DropProfileContextType>(
    () => ({
      triggerRef,
      position,
      updatePosition,
      isOpen,
      open,
      close,
      toggle,
    }),
    [close, isOpen, open, position, toggle, updatePosition],
  );

  return (
    <DropProfileContext.Provider value={value}>
      {children}
    </DropProfileContext.Provider>
  );
}

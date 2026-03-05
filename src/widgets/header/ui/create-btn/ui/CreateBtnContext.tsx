"use client";

import {
  createContext,
  useContext,
  useRef,
  type RefObject,
  useState,
  useMemo,
} from "react";
import { CreateBtnModal } from "./CreateBtnModal";

type CreateContextType = {
  triggerRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const CreateBtnContext = createContext<CreateContextType | null>(null);

export const useCreateBtnContext = () => {
  const context = useContext(CreateBtnContext);
  if (!context) throw new Error("CreateBtnContext used outside Provider");
  return context;
};

export const CreateBtnProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);

  const value = useMemo<CreateContextType>(
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
    <CreateBtnContext.Provider value={value}>
      {isOpen && <CreateBtnModal />}
      {children}
    </CreateBtnContext.Provider>
  );
};

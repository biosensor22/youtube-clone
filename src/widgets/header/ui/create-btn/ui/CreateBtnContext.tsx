"use client";

import { createContext, useContext, useRef, RefObject } from "react";
import { useAppSelector } from "@/app/providers/hooks";
import { CreateBtnModal } from "./CreateBtnModal";

type CreateContextType = {
  triggerRef: RefObject<HTMLDivElement | null>;
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
  const isOpen = useAppSelector((state) => state.create.isOpen);

  return (
    <CreateBtnContext.Provider value={{ triggerRef }}>
      {isOpen && <CreateBtnModal />}
      {children}
    </CreateBtnContext.Provider>
  );
};

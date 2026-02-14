import { useEffect, RefObject } from "react";

interface useClickOutsideProps {
  menuRef: RefObject<HTMLDivElement | null>;
  opened: boolean;
  onClose: () => void; 
}

export function useClickOutside({
  menuRef,
  opened,
  onClose,
}: useClickOutsideProps) {
  useEffect(() => {
    function clickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    }

    if (opened) {
      document.addEventListener("click", clickOutside);
    }

    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [opened, onClose]);
}

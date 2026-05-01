"use client";

import { useCallback } from "react";
import { useAccountsMenuContext } from "../ui/accounts/AccountsMenuContext";
import { useDropProfileContext } from "../ui/DropProfileContext";

export function useMenuLogic(id: string) {
  const { openAccounts, closeAccounts } = useAccountsMenuContext();
  const { close, open } = useDropProfileContext();

  return useCallback(() => {
    switch (id) {
      case "switch-account":
        openAccounts();
        close();
        break;

      case "to-profile":
        closeAccounts();
        open();
        break;
      default:
        break;
    }
  }, [close, closeAccounts, id, open, openAccounts]);
}

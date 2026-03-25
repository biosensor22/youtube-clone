"use client";

import {
  AccountsMenuProvider,
  useAccountsMenuContext,
} from "../../widgets/header/ui/profile-menu/ui/accounts/AccountsMenuContext";
import { AccountsMenu } from "../../widgets/header/ui/profile-menu/ui/accounts/AccountsMenu";
import {
  DropProfileProvider,
  useDropProfileContext,
} from "../../widgets/header/ui/profile-menu/ui/DropProfileContext";
import { ProfileDropModal } from "../../widgets/header/ui/profile-menu/ui/main-menu/ProfileDropModal";

function ProfileMenuOverlays() {
  const { isOpen: isProfileOpen } = useDropProfileContext();
  const { isOpen: isAccountsOpen } = useAccountsMenuContext();

  return (
    <>
      {isProfileOpen ? <ProfileDropModal /> : null}
      {isAccountsOpen ? <AccountsMenu /> : null}
    </>
  );
}

export function ProfileMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DropProfileProvider>
      <AccountsMenuProvider>
        <ProfileMenuOverlays />
        {children}
      </AccountsMenuProvider>
    </DropProfileProvider>
  );
}

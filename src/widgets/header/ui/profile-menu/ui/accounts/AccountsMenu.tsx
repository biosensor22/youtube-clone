"use client";

import { useClickOutside } from "@/shared/lib/hooks";
import { SplitLine } from "@/shared/ui";
import { MenuBtn } from "../main-menu/MenuBtn";
import {
  BackBtn,
  accountsMenu,
  useAccountsMenuContext,
} from "@/widgets/header/ui/profile-menu";
import { useCurrentUser } from "@/entities/user/model/useCurrentUser";
import { NameAndEmail } from "./NameAndUsername";
import { User } from "./User";

export function AccountsMenu() {
  const { data: user } = useCurrentUser();
  const { triggerRef, position, closeAccounts } = useAccountsMenuContext();
  const { modalRef } = useClickOutside(triggerRef, closeAccounts);

  if (!position.width) return null;
  if (!user?.[0].pfp) return;

  return (
    <div
      ref={modalRef}
      className="fixed z-30 flex flex-col overflow-hidden rounded-xl bg-[#282828] text-[#f1f1f1] shadow-[0_10px_30px_rgba(0,0,0,0.45)]"
      style={{
        width: 300,
        left: position.left + position.width - 300 + 12,
        top: position.top + 5,
        maxHeight: `min(750px, calc(100vh - ${position.top + 8}px))`,
      }}
    >
      <BackBtn />
      <SplitLine className="border-white/12 mt-1.5" />
      <NameAndEmail name={user?.[0].name} email={user?.[0].email} />
      <User
        pfp={user?.[0].pfp}
        name={user?.[0].name}
        username={user?.[0].username}
        subsctibers={user?.[0].subscribers}
      />

      <button className="flex w-full cursor-pointer items-center gap-4 py-2.5 px-4 text-left font-semibold text-[14px] hover:bg-white/10">
        <span className="min-w-0 flex-1 truncate font-normal">
          View all channels
        </span>
      </button>
      <div className="w-full my-2 h-1 bg-white/20" />

      <span className="min-w-0 px-4 text-[12px] truncate font-medium">
        Other accounts
      </span>

      <div className="my-2 min-h-0 flex-1 overflow-y-auto">
        {accountsMenu.map(({ id, label, icon, path }) => (
          <MenuBtn key={id} id={id} label={label} icon={icon} path={path} />
        ))}
      </div>
    </div>
  );
}

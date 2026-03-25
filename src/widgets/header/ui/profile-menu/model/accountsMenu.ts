import type { ComponentType, SVGProps } from "react";
import { SignOutIcon, AddAccountIcon } from "@/shared/ui/icons";

export type AccountsMenuItem = {
  id: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  path?: string;
};

export const accountsMenu: AccountsMenuItem[] = [
  {
    id: "add-account",
    label: "Add account",
    icon: AddAccountIcon,
    path: "https://myaccount.google.com/",
  },
  {
    id: "sign-out",
    label: "Sign out",
    icon: SignOutIcon,
    path: "",
  },
];

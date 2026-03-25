import type { ComponentType, SVGProps } from "react";
import {
  AppearanceIcon,
  GoogleAccountIcon,
  HelpIcon,
  KeyboardIcon,
  LanguageIcon,
  LocationIcon,
  PurchasesIcon,
  RestrictedModeIcon,
  SettingsIcon,
  SignOutIcon,
  SwitchAccountIcon,
  YourDataIcon,
  YouTubeStudioIcon,
  FeedbackIcon,
} from "@/shared/ui/icons";

export type ProfileMenuItem = {
  id: string;
  label: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  path?: string;
  hasChevron?: boolean;
};

export const profileMenuSections: ProfileMenuItem[][] = [
  [
    {
      id: "google-account",
      label: "Google Account",
      icon: GoogleAccountIcon,
      path: "https://myaccount.google.com/",
    },
    {
      id: "switch-account",
      label: "Switch account",
      icon: SwitchAccountIcon,
      path: "",
      hasChevron: true,
    },
    {
      id: "sign-out",
      label: "Sign out",
      icon: SignOutIcon,
      path: "",
    },
  ],
  [
    {
      id: "studio",
      label: "YouTube Studio",
      icon: YouTubeStudioIcon,
      path: "",
    },
    {
      id: "purchases",
      label: "Purchases and memberships",
      icon: PurchasesIcon,
      path: "",
    },
  ],
  [
    {
      id: "your-data",
      label: "Your data in YouTube",
      icon: YourDataIcon,
      path: "",
    },
    {
      id: "appearance",
      label: "Appearance: Device theme",
      icon: AppearanceIcon,
      path: "",
      hasChevron: true,
    },
    {
      id: "language",
      label: "Display language: British English",
      icon: LanguageIcon,
      path: "",
      hasChevron: true,
    },
    {
      id: "restricted",
      label: "Restricted Mode: Off",
      icon: RestrictedModeIcon,
      path: "",
      hasChevron: true,
    },
    {
      id: "location",
      label: "Location: Ukraine",
      icon: LocationIcon,
      path: "",
      hasChevron: true,
    },
    {
      id: "keyboard",
      label: "Keyboard shortcuts",
      icon: KeyboardIcon,
      path: "",
    },
  ],
  [
    {
      id: "settings",
      label: "Settings",
      icon: SettingsIcon,
      path: "",
    },
  ],
  [
    {
      id: "help",
      label: "Help",
      icon: HelpIcon,
      path: "",
    },
    {
      id: "feedback",
      label: "Send feedback",
      icon: FeedbackIcon,
      path: "",
    },
  ],
];

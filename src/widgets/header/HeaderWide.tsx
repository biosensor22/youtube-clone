"use client";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { ProfileButton } from "@/features/profile-menu";
import { SearchBarAndVoice } from "@/features/search";
import { LogoHome } from "./ui/logo";
import { SideMenuBtn } from "./ui/side-menu-btn";
import { VoiceSearch } from "./ui/voice-search";
import { CreateButton } from "./ui/create-btn";
import { NotificationBtn } from "./ui/notifications";
import { SearchMobileBar } from "./ui/search-mobile";
import { HeaderMobile } from "./HeaderMobile";
import { useIsMobileWidth } from "./model/useIsMobileWidth";

export function Header() {
  const watch = usePathname().startsWith("/watch");
  const { isMobile, isMobileSearch, handleBack, openMobileSearch } =
    useIsMobileWidth();

  if (isMobileSearch && isMobile) return <HeaderMobile onBack={handleBack} />;

  return (
    <header
      className={clsx(
        ` fixed backdrop-blur-3xl top-0 left-0 flex sm:w-full w-screen px-2
         sm:px-4 pt-2 bg-(--glass-bg) z-10 @header`,
        {
          "h-14": watch,
          "h-29:": !watch,
        },
      )}
    >
      <div className="gap-4 h-10 flex">
        <SideMenuBtn />
        <div className="mt-2.5">
          <LogoHome />
        </div>
      </div>
      <div className="justify-end sm:justify-center w-full flex sm:ml-24">
        <div className="justify-center w-full sm:flex hidden duration-150">
          <SearchBarAndVoice />
        </div>
        <div
          onClick={openMobileSearch}
          className=" h-10 justify-end w-12 sm:hidden flex mx-0 sm:mx-0"
        >
          <SearchMobileBar />
        </div>
        <div className="flex sm:hidden">
          <div className=" sm:bg-(--btn-bg-color) min-w-10 h-10 bg-transparent rounded-full ml-1 hidden @xs:flex">
            <VoiceSearch />
          </div>
        </div>
      </div>

      <div className="flex items sm:px-3">
        <div className="mt-0.5">
          <CreateButton />
        </div>

        <div className="sm:mr-2.5 hidden h-10 @xs:flex">
          <NotificationBtn />
        </div>
        <div className="mx-4 mt-1 sm:mr-0 sm:mx-0 @xs:ml-1 mr-5">
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}

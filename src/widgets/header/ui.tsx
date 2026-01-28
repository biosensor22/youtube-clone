import { ProfileButton } from "@/features/profile-menu/ui";
import { SearchBar } from "@/features/search/ui";
import { LogoHome } from "./components/logo";
import { SideMenuBtn } from "./components/side-menu-btn/ui";
import { VoiceSearch } from "./components/voice-search/ui";
import { CreateButton } from "./components/create-btn/ui";
import { Notifications } from "./components/notifications/ui";
import { SearchMobileBar } from "./components/search-mobile/ui";

export function Header() {
  return (
    <header
      className="fixed backdrop-blur-3xl top-0 left-0 flex sm:w-full w-screen
     h-29 px-2 sm:px-4 pt-2 bg-(--glass-bg) z-10
     "
    >
      <div className="gap-4 h-10 flex">
        <SideMenuBtn />
        <div className="mt-2.5">
          <LogoHome />
        </div>
      </div>
      <div className="justify-end sm:justify-center w-full flex sm:ml-24">
        <div className="justify-center w-full sm:flex hidden duration-150">
          <SearchBar />
        </div>
        <div className=" h-10 justify-end w-12 sm:hidden flex mx-4 sm:mx-0">
          <SearchMobileBar />
        </div>
        <div className="flex sm:hidden ">
          <div className=" sm:bg-(--btn-bg-color) min-w-10 h-10 bg-transparent rounded-full ml-1 hidden sm:flex">
            <VoiceSearch />
          </div>
        </div>
      </div>

      <div className="flex  px-1 sm:px-3">
        <CreateButton />
        <div className="sm:mr-2.5 hidden h-10 sm:flex">
          <Notifications />
        </div>
        <div className="mx-4 mt-1 sm:mr-0 sm:mx-0">
          <ProfileButton />
        </div>
      </div>
    </header>
  );
}

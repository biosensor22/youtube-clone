"use client";

import { BackBtn } from "./ui/BackBtn";
import { SearchBar } from "@/shared/ui/ui/SearchBar";
import { VoiceSearch } from "./ui/voice-search/ui";

interface HeaderMobileProps {
  onBack: () => void;
}

export function HeaderMobile({ onBack }: HeaderMobileProps) {
  return (
    <header
      className="fixed backdrop-blur-3xl top-0 left-0 flex sm:w-full w-full
				 h-29 px-2 sm:px-4 pt-2 bg-(--glass-bg) z-10 @header
				 "
    >
      <div className="w-full flex">
        <div className="w-22 flex">
          <BackBtn onBack={onBack} />
        </div>
        <div className="w-full">
          <SearchBar />
        </div>
        <div className="w-13 h-10 flex">
          <VoiceSearch />
        </div>
      </div>
    </header>
  );
}

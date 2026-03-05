"use client";

import { BackBtn } from "../../BackBtn";
import { SearchBarAndVoice } from "@/widgets/header/ui/search";

interface SearchMobileProps {
  onBack: () => void;
}

export function SearchMobile({ onBack }: SearchMobileProps) {
  return (
    <header
      className="fixed backdrop-blur-3xl top-0 left-0 flex sm:w-full w-full
				 h-14 px-2 sm:px-4 pt-2 bg-(--glass-bg) z-20 @header"
    >
      <div className="w-full flex">
        <div className="w-22 flex">
          <BackBtn onBack={onBack} />
        </div>

        <div className="w-full">
          <SearchBarAndVoice />
        </div>
      </div>
    </header>
  );
}

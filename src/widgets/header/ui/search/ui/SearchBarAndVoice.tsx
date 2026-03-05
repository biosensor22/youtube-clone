"use client";

import { useEffect } from "react";
import clsx from "clsx";
import { useSearch, useSearchUI } from "@/shared/lib/hooks";
import { CrossIcon, SearchIcon } from "@/shared/ui/icons";
import { VoiceSearch } from "@/widgets/header/ui/voice-search";
import { useDropSearchContext } from "./DropSearchContext";

export function SearchBarAndVoice() {
  const { close, open, triggerRef, updatePosition } = useDropSearchContext();
  const { isFocused, onFocused, onBlured, focusRef, inputRef } = useSearchUI();
  const { value, setValue } = useSearch();

  useEffect(() => {
    if (isFocused) {
      open();
    } else {
      close();
    }
  }, [close, isFocused, open]);

  return (
    <div className={`relative flex flex-1 w-full max-w-165 px-1 h-10`}>
      <div ref={triggerRef} className="relative flex flex-1 h-10">
        <div className="relative flex-1">
          <div
            onClick={() => {
              focusRef();
              updatePosition();
            }}
            className={clsx(
              `absolute right-0 flex items-center justify-between border border-(--border-color)
             rounded-l-full py-1.25 pl-3 bg-(--input-bg-color) text-(--main-text-color) text-lg cursor-text`,
              {
                "w-[105%] border-(--focus-input-color)": isFocused,
                "w-full": !isFocused,
              },
            )}
          >
            {isFocused && (
              <div>
                <SearchIcon width={28} height={28} />
              </div>
            )}
            <input
              ref={inputRef}
              onFocus={onFocused}
              onBlur={onBlured}
              onChange={(e) => setValue(e.target.value)}
              value={value}
              placeholder="Search"
              type="text"
              className="w-full h-7 px-1.25 pb-1 text-[17px] bg-transparent outline-0"
            />

            {value && (
              <button
                onClick={() => {
                  focusRef();
                  setValue("");
                  updatePosition();
                }}
                className="absolute right-1 flex h-10 w-10 items-center justify-center
                rounded-full hover:bg-(--hover-btn-color) cursor-pointer"
              >
                <CrossIcon />
              </button>
            )}
          </div>
        </div>

        <button
          className="bg-(--btn-bg-color) flex items-center justify-center
          border border-(--border-color) border-l-0
          rounded-r-full w-16 cursor-pointer"
          aria-label="Search"
        >
          <SearchIcon />
        </button>
      </div>

      <div className="justify-center flex items-center">
        <div className=" sm:bg-(--btn-bg-color) flex min-w-10 h-10 bg-transparent rounded-full ml-3">
          <VoiceSearch />
        </div>
      </div>
    </div>
  );
}

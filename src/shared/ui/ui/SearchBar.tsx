"use client";

import clsx from "clsx";
import { useSearchUI, useSearch } from "@/shared/lib/hooks";
import { CrossIcon, SearchIcon } from "@/shared/ui/icons";

export function SearchBar() {
  const { isFocused, onFocused, onBlured, focusRef, inputRef } = useSearchUI();
  const { value, setValue } = useSearch();

  return (
    <div className={`relative flex flex-1 w-full max-w-165 px-1 h-10`}>
      <div className="relative flex-1">
        <div
          onClick={focusRef}
          className={clsx(
            "absolute right-0 flex items-center justify-between border border-(--border-color) rounded-l-full py-1.25 pl-3 bg-(--input-bg-color) text-white/70 text-lg cursor-text",
            {
              "w-[105%] border-(--focus-input-color)": isFocused,
              "w-full": !isFocused,
            },
          )}
        >
          {isFocused && <SearchIcon width={28} height={28} />}

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
      >
        <SearchIcon />
      </button>
    </div>
  );
}

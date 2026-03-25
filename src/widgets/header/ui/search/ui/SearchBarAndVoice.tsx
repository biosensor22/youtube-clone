"use client";

import type { FormEvent } from "react";
import { Suspense, useEffect } from "react";
import clsx from "clsx";
import { useSearchUI } from "@/shared/lib/hooks";
import { useSearchSubmit } from "@/features/search/submit-query";
import { CrossIcon, SearchIcon } from "@/shared/ui/icons";
import { VoiceSearch } from "@/widgets/header/ui/voice-search";
import { useDropSearchContext } from "./DropSearchContext";

function SearchBarAndVoiceFallback() {
  return (
    <div className="relative flex h-10 w-full max-w-165 px-1">
      <div className="relative flex flex-1 h-10">
        <div className="flex-1 rounded-l-full border border-(--border-color) bg-(--input-bg-color)" />
        <div className="w-16 rounded-r-full border border-(--border-color) border-l-0 bg-(--btn-bg-color)" />
      </div>
      <div className="ml-3 h-10 min-w-10 rounded-full bg-(--btn-bg-color)" />
    </div>
  );
}

function SearchBarAndVoiceContent() {
  const { close, open, triggerRef, updatePosition } = useDropSearchContext();
  const { isFocused, onFocused, onBlured, focusRef, inputRef } = useSearchUI();
  const { value, setValue, submitSearch } = useSearchSubmit();

  useEffect(() => {
    if (isFocused) {
      open();
    } else {
      close();
    }
  }, [close, isFocused, open]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSearch();
    inputRef.current?.blur();
    close();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex flex-1 w-full max-w-165 px-1 h-10`}
    >
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
              name="search_query"
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
                type="button"
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
          type="submit"
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
    </form>
  );
}

export function SearchBarAndVoice() {
  return (
    <Suspense fallback={<SearchBarAndVoiceFallback />}>
      <SearchBarAndVoiceContent />
    </Suspense>
  );
}

"use client";

import type { FormEvent } from "react";
import { Suspense } from "react";
import clsx from "clsx";
import { useSearchUI } from "@/shared/lib/hooks";
import { useSearchSubmit } from "@/features/search/submit-query";
import { CrossIcon, SearchIcon } from "@/shared/ui/icons";

function SearchBarFallback() {
  return (
    <div className="relative flex flex-1 w-full max-w-165 px-1 h-10">
      <div className="flex-1 rounded-l-full border border-(--border-color) bg-(--input-bg-color)" />
      <div className="w-16 rounded-r-full border border-(--border-color) border-l-0 bg-(--btn-bg-color)" />
    </div>
  );
}

function SearchBarContent() {
  const { isFocused, onFocused, onBlured, focusRef, inputRef } = useSearchUI();
  const { value, setValue, submitSearch } = useSearchSubmit();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitSearch();
    inputRef.current?.blur();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`relative flex flex-1 w-full max-w-165 px-1 h-10`}
    >
      <div className="relative flex-1">
        <div
          onClick={focusRef}
          className={clsx(
            `absolute right-0 flex items-center justify-between border border-(--border-color)
             rounded-l-full py-1.25 pl-3 bg-(--input-bg-color) text-(--main-text-color)/70 text-lg cursor-text`,
            {
              "w-[105%] border-(--focus-input-color)": isFocused,
              "w-full": !isFocused,
            },
          )}
        >
          {isFocused && <SearchIcon width={28} height={28} />}

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
      >
        <SearchIcon />
      </button>
    </form>
  );
}

export function SearchBar() {
  return (
    <Suspense fallback={<SearchBarFallback />}>
      <SearchBarContent />
    </Suspense>
  );
}

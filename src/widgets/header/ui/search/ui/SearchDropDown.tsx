"use client";

import { useDropSearchContext } from "./DropSearchContext";
import { useSearchHistory } from "@/entities/search/model";
import { SearchHistory } from "./SearchHistory";

export function SearchDropDown() {
  const { searchHistory } = useSearchHistory();
  const { position } = useDropSearchContext();

  if (!position.width) return null;
  return (
    <div>
      {searchHistory.length > 0 && (
        <div
          onMouseDown={(e) => e.preventDefault()}
          className="fixed p-2 z-30 min-w-140 max-h-170 overflow-y-auto rounded-xl bg-(--bg-drop-menu) text-(--main-text-color)"
          style={{
            left: position.left - 26,
            top: position.top,
            width: position.width - 50,
          }}
        >
          {searchHistory.map((item) => (
            <SearchHistory
              key={item.id}
              id={item.id}
              text={item.text}
              img={item.img}
            />
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { HistoryIcon } from "@/shared/ui";
import { useSearchHistory } from "@/entities/search/model";
import { useState } from "react";
import { buildSearchResultsHref } from "@/features/search/submit-query";
import { useDropSearchContext } from "./DropSearchContext";
import { ClearSearchHistory } from "@/features/search/clear-history/ui/ClearSearchHistory";

interface SearchHistoryProps {
  id: string;
  text: string;
  img?: string;
}

export function SearchHistory({ id, text, img }: SearchHistoryProps) {
  const { searchHistory } = useSearchHistory();
  const { position } = useDropSearchContext();
  const [suggests, setSuggests] = useState<Set<string>>(new Set());

  if (!position.width) return null;

  function handleSuggestRemove(id: string) {
    setSuggests((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });

    console.log(searchHistory);
  }
  return (
    <div className="flex justify-between group pl-4 pr-2 py-2.5 hover:bg-(--hover-btn-color) rounded-lg cursor-default">
      {suggests.has(id) ? (
        <div className="text-(--grey-text-color) ml-5">Suggestion removed</div>
      ) : (
        <>
          <Link
            href={buildSearchResultsHref(text)}
            className="flex min-w-0 flex-1 gap-2"
          >
            <HistoryIcon className="w-5" />
            <p className="truncate font-semibold">{text}</p>
          </Link>
          <div className="flex justify-center items-center gap-2">
            {img && (
              <Image
                className="w-12 h-7 rounded-sm"
                width={20}
                height={20}
                src={img}
                alt={text}
              />
            )}
            <div onClick={() => handleSuggestRemove(id)}>
              <ClearSearchHistory id={id} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

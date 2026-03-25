"use client";

import { useSearchResults } from "@/entities/search-results";
import { SearchResultsEmpty } from "./SearchResultsEmpty";
import { SearchResultsError } from "./SearchResultsError";
import { SearchResultsList } from "./SearchResultsList";
import { SearchResultsSkeleton } from "./SearchResultsSkeleton";
import { SearchFilters } from "../SearchFilters";

type SearchResultsProps = {
  query: string;
};

const INITIAL_SKELETONS = [1, 2, 3, 4];
const APPEND_SKELETONS = [1, 2];

export function SearchResults({ query }: SearchResultsProps) {
  const { items, error, empty, hasQuery, isLoading, sentinelRef } =
    useSearchResults(query);
  const isInitialLoading = isLoading && items.length === 0;
  const isAppending = isLoading && items.length > 0;

  return (
    <section className="mt-12 pb-8 text-(--main-text-color)">
      <div className="mx-auto w-full max-w-500 px-2 sm:px-3 lg:px-4">
        {isInitialLoading ? (
          <div className="mx-auto max-w-7xl space-y-2.5">
            {INITIAL_SKELETONS.map((item) => (
              <SearchResultsSkeleton key={item} />
            ))}
          </div>
        ) : null}

        {!isInitialLoading && error && items.length === 0 ? (
          <SearchResultsError />
        ) : null}

        {isInitialLoading && empty ? (
          <SearchResultsEmpty query={query} hasQuery={hasQuery} />
        ) : null}

        {!isInitialLoading && !error && items.length > 0 ? (
          <>
            <SearchFilters />
            <SearchResultsList items={items} />
            <div ref={sentinelRef} className="h-8" />
          </>
        ) : null}

        {isAppending ? (
          <div className="mx-auto mt-2.5 max-w-7xl space-y-2.5">
            {APPEND_SKELETONS.map((item) => (
              <SearchResultsSkeleton key={`append-${item}`} />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}

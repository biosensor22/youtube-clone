type SearchResultsEmptyProps = {
  query: string;
  hasQuery: boolean;
};

export function SearchResultsEmpty({
  query,
  hasQuery,
}: SearchResultsEmptyProps) {
  return (
    <div className="mx-auto max-w-7xl rounded-xl bg-(--btn-bg-color) px-4 py-4.5 text-(--main-text-color)">
      <p className="text-[17px] font-semibold">
        {hasQuery
          ? `No results found for "${query}".`
          : "Search query is empty."}
      </p>
      <p className="mt-2 max-w-130 text-[14px] leading-6 text-(--grey-text-color)">
        {hasQuery
          ? "Try a broader title, a channel name, or a type keyword like live or playlist."
          : "Open this page with ?search_query=... or submit a query from the header search field."}
      </p>
    </div>
  );
}

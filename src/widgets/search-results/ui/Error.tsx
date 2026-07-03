export function SearchResultsError() {
  return (
    <div className="mx-auto max-w-7xl rounded-xl bg-(--btn-bg-color) px-4 py-4.5 text-(--main-text-color)">
      <p className="text-[17px] font-semibold">
        Failed to load search results.
      </p>
      <p className="mt-2 text-[14px] leading-6 text-(--grey-text-color)">
        Refresh the page or try another query.
      </p>
    </div>
  );
}

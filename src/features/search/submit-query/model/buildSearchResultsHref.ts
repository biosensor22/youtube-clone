export function buildSearchResultsHref(query: string) {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return "/results";
  }

  const params = new URLSearchParams({
    search_query: trimmedQuery,
  });

  return `/results?${params.toString()}`;
}

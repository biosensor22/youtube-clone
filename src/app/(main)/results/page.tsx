import dynamic from "next/dynamic";
import { SearchResults } from "@/widgets/search-results";

const SideBar = dynamic(() => import("@/widgets/sidebar"));

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search_query?: string | string[];
  }>;
}) {
  const params = await searchParams;
  const query = Array.isArray(params.search_query)
    ? (params.search_query[0] ?? "")
    : (params.search_query ?? "");

  return (
    <div className="duration-200 @mdxs:ml-18 overflow-y-hidden">
      <div>
        <SideBar />
      </div>
      <SearchResults query={query} />
    </div>
  );
}

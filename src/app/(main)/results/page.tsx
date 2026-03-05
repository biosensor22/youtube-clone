import dynamic from "next/dynamic";

const SideBar = dynamic(() => import("@/widgets/sidebar"));

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: { search_query?: string };
}) {
  const params = await searchParams;
  const query = params.search_query;

  return (
    <div className="mt-20 duration-200 @mdxs:ml-18 overflow-y-hidden">
      <div>
        <SideBar />
        {query}
      </div>
    </div>
  );
}

import type { FeedItem } from "@/entities/video-cards";
import { SearchResultCard } from "./SearchResultCard";

type SearchResultsListProps = {
  items: FeedItem[];
};

export function SearchResultsList({ items }: SearchResultsListProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-2.5 sm:space-y-0">
      {items.map((item, index) => (
        <SearchResultCard key={item.id} item={item} priority={index < 2} />
      ))}
    </div>
  );
}

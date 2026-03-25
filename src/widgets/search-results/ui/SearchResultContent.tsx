import Link from "next/link";
import type { FeedItem } from "@/entities/video-cards";
import type { SearchResultPresentation } from "@/entities/search-results";
import { SearchResultAuthor } from "./SearchResultAuthor";

type SearchResultContentProps = {
  item: FeedItem;
  watchHref: string;
  authorAvatar?: string;
  presentation: SearchResultPresentation;
};

export function SearchResultContent({
  item,
  watchHref,
  authorAvatar,
  presentation,
}: SearchResultContentProps) {
  return (
    <div className="min-w-0 pr-8 sm:pr-10">
      <Link href={watchHref} className="block">
        <h2 className="line-clamp-2 text-[16px] leading-5.5 sm:text-[20px] sm:leading-7">
          {item.title}
        </h2>
      </Link>

      <p className=" text-[13px] leading-5.5 text-(--grey-text-color)">
        {presentation.statsLine}
      </p>
      <SearchResultAuthor author={item.author} src={authorAvatar} />
      {item.type === "playlist" && (
        <div className="mt-2">
          <Link
            className="hover:text-(--main-text-color) text-[13px] leading-5.5 text-(--grey-text-color)"
            href={`/watch/${item.id}`}
          >
            View full playlist
          </Link>
        </div>
      )}

      {presentation.summaryLine ? (
        <p className="mt-2.5 max-w-180 text-[15px] leading-6 text-(--main-text-color)/80">
          {presentation.summaryLine}
        </p>
      ) : null}
    </div>
  );
}

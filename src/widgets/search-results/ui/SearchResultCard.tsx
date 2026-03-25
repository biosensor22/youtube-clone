"use client";

import type { FeedItem } from "@/entities/video-cards";
import { buildSearchResultPresentation } from "@/entities/search-results";
import { MenuButton } from "@/widgets/video-feed";
import { SearchResultContent } from "./SearchResultContent";
import { SearchResultThumbnail } from "./SearchResultThumbnail";

type SearchResultCardProps = {
  item: FeedItem;
  priority: boolean;
};

export function SearchResultCard({ item, priority }: SearchResultCardProps) {
  const presentation = buildSearchResultPresentation(item);
  const watchHref = `/watch/${item.id}`;
  const authorAvatar = "authorAvatar" in item ? item.authorAvatar : undefined;

  return (
    <article className="group relative p-2.5 transition-colors ">
      <div className="absolute right-3.5 top-2.5 opacity-100 transition-opacity cursor-pointer">
        <div className="relative h-8 w-8">
          <MenuButton type={item.type} />
        </div>
      </div>

      <div className="grid grid-cols-[minmax(0,46vw)_1fr] items-start gap-3.5 md:grid-cols-[420px_minmax(0,1fr)] lg:grid-cols-[460px_minmax(0,1fr)] md:gap-5">
        <SearchResultThumbnail
          item={item}
          watchHref={watchHref}
          priority={priority}
          presentation={presentation}
        />
        <SearchResultContent
          item={item}
          watchHref={watchHref}
          authorAvatar={authorAvatar}
          presentation={presentation}
        />
      </div>
    </article>
  );
}

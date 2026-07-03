import Image from "next/image";
import Link from "next/link";
import type { FeedItem } from "@/entities/video-cards";
import type { SearchResultPresentation } from "@/entities/search-results";
import { useDominantColor } from "@/widgets/video-feed";

type SearchResultThumbnailProps = {
  item: FeedItem;
  watchHref: string;
  priority: boolean;
  presentation: SearchResultPresentation;
};

function SearchResultMediaBadge({ mediaBadge }: { mediaBadge: string }) {
  return (
    <span className="absolute bottom-2 right-2 rounded-md bg-black/80 px-1.5 py-0.5 text-[11px] font-medium tracking-wide">
      {mediaBadge}
    </span>
  );
}

export function SearchResultThumbnail({
  item,
  watchHref,
  priority,
  presentation,
}: SearchResultThumbnailProps) {
  const dominantColor = useDominantColor(item.thumbnail);

  return (
    <Link href={watchHref} className="relative block mt-2">
      {item.type === "playlist" && (
        <div className="absolute -top-2.5 cursor-pointer items-center flex flex-col w-full z-1">
          <div
            style={{ "--bg": dominantColor } as React.CSSProperties}
            className="w-[90%] h-1 mb-px bg-[rgba(var(--bg),0.2)] border border-transparent rounded-t-3xl"
          />
          <div
            style={{ "--bg": dominantColor } as React.CSSProperties}
            className="w-[95%] h-1 bg-[rgba(var(--bg),0.5)] border border-transparent rounded-t-3xl"
          />
        </div>
      )}

      <div className="relative rounded-xl aspect-video">
        <Image
          src={item.thumbnail}
          alt={item.title}
          fill
          className="object-cover rounded-xl"
          sizes="(max-width: 767px) 46vw, (max-width: 1279px) 420px, 460px"
          priority={priority}
        />
      </div>
      <SearchResultMediaBadge mediaBadge={presentation.mediaBadge} />
    </Link>
  );
}

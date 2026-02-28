import Image from "next/image";
import Link from "next/link";
import { MenuIcon } from "@/shared/ui/icons/feed-icons/MenuIcon";
import type { VideoItem } from "@/entities/video-cards";
import { timeAgo, numberConvert } from "@/shared/lib/hooks";

type RecommendationsProps = {
  recommendations: VideoItem[];
};

export function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <aside>
      <h2 className="text-base font-semibold">Recommended</h2>
      <div className="mt-3 space-y-2.5">
        {recommendations.map((video) => (
          <div
            key={video.id}
            className="group flex rounded-xl p-1.5 hover:bg-(--btn-bg-color)"
          >
            <Link
              href={`/watch/${video.id}`}
              className="flex min-w-0 flex-1 gap-3"
            >
              <div className="relative h-23.5 w-42 shrink-0 overflow-hidden rounded-xl">
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover"
                  sizes="168px"
                />
                <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1 text-[11px]">
                  {video.duration}
                </span>
              </div>

              <div className="min-w-0">
                <p className="line-clamp-2 text-sm font-medium leading-5">
                  {video.title}
                </p>
                <p className="mt-1 text-xs text-(--grey-text-color)">
                  {video.author}
                </p>
                <p className="mt-0.5 text-xs text-(--grey-text-color)">
                  {numberConvert(video.views)} views •{" "}
                  {timeAgo(video.publishedAt)}
                </p>
              </div>
            </Link>

            <button
              aria-label="Recommendation options"
              className="mt-1 h-8 w-8 shrink-0 rounded-full p-1.5 opacity-100 hover:bg-(--hover-btn-color) sm:opacity-0 sm:group-hover:opacity-100"
            >
              <MenuIcon className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </aside>
  );
}

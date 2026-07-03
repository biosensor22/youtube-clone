import Image from "next/image";
import Link from "next/link";
import { timeAgo, numberConvert } from "@/shared/lib/hooks";

type RecommendLinkProps = {
  id: string;
  thumbnail: string;
  author: string;
  title: string;
  duration: string;
  views: number;
  publishedAt: string;
};

export function RecommendLink({
  id,
  thumbnail,
  title,
  duration,
  author,
  views,
  publishedAt,
}: RecommendLinkProps) {
  return (
    <Link href={`/watch/${id}`} className="flex flex-1 gap-2.5">
      <div className="relative max-w-100 h-40 w-[50%] 2xl:w-[65%] 2xl:h-50 shrink-0 overflow-hidden rounded-lg">
        <Image src={thumbnail} alt={title} fill className="object-cover" />
        <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1 text-[11px] font-medium">
          {duration}
        </span>
      </div>

      <div className="min-w-0 pr-1">
        <p className="line-clamp-2 text-[14px] font-medium leading-5">
          {title}
        </p>
        <p className="mt-1 text-[12px] text-(--grey-text-color) truncate">
          {author}
        </p>
        <p className="mt-0.5 text-[12px] text-(--grey-text-color)">
          {numberConvert(views)} views • {timeAgo(publishedAt)}
        </p>
      </div>
    </Link>
  );
}

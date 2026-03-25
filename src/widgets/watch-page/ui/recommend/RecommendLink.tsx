import Image from "next/image";
import Link from "next/link";
import { timeAgo, numberConvert } from "@/shared/lib/hooks";
import { MenuIcon } from "@/shared/ui/icons";

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
    <Link href={`/watch/${id}`} className="flex min-w-0 flex-1 gap-2.5">
      <div className="relative h-23.5 w-42 shrink-0 overflow-hidden rounded-xl">
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
          sizes="168px"
        />
        <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1 text-[11px] font-medium">
          {duration}
        </span>
      </div>

      <div className="min-w-0 pr-1">
        <p className="line-clamp-2 text-[14px] font-medium leading-5">
          {title}
        </p>
        <p className="mt-1 text-[12px] text-(--grey-text-color)">{author}</p>
        <p className="mt-0.5 text-[12px] text-(--grey-text-color)">
          {numberConvert(views)} views • {timeAgo(publishedAt)}
        </p>
      </div>
    </Link>
  );
}

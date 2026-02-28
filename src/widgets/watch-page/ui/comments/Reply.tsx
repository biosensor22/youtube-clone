import { timeAgo } from "@/shared/lib/hooks";
import Image from "next/image";

interface ReplyProps {
  id: string;
  authorAvatar: string;
  author: string;
  publishedAt: string;
  text: string;
}

export function Reply({
  id,
  authorAvatar,
  author,
  publishedAt,
  text,
}: ReplyProps) {
  return (
    <div key={id} className="flex gap-2.5">
      <Image
        src={authorAvatar}
        alt={author}
        width={28}
        height={28}
        className="h-7 w-7 rounded-full"
      />
      <div className="min-w-0">
        <p className="text-xs font-medium leading-5">
          {author}
          <span className="ml-1 text-[11px] text-(--grey-text-color)">
            {timeAgo(publishedAt)}
          </span>
        </p>
        <p className="text-xs leading-5">{text}</p>
      </div>
    </div>
  );
}

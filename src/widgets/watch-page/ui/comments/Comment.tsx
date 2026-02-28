import type { ReactNode } from "react";
import { timeAgo, numberConvert } from "@/shared/lib/hooks";
import { MenuIcon, ThumbUpIcon } from "@/shared/ui";
import Image from "next/image";

interface CommentProps {
  id: string;
  authorAvatar: string;
  author: string;
  publishedAt: string;
  text: string;
  isLiked: boolean;
  likes: number;
  onToggleComment: (commentId: string) => void;
  children?: ReactNode;
}

export function Comment({
  id,
  authorAvatar,
  author,
  publishedAt,
  text,
  isLiked,
  likes,
  onToggleComment,
  children,
}: CommentProps) {
  return (
    <article key={id} className="flex gap-3">
      <Image
        src={authorAvatar}
        alt={author}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-sm font-medium">
            {author}
            <span className="text-xs text-(--grey-text-color)">
              {timeAgo(publishedAt)}
            </span>
          </p>
          <button
            className="rounded-full p-1.5 hover:bg-(--hover-btn-color)"
            aria-label="Comment options"
          >
            <MenuIcon className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-1 text-sm leading-6">{text}</p>
        <button
          onClick={() => onToggleComment(id)}
          className={`mt-2 flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
            isLiked
              ? "bg-white text-black"
              : "bg-(--btn-bg-color) text-white hover:bg-(--hover-btn-color)"
          }`}
        >
          <ThumbUpIcon className="h-4 w-4" />
          {numberConvert(likes)}
        </button>
        {children}
      </div>
    </article>
  );
}

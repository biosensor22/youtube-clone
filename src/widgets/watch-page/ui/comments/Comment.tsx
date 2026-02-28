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
    <article key={id} className="group flex gap-3">
      <Image
        src={authorAvatar}
        alt={author}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full"
      />
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="text-[13px] font-medium leading-5">
            {author}
            <span className="ml-1 text-xs text-(--grey-text-color)">
              {timeAgo(publishedAt)}
            </span>
          </p>
          <button
            className="rounded-full p-1.5 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-(--hover-btn-color)"
            aria-label="Comment options"
          >
            <MenuIcon className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-0.5 text-sm leading-6">{text}</p>
        <button
          onClick={() => onToggleComment(id)}
          className={`mt-1.5 inline-flex h-8 items-center gap-1.5 rounded-full px-2.5 text-xs font-medium ${
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

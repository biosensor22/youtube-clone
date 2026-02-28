"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import { Options } from "./Options";
import { Actions } from "./Actions";
import { ReplyToggle } from "./ReplyToggle";
import { useToggleComment } from "./model/useToggleComment";
import { Author } from "./Author";

interface CommentProps {
  id: string;
  authorAvatar: string;
  author: string;
  publishedAt: string;
  text: string;
  isAuthor: boolean;
  isLiked: boolean;
  likes: number;
  creatorAvatar: string;
  showCreatorLike: boolean;
  repliesCount: number;
  isRepliesOpen: boolean;
  onToggleReplies: () => void;
  onToggleComment: (commentId: string) => void;
  children?: ReactNode;
}

export function Comment({
  id,
  authorAvatar,
  author,
  publishedAt,
  text,
  isAuthor,
  isLiked,
  likes,
  creatorAvatar,
  showCreatorLike,
  repliesCount,
  isRepliesOpen,
  onToggleReplies,
  onToggleComment,
  children,
}: CommentProps) {
  const {
    optionsClose,
    optionsToggle,
    isOptionsOpen,
    modalRef,
    optionsTriggerRef,
  } = useToggleComment();
  const handleLikeComment = (id: string) => {
    onToggleComment(id);
  };

  return (
    <article key={id} className="group flex gap-3">
      <Image
        src={authorAvatar}
        alt={author}
        width={40}
        height={40}
        className="h-10 w-10 rounded-full"
      />
      <div className="min-w-0 -mt-3 flex-1">
        <div className="flex justify-between">
          <Author
            author={author}
            isAuthor={isAuthor}
            publishedAt={publishedAt}
          />

          <Options
            optionsTriggerRef={optionsTriggerRef}
            modalRef={modalRef}
            onToggle={optionsToggle}
            onClose={optionsClose}
            isOptionsOpen={isOptionsOpen}
          />
        </div>
        <p className="mt-0.5 text-[14px] leading-1">{text}</p>
        <button className="mt-2 text-[14px] font-semibold text-(--grey-text-color) hover:text-white">
          Translate to English
        </button>

        <Actions
          id={id}
          onLike={handleLikeComment}
          likes={likes}
          showCreatorLike={showCreatorLike}
          creatorAvatar={creatorAvatar}
        />

        <ReplyToggle
          repliesCount={repliesCount}
          onToggleReplies={onToggleReplies}
          isRepliesOpen={isRepliesOpen}
        />

        {isRepliesOpen ? children : null}
      </div>
    </article>
  );
}

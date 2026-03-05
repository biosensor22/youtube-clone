"use client";

import { useState } from "react";
import type { WatchComment } from "@/entities/watch";
import { QueueIcon } from "@/shared/ui/icons";
import { AddComment } from "./AddComment";
import { Comment } from "./Comment";
import { Reply } from "./Reply";

type CommentsSectionProps = {
  comments: WatchComment[];
  channelName: string;
  channelAvatar: string;
  newCommentText: string;
  onChangeNewComment: (value: string) => void;
  onCancelComment: () => void;
  onCreateComment: () => void;
  likedComments: Record<string, boolean>;
  onToggleCommentLike: (commentId: string) => void;
};

export function CommentsSection({
  comments,
  channelName,
  channelAvatar,
  newCommentText,
  onChangeNewComment,
  onCancelComment,
  onCreateComment,
  likedComments,
  onToggleCommentLike,
}: CommentsSectionProps) {
  const [openedReplies, setOpenedReplies] = useState<Record<string, boolean>>(
    {},
  );

  const toggleReplies = (commentId: string) => {
    setOpenedReplies((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return (
    <section className="mt-6">
      <div className="flex items-center gap-7">
        <h2 className="text-xl font-semibold">{comments.length} Comments</h2>
        <button className="inline-flex items-center gap-2 text-sm font-medium hover:text-(--main-text-color)/85">
          <QueueIcon className="h-4.5 w-4.5" />
          Sort by
        </button>
      </div>

      <AddComment
        onCancel={onCancelComment}
        onCreate={onCreateComment}
        onChangeNewComment={onChangeNewComment}
        newCommentText={newCommentText}
      />

      <div className="mt-7 space-y-6">
        {comments.map((comment) => {
          const isLiked = Boolean(likedComments[comment.id]);
          const likes = comment.likes + (isLiked ? 1 : 0);

          return (
            <Comment
              key={comment.id}
              id={comment.id}
              authorAvatar={comment.authorAvatar}
              author={comment.author}
              publishedAt={comment.publishedAt}
              text={comment.text}
              isAuthor={comment.author === channelName}
              isLiked={isLiked}
              likes={likes}
              creatorAvatar={channelAvatar}
              showCreatorLike={comment.author !== channelName && likes > 0}
              repliesCount={comment.replies?.length ?? 0}
              isRepliesOpen={Boolean(openedReplies[comment.id])}
              onToggleReplies={() => toggleReplies(comment.id)}
              onToggleComment={onToggleCommentLike}
            >
              {comment.replies?.length ? (
                <div className="mt-3 space-y-3 border-l border-(--border-color) pl-3">
                  {comment.replies.map((reply) => (
                    <Reply
                      key={reply.id}
                      id={reply.id}
                      authorAvatar={reply.authorAvatar}
                      author={reply.author}
                      publishedAt={reply.publishedAt}
                      text={reply.text}
                      isAuthor={reply.author === channelName}
                    />
                  ))}
                </div>
              ) : null}
            </Comment>
          );
        })}
      </div>
    </section>
  );
}

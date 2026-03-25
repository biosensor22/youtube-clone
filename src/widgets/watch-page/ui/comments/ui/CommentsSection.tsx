"use client";

import type { WatchComment } from "@/entities/watch";
import { AddComment } from "./AddComment";
import { Comment } from "./Comment";
import { Reply } from "./Reply";
import { CommentsCount } from "./CommentsCount";
import { useToggleReplies } from "../model/useToggleReplies";

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
  const { openedReplies, toggleReplies } = useToggleReplies();

  return (
    <section className="mt-6">
      <CommentsCount commentsLength={comments.length} />

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

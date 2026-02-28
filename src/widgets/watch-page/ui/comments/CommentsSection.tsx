import type { WatchComment } from "@/entities/watch";
import { QueueIcon } from "@/shared/ui/icons";
import { AddComment } from "./AddComment";
import { Comment } from "./Comment";
import { Reply } from "./Reply";

type CommentsSectionProps = {
  comments: WatchComment[];
  newCommentText: string;
  onChangeNewComment: (value: string) => void;
  onCancelComment: () => void;
  onCreateComment: () => void;
  likedComments: Record<string, boolean>;
  onToggleCommentLike: (commentId: string) => void;
};

export function CommentsSection({
  comments,
  newCommentText,
  onChangeNewComment,
  onCancelComment,
  onCreateComment,
  likedComments,
  onToggleCommentLike,
}: CommentsSectionProps) {
  return (
    <section className="mt-6">
      <div className="flex items-center gap-7">
        <h2 className="text-xl font-semibold">{comments.length} Comments</h2>
        <button className="inline-flex items-center gap-2 text-sm font-medium hover:text-white/85">
          <QueueIcon className="h-[18px] w-[18px]" />
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
              isLiked={isLiked}
              likes={likes}
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

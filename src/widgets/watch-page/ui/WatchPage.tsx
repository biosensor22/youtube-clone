"use client";

import type {
  WatchChannel,
  WatchComment,
  WatchMediaItem,
} from "@/entities/watch";
import { CommentsSection } from "./comments/ui";
import { Actions } from "./actions";
import { Description } from "./desctiption";
import { WatchPlayer } from "./videoplayer";
import {
  useWatchChannelMeta,
  useWatchComments,
  useWatchSubscription,
  useWatchVideoReactions,
} from "@/widgets/watch-page/model";

type WatchPageProps = {
  currentItem: WatchMediaItem;
  channel: WatchChannel | null;
  comments: WatchComment[];
};

export function WatchPage({ currentItem, channel, comments }: WatchPageProps) {
  const { isSubscribed, toggleSubscription } = useWatchSubscription();
  const {
    channelAvatar,
    channelName,
    subscribers,
    hashtags,
    description,
    primaryMeta,
    secondaryMeta,
    reactionBase,
    showComments,
  } = useWatchChannelMeta(channel, currentItem);
  const {
    videoReaction,
    likeRollKey,
    displayedLikeCount,
    displayedDislikeCount,
    handleLike,
    handleDislike,
  } = useWatchVideoReactions(reactionBase);
  const {
    newCommentText,
    setNewCommentText,
    commentsList,
    likedComments,
    handleCreateComment,
    handleToggleCommentLike,
  } = useWatchComments(comments, currentItem.id);

  return (
    <section className="min-w-0">
      <WatchPlayer
        title={currentItem.title}
        thumbnail={currentItem.thumbnail}
      />

      <h1 className="mt-3 text-xl font-semibold leading-7">
        {currentItem.title}
      </h1>

      <Actions
        channelAvatar={channelAvatar}
        channelName={channelName}
        subscribers={subscribers}
        verified={Boolean(channel?.verified)}
        isSubscribed={isSubscribed}
        onToggleSubscribe={toggleSubscription}
        videoReaction={videoReaction}
        displayedLikeCount={displayedLikeCount}
        dislikeCount={displayedDislikeCount}
        likeRollKey={likeRollKey}
        onLike={handleLike}
        onDislike={handleDislike}
      />

      <Description
        primaryMeta={primaryMeta}
        secondaryMeta={secondaryMeta}
        description={description}
        hashtags={hashtags}
      />

      {showComments ? (
        <CommentsSection
          comments={commentsList}
          channelName={channelName}
          channelAvatar={channelAvatar}
          newCommentText={newCommentText}
          onChangeNewComment={setNewCommentText}
          onCancelComment={() => setNewCommentText("")}
          onCreateComment={handleCreateComment}
          likedComments={likedComments}
          onToggleCommentLike={handleToggleCommentLike}
        />
      ) : null}
    </section>
  );
}

"use client";

import type { VideoItem } from "@/entities/video-cards";
import type { WatchChannel, WatchComment } from "@/entities/watch";
import { CommentsSection } from "./comments";
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
  currentVideo: VideoItem;
  channel: WatchChannel | null;
  comments: WatchComment[];
};

export function WatchPage({ currentVideo, channel, comments }: WatchPageProps) {
  const { isSubscribed, toggleSubscription } = useWatchSubscription();
  const {
    videoReaction,
    likeRollKey,
    displayedLikeCount,
    displayedDislikeCount,
    handleLike,
    handleDislike,
  } = useWatchVideoReactions(currentVideo.views);
  const {
    newCommentText,
    setNewCommentText,
    commentsList,
    likedComments,
    handleCreateComment,
    handleToggleCommentLike,
  } = useWatchComments(comments, currentVideo.id);
  const { channelAvatar, channelName, subscribers, hashtags, description } =
    useWatchChannelMeta(channel, currentVideo);

  return (
    <section className="min-w-0">
      <WatchPlayer
        title={currentVideo.title}
        thumbnail={currentVideo.thumbnail}
      />

      <h1 className="mt-3 text-[21px] font-semibold leading-7">
        {currentVideo.title}
      </h1>
      <div className="mt-1 flex flex-wrap gap-2 text-sm text-(--video-blue-checked)">
        {hashtags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>

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
        views={currentVideo.views}
        publishedAt={currentVideo.publishedAt}
        description={description}
      />

      <CommentsSection
        comments={commentsList}
        newCommentText={newCommentText}
        onChangeNewComment={setNewCommentText}
        onCancelComment={() => setNewCommentText("")}
        onCreateComment={handleCreateComment}
        likedComments={likedComments}
        onToggleCommentLike={handleToggleCommentLike}
      />
    </section>
  );
}

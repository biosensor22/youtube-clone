"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useWatchPageData, type WatchComment } from "@/entities/watch";
import { timeAgo, viewsConvert } from "@/shared/lib/hooks";
import { SaveIcon, ShareIcon } from "@/shared/ui/icons";

type WatchPageProps = {
  videoId: string;
};

type VideoReaction = "like" | "dislike" | null;

function ThumbUpIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M2 21h4V9H2v12Zm19-11a2 2 0 0 0-2-2h-6.31l.95-4.57.03-.32a1.5 1.5 0 0 0-.44-1.06L12.17 1 6.59 6.59A2 2 0 0 0 6 8v11a2 2 0 0 0 2 2h8a2 2 0 0 0 1.9-1.37l3-9A2 2 0 0 0 21 10Z" />
    </svg>
  );
}

function ThumbDownIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M22 3h-4v12h4V3ZM3 14a2 2 0 0 0 2 2h6.31l-.95 4.57-.03.32a1.5 1.5 0 0 0 .44 1.06L11.83 23l5.58-5.59A2 2 0 0 0 18 16V5a2 2 0 0 0-2-2H8a2 2 0 0 0-1.9 1.37l-3 9A2 2 0 0 0 3 14Z" />
    </svg>
  );
}

function VerifyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2 9.6 4.2 6.4 4l-.8 3.2L3 9.6l2.2 2.4L5 15.2l3.2.8L10.4 19l2.4-2.2 3.2.2.8-3.2 2.6-2.4-2.2-2.4.2-3.2-3.2-.8L12 2Zm-1.1 12.3-2.8-2.8 1.4-1.4 1.4 1.4 3.5-3.5 1.4 1.4-4.9 4.9Z" />
    </svg>
  );
}

function formatCompactNumber(value: number) {
  return String(viewsConvert(value));
}

export function WatchPage({ videoId }: WatchPageProps) {
  const {
    currentVideo,
    channel,
    comments,
    recommendations,
    previousVideoId,
    nextVideoId,
    isLoading,
    error,
  } = useWatchPageData(videoId);

  const [videoReaction, setVideoReaction] = useState<VideoReaction>(null);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [newCommentText, setNewCommentText] = useState("");
  const [localComments, setLocalComments] = useState<WatchComment[]>([]);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  const commentsList = useMemo(
    () => [...localComments, ...comments],
    [localComments, comments],
  );

  const likeCount = currentVideo ? Math.max(1, Math.floor(currentVideo.views * 0.04)) : 0;
  const dislikeCount = currentVideo
    ? Math.max(1, Math.floor(currentVideo.views * 0.002))
    : 0;

  const resolvedChannelAvatar = channel?.avatar || currentVideo?.authorAvatar || "";
  const resolvedChannelName = channel?.name || currentVideo?.author || "Unknown channel";
  const resolvedSubscribers = channel?.subscribers || 0;

  const handleCreateComment = () => {
    const text = newCommentText.trim();
    if (!text || !currentVideo) return;

    const comment: WatchComment = {
      id: `local-${Date.now()}`,
      videoId: currentVideo.id,
      channelId: "local-user",
      author: "You",
      authorAvatar: "https://i.pravatar.cc/96?u=local-user",
      text,
      likes: 0,
      publishedAt: new Date().toISOString(),
    };

    setLocalComments((prev) => [comment, ...prev]);
    setNewCommentText("");
  };

  const toggleCommentLike = (commentId: string) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  if (isLoading) {
    return (
      <div className="mt-29 @mdxs:ml-18 px-4 py-8 text-white">
        Loading watch page...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-29 @mdxs:ml-18 px-4 py-8 text-white">
        Failed to load watch page data.
      </div>
    );
  }

  if (!currentVideo) {
    return (
      <div className="mt-29 @mdxs:ml-18 px-4 py-8 text-white">
        Video not found.
      </div>
    );
  }

  return (
    <div className="mt-29 pb-10 duration-200 @mdxs:ml-18 text-white">
      <div className="mx-auto grid max-w-[1750px] grid-cols-1 gap-6 px-3 sm:px-4 lg:grid-cols-[minmax(0,1fr)_380px] lg:px-6">
        <section className="min-w-0">
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
            <Image
              src={currentVideo.thumbnail}
              alt={currentVideo.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 75vw"
              priority
            />
            <div className="absolute inset-0 bg-black/25" />
            <button className="absolute bottom-4 right-4 rounded-full bg-black/70 px-4 py-2 text-sm font-medium">
              Playing now
            </button>
          </div>

          <h1 className="mt-4 text-xl font-semibold leading-7">{currentVideo.title}</h1>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <Image
                src={resolvedChannelAvatar}
                alt={resolvedChannelName}
                width={42}
                height={42}
                className="h-[42px] w-[42px] rounded-full"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-sm font-semibold">{resolvedChannelName}</p>
                  {channel?.verified ? (
                    <VerifyIcon className="h-4 w-4 text-(--grey-text-color)" />
                  ) : null}
                </div>
                <p className="text-xs text-(--grey-text-color)">
                  {formatCompactNumber(resolvedSubscribers)} subscribers
                </p>
              </div>
              <button
                onClick={() => setIsSubscribed((prev) => !prev)}
                className={`ml-1 rounded-full px-4 py-2 text-sm font-medium ${
                  isSubscribed
                    ? "bg-(--btn-bg-color) text-white"
                    : "bg-white text-black hover:opacity-90"
                }`}
              >
                {isSubscribed ? "Subscribed" : "Subscribe"}
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center overflow-hidden rounded-full bg-(--btn-bg-color)">
                <button
                  onClick={() =>
                    setVideoReaction((prev) => (prev === "like" ? null : "like"))
                  }
                  className={`flex items-center gap-2 px-4 py-2 text-sm ${
                    videoReaction === "like"
                      ? "bg-white text-black"
                      : "text-white hover:bg-(--hover-btn-color)"
                  }`}
                >
                  <ThumbUpIcon className="h-5 w-5" />
                  {formatCompactNumber(likeCount + (videoReaction === "like" ? 1 : 0))}
                </button>
                <div className="h-5 w-px bg-(--border-color)" />
                <button
                  onClick={() =>
                    setVideoReaction((prev) => (prev === "dislike" ? null : "dislike"))
                  }
                  className={`px-3 py-2 ${
                    videoReaction === "dislike"
                      ? "bg-white text-black"
                      : "text-white hover:bg-(--hover-btn-color)"
                  }`}
                  aria-label="Dislike"
                >
                  <ThumbDownIcon className="h-5 w-5" />
                  <span className="sr-only">
                    {formatCompactNumber(
                      dislikeCount + (videoReaction === "dislike" ? 1 : 0),
                    )}
                  </span>
                </button>
              </div>

              <button className="flex items-center gap-2 rounded-full bg-(--btn-bg-color) px-4 py-2 text-sm hover:bg-(--hover-btn-color)">
                <ShareIcon className="h-5 w-5" />
                Share
              </button>

              <button className="flex items-center gap-2 rounded-full bg-(--btn-bg-color) px-4 py-2 text-sm hover:bg-(--hover-btn-color)">
                <SaveIcon className="h-5 w-5" />
                Save
              </button>
            </div>
          </div>

          <div className="mt-4 rounded-xl bg-(--btn-bg-color) px-4 py-3 text-sm">
            <p className="font-medium">
              {formatCompactNumber(currentVideo.views)} views •{" "}
              {timeAgo(currentVideo.publishedAt)}
            </p>
            <p className="mt-2 leading-6 text-(--grey-text-color)">
              {channel?.description || "No channel description yet."}
            </p>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {previousVideoId ? (
              <Link
                href={`/watch/${previousVideoId}`}
                className="rounded-full bg-(--btn-bg-color) px-4 py-2 text-sm hover:bg-(--hover-btn-color)"
              >
                Previous video
              </Link>
            ) : null}

            {nextVideoId ? (
              <Link
                href={`/watch/${nextVideoId}`}
                className="rounded-full bg-(--btn-bg-color) px-4 py-2 text-sm hover:bg-(--hover-btn-color)"
              >
                Next video
              </Link>
            ) : null}
          </div>

          <section className="mt-7">
            <h2 className="text-lg font-semibold">{commentsList.length} comments</h2>
            <div className="mt-3 flex items-start gap-3">
              <Image
                src="https://i.pravatar.cc/96?u=local-user"
                alt="You"
                width={40}
                height={40}
                className="rounded-full"
              />
              <div className="w-full">
                <input
                  value={newCommentText}
                  onChange={(event) => setNewCommentText(event.target.value)}
                  placeholder="Add a comment..."
                  className="w-full border-b border-(--border-color) bg-transparent px-1 py-2 outline-none focus:border-white"
                />
                <div className="mt-2 flex justify-end gap-2">
                  <button
                    onClick={() => setNewCommentText("")}
                    className="rounded-full px-4 py-1.5 text-sm hover:bg-(--hover-btn-color)"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreateComment}
                    className="rounded-full bg-(--btn-bg-color) px-4 py-1.5 text-sm hover:bg-(--hover-btn-color)"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 space-y-6">
              {commentsList.map((comment) => {
                const isLiked = Boolean(likedComments[comment.id]);
                const likes = comment.likes + (isLiked ? 1 : 0);

                return (
                  <article key={comment.id} className="flex gap-3">
                    <Image
                      src={comment.authorAvatar}
                      alt={comment.author}
                      width={40}
                      height={40}
                      className="h-10 w-10 rounded-full"
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {comment.author}{" "}
                        <span className="text-xs text-(--grey-text-color)">
                          {timeAgo(comment.publishedAt)}
                        </span>
                      </p>
                      <p className="mt-1 text-sm leading-6">{comment.text}</p>
                      <button
                        onClick={() => toggleCommentLike(comment.id)}
                        className={`mt-2 flex items-center gap-1 rounded-full px-2 py-1 text-xs ${
                          isLiked
                            ? "bg-white text-black"
                            : "bg-(--btn-bg-color) text-white hover:bg-(--hover-btn-color)"
                        }`}
                      >
                        <ThumbUpIcon className="h-4 w-4" />
                        {formatCompactNumber(likes)}
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </section>

        <aside>
          <h2 className="text-base font-semibold">Recommended</h2>
          <div className="mt-4 space-y-3">
            {recommendations.map((video) => (
              <Link
                key={video.id}
                href={`/watch/${video.id}`}
                className="flex gap-3 rounded-xl p-1.5 hover:bg-(--btn-bg-color)"
              >
                <div className="relative h-[94px] w-[168px] shrink-0 overflow-hidden rounded-xl">
                  <Image
                    src={video.thumbnail}
                    alt={video.title}
                    fill
                    className="object-cover"
                    sizes="168px"
                  />
                  <span className="absolute bottom-1.5 right-1.5 rounded bg-black/80 px-1 text-[11px]">
                    {video.duration}
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="line-clamp-2 text-sm font-medium leading-5">{video.title}</p>
                  <p className="mt-1 text-xs text-(--grey-text-color)">{video.author}</p>
                  <p className="mt-0.5 text-xs text-(--grey-text-color)">
                    {formatCompactNumber(video.views)} views • {timeAgo(video.publishedAt)}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
}

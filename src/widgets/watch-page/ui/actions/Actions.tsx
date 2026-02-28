import Image from "next/image";
import { numberConvert } from "@/shared/lib/hooks";
import {
  MenuIcon,
  SaveIcon,
  ShareIcon,
  ThumbDownIcon,
  ThumbUpIcon,
  VerifyIcon,
} from "@/shared/ui/icons";
type VideoReaction = "like" | "dislike" | null;

type WatchActionRowProps = {
  channelAvatar: string;
  channelName: string;
  subscribers: number;
  verified: boolean;
  isSubscribed: boolean;
  onToggleSubscribe: () => void;
  videoReaction: VideoReaction;
  displayedLikeCount: number;
  dislikeCount: number;
  likeRollKey: number;
  onLike: () => void;
  onDislike: () => void;
};

export function Actions({
  channelAvatar,
  channelName,
  subscribers,
  verified,
  isSubscribed,
  onToggleSubscribe,
  videoReaction,
  displayedLikeCount,
  dislikeCount,
  likeRollKey,
  onLike,
  onDislike,
}: WatchActionRowProps) {
  return (
    <div className="mt-3 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 items-center gap-3">
        <Image
          src={channelAvatar}
          alt={channelName}
          width={42}
          height={42}
          className="h-10.5 w-10.5 rounded-full"
        />
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-sm font-semibold">{channelName}</p>
            {verified ? (
              <VerifyIcon className="h-4 w-4 text-(--grey-text-color)" />
            ) : null}
          </div>
          <p className="text-xs text-(--grey-text-color)">
            {numberConvert(subscribers)} subscribers
          </p>
        </div>
        <button
          onClick={onToggleSubscribe}
          className={`ml-1 rounded-full px-4 py-2 text-sm font-medium ${
            isSubscribed
              ? "bg-(--btn-bg-color) text-white"
              : "bg-white text-black hover:opacity-90"
          }`}
        >
          {isSubscribed ? "Subscribed" : "Subscribe"}
        </button>
      </div>

      <div className="flex flex-wrap items-center gap-2 lg:justify-end">
        <div className="inline-flex items-center overflow-hidden rounded-full bg-(--btn-bg-color)">
          <button
            onClick={onLike}
            className="group relative overflow-hidden px-4 py-2 text-sm"
          >
            <span
              className={`absolute inset-0 origin-left bg-white transition-transform duration-250 ${
                videoReaction === "like" ? "scale-x-100" : "scale-x-0"
              }`}
            />
            <span
              className={`relative z-10 flex items-center gap-2 transition-colors duration-200 ${
                videoReaction === "like" ? "text-black" : "text-white"
              }`}
            >
              <ThumbUpIcon className="h-5 w-5" />
              <span className="relative inline-flex h-5 min-w-[3ch] items-center overflow-hidden">
                <span
                  key={`${displayedLikeCount}-${likeRollKey}`}
                  className="like-counter-roll inline-block"
                >
                  {numberConvert(displayedLikeCount)}
                </span>
              </span>
            </span>
          </button>

          <div className="h-5 w-px bg-(--border-color)" />

          <button
            onClick={onDislike}
            className={`px-3 py-2 ${
              videoReaction === "dislike"
                ? "bg-white text-black"
                : "text-white hover:bg-(--hover-btn-color)"
            }`}
            aria-label="Dislike"
          >
            <ThumbDownIcon className="h-5 w-5" />
            <span className="sr-only">{numberConvert(dislikeCount)}</span>
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

        <button
          className="rounded-full bg-(--btn-bg-color) p-2 hover:bg-(--hover-btn-color)"
          aria-label="Video options"
        >
          <MenuIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

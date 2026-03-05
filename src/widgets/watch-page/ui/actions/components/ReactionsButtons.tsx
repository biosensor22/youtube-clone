import { numberConvert } from "@/shared/lib/hooks";
import { ThumbDownIcon, ThumbUpIcon } from "@/shared/ui/icons";
import type { VideoReaction } from "../model";

type ReactionsButtonsProps = {
  videoReaction: VideoReaction;
  displayedLikeCount: number;
  dislikeCount: number;
  likeRollKey: number;
  onLike: () => void;
  onDislike: () => void;
};

export function ReactionsButtons({
  videoReaction,
  displayedLikeCount,
  dislikeCount,
  likeRollKey,
  onLike,
  onDislike,
}: ReactionsButtonsProps) {
  const isLikeActive = videoReaction === "like";
  const isDislikeActive = videoReaction === "dislike";

  return (
    <div className="inline-flex h-9 shrink-0 items-stretch overflow-hidden rounded-full bg-(--btn-bg-color)">
      <button
        onClick={onLike}
        className={`relative flex items-center px-3 text-(--main-text-color) hover:bg-(--hover-btn-color) text-[14px] `}
        aria-label="Like"
      >
        <ThumbUpIcon fill={isLikeActive ? "white" : "none"} />
        <span
          className="relative px-1 text-(--main-text-color) font-medium inline-flex h-5
         items-center overflow-hidden"
        >
          <span
            key={`${displayedLikeCount}-${likeRollKey}`}
            className="like-counter-roll inline-block"
          >
            {numberConvert(displayedLikeCount)}
          </span>
        </span>
      </button>

      <div className="h-5 w-px bg-(--border-color)" />

      <button
        onClick={onDislike}
        className="px-3 hover:bg-(--hover-btn-color)"
        aria-label="Dislike"
      >
        <ThumbDownIcon className="h-6 w-6" />
        <span className="sr-only">{numberConvert(dislikeCount)}</span>
      </button>
    </div>
  );
}

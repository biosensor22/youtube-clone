import { timeAgo, numberConvert } from "@/shared/lib/hooks";

type WatchDescriptionProps = {
  views: number;
  publishedAt: string;
  description: string;
  hashtags: string[];
};

export function Description({
  views,
  publishedAt,
  description,
  hashtags,
}: WatchDescriptionProps) {
  return (
    <div className="mt-3 rounded-xl bg-(--btn-bg-color) px-3.5 py-3 text-sm">
      <div className="text-[14px] flex gap-2 font-semibold">
        {numberConvert(views)} views
        <p>{timeAgo(publishedAt)}</p>
      </div>

      {hashtags.length ? (
        <p className="mt-1.5 text-[13px] text-(--main-text-color)">
          {hashtags.join(" ")}
        </p>
      ) : null}

      <p className="mt-2 text-[14px] leading-6 text-(--main-text-color)">
        {description}
      </p>
    </div>
  );
}

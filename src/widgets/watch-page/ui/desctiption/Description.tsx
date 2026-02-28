import { timeAgo, numberConvert } from "@/shared/lib/hooks";

type WatchDescriptionProps = {
  views: number;
  publishedAt: string;
  description: string;
};

export function Description({
  views,
  publishedAt,
  description,
}: WatchDescriptionProps) {
  return (
    <div className="mt-3 bg- rounded-xl bg-(--btn-bg-color) px-4 py-3 text-sm">
      <p className="font-medium">
        {numberConvert(views)} views • {timeAgo(publishedAt)}
      </p>

      <p className="mt-2 leading-6 text-(--grey-text-color)">{description}</p>
    </div>
  );
}

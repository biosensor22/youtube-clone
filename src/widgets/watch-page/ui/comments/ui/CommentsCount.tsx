import { QueueIcon } from "@/shared/ui";

interface CommentsCountProps {
  commentsLength: number;
}

export function CommentsCount({ commentsLength }: CommentsCountProps) {
  return (
    <div className="flex items-center gap-7">
      <h2 className="text-xl font-semibold">{commentsLength} Comments</h2>
      <button className="inline-flex items-center gap-2 text-sm font-medium hover:text-(--main-text-color)/85">
        <QueueIcon className="h-4.5 w-4.5" />
        Sort by
      </button>
    </div>
  );
}

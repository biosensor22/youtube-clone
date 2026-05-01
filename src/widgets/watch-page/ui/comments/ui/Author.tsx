import { timeAgo } from "@/shared/lib/hooks";

type AuthorProps = {
  author: string;
  isAuthor: boolean;
  publishedAt: string;
};

export function Author({ author, isAuthor, publishedAt }: AuthorProps) {
  return (
    <div className="flex mt-2 items-center gap-x-1 text-[13px] font-semibold">
      <span>{author}</span>
      {isAuthor ? (
        <span className="rounded-md bg-white text-[11px] font-semibold text-black">
          Author
        </span>
      ) : null}
      <span className="text-xs font-normal text-(--grey-text-color)">
        {timeAgo(publishedAt)}
      </span>
    </div>
  );
}

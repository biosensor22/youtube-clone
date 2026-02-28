import { timeAgo } from "@/shared/lib/hooks";

type AuthorProps = {
  author: string;
  isAuthor: boolean;
  publishedAt: string;
};

export function Author({ author, isAuthor, publishedAt }: AuthorProps) {
  return (
    <p className="flex items-center gap-1 text-[13px] font-semibold ">
      <span>{author}</span>
      {isAuthor ? (
        <span className="rounded-md bg-white px-1.5 text-[11px] font-semibold text-black">
          Author
        </span>
      ) : null}
      <span className="text-xs font-normal text-(--grey-text-color)">
        {timeAgo(publishedAt)}
      </span>
    </p>
  );
}

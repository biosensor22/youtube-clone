import Image from "next/image";

type SearchResultAuthorProps = {
  author: string;
  src?: string;
};

function ResultAuthorAvatar({ author, src }: SearchResultAuthorProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={author}
        width={28}
        height={28}
        className="h-6 w-6 rounded-full object-cover"
      />
    );
  }
}

export function SearchResultAuthor({ author, src }: SearchResultAuthorProps) {
  return (
    <div className="mt-3 flex items-center gap-2.5 text-[12px] text-(--grey-text-color)">
      <ResultAuthorAvatar author={author} src={src} />
      <span className="truncate">{author}</span>
    </div>
  );
}

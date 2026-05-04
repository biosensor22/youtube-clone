import Image from "next/image";

interface AvatarProps {
  authorAvatar: string;
  author: string;
}

export function Avatar({ authorAvatar, author }: AvatarProps) {
  return (
    <Image
      className="rounded-full w-9 h-9"
      width={40}
      height={40}
      src={authorAvatar}
      alt={author}
      priority
    />
  );
}

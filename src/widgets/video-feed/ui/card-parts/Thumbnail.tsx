import Image from "next/image";

interface ThumbnailProps {
  thumbnail: string;
  title: string;
  priority: boolean;
}

export function Thumbnail({ thumbnail, title, priority }: ThumbnailProps) {
  return (
    <Image
      className="rounded-xl"
      width={1200}
      height={400}
      src={thumbnail}
      alt={title}
      priority={priority}
    />
  );
}

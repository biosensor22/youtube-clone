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
      placeholder="blur"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMSIgaGVpZ2h0PSIxIiBmaWxsPSIjMDAwMDAwIi8+"
      priority={priority}
    />
  );
}

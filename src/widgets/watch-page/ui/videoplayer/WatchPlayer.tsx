import Image from "next/image";
import { extractYouTubeId } from "../../model/useVideoId";

type WatchPlayerProps = {
  title: string;
  thumbnail: string;
};

export function WatchPlayer({ title, thumbnail }: WatchPlayerProps) {
  const youtubeId = extractYouTubeId(thumbnail);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">
      {youtubeId ? (
        <iframe
          src={`https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1`}
          title={title}
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      ) : (
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 75vw"
          priority
        />
      )}
    </div>
  );
}

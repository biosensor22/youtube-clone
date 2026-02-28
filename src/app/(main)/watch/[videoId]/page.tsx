"use client";

import { useParams } from "next/navigation";
import { useWatchPageData } from "@/entities/watch";
import { useRouter } from "next/navigation";
import { WatchPage } from "@/widgets/watch-page";
import { Recommendations } from "@/widgets/watch-page";

export default function Page() {
  const router = useRouter();
  const params = useParams<{ videoId: string }>();
  const videoId = params.videoId;

  const { currentVideo, channel, comments, recommendations, isLoading, error } =
    useWatchPageData(videoId);

  if (isLoading) {
    return (
      <div className="mt-18 px-3 py-6 text-white">Loading watch page...</div>
    );
  }

  if (error) {
    return (
      <div className="mt-18 px-3 py-6 text-white">
        Failed to load watch page data.
      </div>
    );
  }

  if (!currentVideo) {
    router.push("/");
    return;
  }

  return (
    <div className="mt-18 pb-6 duration-200 text-white">
      <div className="mx-auto grid max-w-420 grid-cols-1 gap-4 px-2 sm:px-3 lg:grid-cols-[minmax(0,1fr)_360px] lg:px-4">
        <WatchPage
          currentVideo={currentVideo}
          channel={channel}
          comments={comments}
        />
        <Recommendations recommendations={recommendations} />
      </div>
    </div>
  );
}

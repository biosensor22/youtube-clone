"use client";

import { useParams } from "next/navigation";
import { useWatchPageData } from "@/entities/watch";
import { WatchPage } from "@/widgets/watch-page";
import { Recommendations } from "@/widgets/watch-page";

export default function Page() {
  const params = useParams<{ videoId: string }>();
  const videoId = params.videoId;

  const { currentItem, channel, comments, recommendations, isLoading, error } =
    useWatchPageData(videoId);

  if (isLoading) {
    return (
      <div className="mt-18 px-3 py-6 text-(--main-text-color)">
        Loading watch page...
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-18 px-3 py-6 text-(--main-text-color)">
        Failed to load watch page data.
      </div>
    );
  }

  if (!currentItem) {
    return null;
  }

  return (
    <div className="mt-18 pb-8 text-(--main-text-color) [&_button]:cursor-pointer">
      <div className="mx-auto grid max-w-450 grid-cols-1 gap-6 px-2 sm:px-3 lg:px-4 xl:grid-cols-[minmax(0,1fr)_402px]">
        <WatchPage
          currentItem={currentItem}
          channel={channel}
          comments={comments}
        />
        <Recommendations recommendations={recommendations} />
      </div>
    </div>
  );
}

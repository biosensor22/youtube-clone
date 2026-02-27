"use client";

import { useParams } from "next/navigation";
import { WatchPage } from "@/widgets/watch-page";

export default function WatchVideoPage() {
  const params = useParams<{ videoId: string }>();
  const dynamicVideoId = Array.isArray(params.videoId)
    ? params.videoId[0]
    : params.videoId;
  const resolvedVideoId = dynamicVideoId ?? "video1";

  return <WatchPage key={resolvedVideoId} videoId={resolvedVideoId} />;
}

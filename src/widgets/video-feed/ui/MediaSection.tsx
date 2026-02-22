"use client";

import { useUserVideos } from "@/entities/video-cards/model/useUserVideos";
import { VideoCard } from "./video/VideoCard";
import { PlaylistCard } from "./playlist/PlaylistCard";
import { StreamCard } from "./stream/StreamCard";

import { SkeletonCard } from "./skeleton/SkeletonCard";

export function MediaSection() {
  const userId = "123";
  const skeletonArr = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const { videos, isLoading, empty, error } = useUserVideos(userId);

  if (isLoading || empty) {
    return (
      <div
        className="w-full text-white px-2 pt-6
    grid grid-cols-1 @video-md:grid-cols-2 @video-lg:grid-cols-3 @video-xl:grid-cols-4"
      >
        {skeletonArr.map((item) => (
          <SkeletonCard key={item} />
        ))}
      </div>
    );
  }

  return (
    <div
      className="w-full text-white px-4 pt-6 sm:pt-6 gap-4 gap-y-8
    grid grid-cols-1 @video-md:grid-cols-2 @video-lg:grid-cols-3 @video-xl:grid-cols-4"
    >
      {videos.map((v) => {
        switch (v.type) {
          case "video":
            return <VideoCard key={v.id} {...v} />;

          case "playlist":
            return <PlaylistCard key={v.id} {...v} />;

          case "stream":
            return <StreamCard key={v.id} {...v} />;
          default:
            return null;
        }
      })}
    </div>
  );
}

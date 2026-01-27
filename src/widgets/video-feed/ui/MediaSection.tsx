"use client";

import { useUserVideos } from "@/entities/video-cards/model/useUserVideos";
import { VideoCard } from "./video/VideoCard";
import { PlaylistCard } from "./playlist/PlaylistCard";
import { StreamCard } from "./stream/StreamCard";

import { SkeletonCard } from "./skeleton/SkeletonCard";

export function MediaSection() {
  const userId = "123";
  const { videos, isLoading, empty, error } = useUserVideos(userId);

  if (isLoading) {
    return (
      <div
        className="w-full text-white px-2 pt-6
    grid grid-cols-1 @video-md:grid-cols-2 @video-lg:grid-cols-3 @video-xl:grid-cols-4"
      >
        {videos.map(() => (
          <SkeletonCard />
        ))}
      </div>
    );
  }

  return (
    <div
      className="w-full text-white px-2 pt-6
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

"use client";

import { useState } from "react";

type VideoReaction = "like" | "dislike" | null;

export function useWatchVideoReactions(views?: number) {
  const [videoReaction, setVideoReaction] = useState<VideoReaction>(null);
  const [likeRollKey, setLikeRollKey] = useState(0);

  const likeCount = views ? Math.max(1, Math.floor(views * 0.04)) : 0;
  const dislikeCount = views ? Math.max(1, Math.floor(views * 0.002)) : 0;
  const displayedLikeCount = likeCount + (videoReaction === "like" ? 1 : 0);
  const displayedDislikeCount = dislikeCount + (videoReaction === "dislike" ? 1 : 0);

  const handleLike = () => {
    setLikeRollKey((prev) => prev + 1);
    setVideoReaction((prev) => (prev === "like" ? null : "like"));
  };

  const handleDislike = () => {
    setVideoReaction((prev) => (prev === "dislike" ? null : "dislike"));
  };

  return {
    videoReaction,
    likeRollKey,
    displayedLikeCount,
    displayedDislikeCount,
    handleLike,
    handleDislike,
  };
}

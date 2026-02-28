"use client";

import { useMemo, useState } from "react";
import type { WatchComment } from "@/entities/watch";

export function useWatchComments(
  comments: WatchComment[],
  currentVideoId?: string,
) {
  const [newCommentText, setNewCommentText] = useState("");
  const [localComments, setLocalComments] = useState<WatchComment[]>([]);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});

  const commentsList = useMemo(
    () => [...localComments, ...comments],
    [localComments, comments],
  );

  const handleCreateComment = () => {
    const text = newCommentText.trim();
    if (!text || !currentVideoId) return;

    const comment: WatchComment = {
      id: `local-${Date.now()}`,
      videoId: currentVideoId,
      channelId: "local-user",
      author: "You",
      authorAvatar: "https://i.pravatar.cc/96?u=local-user",
      text,
      likes: 0,
      publishedAt: new Date().toISOString(),
      replies: [],
    };

    setLocalComments((prev) => [comment, ...prev]);
    setNewCommentText("");
  };

  const handleToggleCommentLike = (commentId: string) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }));
  };

  return {
    newCommentText,
    setNewCommentText,
    commentsList,
    likedComments,
    handleCreateComment,
    handleToggleCommentLike,
  };
}

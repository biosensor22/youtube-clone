import type { ReactNode } from "react";

export type VideoReaction = "like" | "dislike" | null;

export type WatchActionRowProps = {
  channelAvatar: string;
  channelName: string;
  subscribers: number;
  verified: boolean;
  isSubscribed: boolean;
  onToggleSubscribe: () => void;
  videoReaction: VideoReaction;
  displayedLikeCount: number;
  dislikeCount: number;
  likeRollKey: number;
  onLike: () => void;
  onDislike: () => void;
};

export type ActionMenuItem = {
  id: string;
  label: string;
  icon: ReactNode;
};

export type SecondaryActionItem = {
  id: string;
  label: string;
  icon: ReactNode;
};

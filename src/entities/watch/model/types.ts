import type { FeedItem, VideoItem } from "@/entities/video-cards";

export type WatchMediaItem = FeedItem;

export type WatchChannel = {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  subscribers: number;
  verified: boolean;
  description: string;
};

export type WatchComment = {
  id: string;
  videoId: string;
  channelId: string;
  author: string;
  authorAvatar: string;
  text: string;
  likes: number;
  publishedAt: string;
  replies?: WatchReply[];
};

export type WatchReply = {
  id: string;
  author: string;
  authorAvatar: string;
  text: string;
  likes: number;
  publishedAt: string;
};

export type WatchPageData = {
  currentItem: WatchMediaItem | null;
  channel: WatchChannel | null;
  comments: WatchComment[];
  recommendations: VideoItem[];
};

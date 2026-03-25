export type FeedItemBase = {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
  authorAvatar?: string;
  videosCount?: number;
};

export type VideoItem = FeedItemBase & {
  type: "video";
  duration: string;
  views: number;
  authorAvatar: string;
  publishedAt: string;
  hashtags?: string[];
};

export type PlaylistItem = FeedItemBase & {
  type: "playlist";
  videosCount: number;
  publishedAt: string;
  updatedAt: string;
};

export type StreamItem = FeedItemBase & {
  type: "stream";
  viewers: number;
  startedAt: string;
  authorAvatar: string;
  isLive: boolean;
};

export type FeedItem = VideoItem | PlaylistItem | StreamItem;

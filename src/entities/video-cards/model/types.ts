export type FeedItemBase = {
  id: string;
  title: string;
  thumbnail: string;
  author: string;
};

type VideoItem = FeedItemBase & {
  type: "video";
  duration: string;
  views: number;
  authorAvatar: string;
  publishedAt: string;
};

type PlaylistItem = FeedItemBase & {
  type: "playlist";
  videosCount: number;
};

type StreamItem = FeedItemBase & {
  type: "stream";
  viewers: number;
  startedAt: string;
  authorAvatar: string;
  isLive: boolean;
};

export type FeedItem = VideoItem | PlaylistItem | StreamItem;

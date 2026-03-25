import type { FeedItem } from "@/entities/video-cards";
import type { WatchChannel } from "@/entities/watch";
import { numberConvert, timeAgo } from "@/shared/lib/hooks";
import { buildHashtags } from "./buildHashtags";

function buildFallbackAvatar(author: string) {
  return `https://i.pravatar.cc/96?u=${encodeURIComponent(author || "channel")}`;
}

export function useWatchChannelMeta(
  channel: WatchChannel | null,
  currentItem: FeedItem | null,
) {
  const authorAvatar =
    currentItem && "authorAvatar" in currentItem
      ? currentItem.authorAvatar
      : undefined;
  const channelAvatar =
    channel?.avatar ||
    authorAvatar ||
    buildFallbackAvatar(currentItem?.author || "channel");
  const channelName = channel?.name || currentItem?.author || "Unknown channel";
  const subscribers = channel?.subscribers || 0;
  if (!currentItem) {
    return {
      channelAvatar,
      channelName,
      subscribers,
      hashtags: [],
      description: "",
      primaryMeta: "",
      secondaryMeta: null,
      reactionBase: 0,
      showComments: false,
    };
  }

  switch (currentItem.type) {
    case "video":
      return {
        channelAvatar,
        channelName,
        subscribers,
        hashtags: currentItem.hashtags ?? buildHashtags(currentItem.title, currentItem.author),
        description:
          channel?.description ||
          `${currentItem.title}. Watch and share your feedback in comments.`,
        primaryMeta: `${numberConvert(currentItem.views)} views`,
        secondaryMeta: timeAgo(currentItem.publishedAt),
        reactionBase: currentItem.views,
        showComments: true,
      };
    case "stream":
      return {
        channelAvatar,
        channelName,
        subscribers,
        hashtags: buildHashtags(currentItem.title, currentItem.author),
        description:
          channel?.description ||
          `${currentItem.title}. Live stream from ${channelName}.`,
        primaryMeta: `${numberConvert(currentItem.viewers)} watching`,
        secondaryMeta: `Started ${timeAgo(currentItem.startedAt)}`,
        reactionBase: currentItem.viewers,
        showComments: false,
      };
    case "playlist":
      return {
        channelAvatar,
        channelName,
        subscribers,
        hashtags: buildHashtags(currentItem.title, currentItem.author),
        description:
          channel?.description ||
          `Playlist from ${channelName} with ${currentItem.videosCount} videos.`,
        primaryMeta: `${currentItem.videosCount} videos`,
        secondaryMeta: null,
        reactionBase: Math.max(currentItem.videosCount * 1200, currentItem.videosCount),
        showComments: false,
      };
    default:
      return {
        channelAvatar,
        channelName,
        subscribers,
        hashtags: [],
        description: "",
        primaryMeta: "",
        secondaryMeta: null,
        reactionBase: 0,
        showComments: false,
      };
  }
}

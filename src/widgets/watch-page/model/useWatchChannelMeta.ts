import type { VideoItem } from "@/entities/video-cards";
import type { WatchChannel } from "@/entities/watch";
import { buildHashtags } from "./buildHashtags";

export function useWatchChannelMeta(
  channel: WatchChannel | null,
  currentVideo: VideoItem | null,
) {
  const channelAvatar = channel?.avatar || currentVideo?.authorAvatar || "";
  const channelName =
    channel?.name || currentVideo?.author || "Unknown channel";
  const subscribers = channel?.subscribers || 0;
  const hashtags = currentVideo
    ? buildHashtags(currentVideo.title, channelName)
    : ["#youtube", "#watch"];
  const description =
    channel?.description ||
    (currentVideo
      ? `${currentVideo.title}. Watch and share your feedback in comments.`
      : "");

  return {
    channelAvatar,
    channelName,
    subscribers,
    hashtags,
    description,
  };
}

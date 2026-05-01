import type { WatchPageData } from "../model/types";
import { fetchWatchChannels } from "./fetchWatchChannels";
import { fetchWatchComments } from "./fetchWatchComments";
import { fetchWatchItemById } from "./fetchWatchItemById";
import { fetchWatchVideos } from "./fetchWatchVideos";

export async function fetchWatchPageData(
  videoId: string,
): Promise<WatchPageData> {
  const [currentItem, allVideos] = await Promise.all([
    fetchWatchItemById(videoId),
    fetchWatchVideos(),
  ]);

  if (!currentItem) {
    return {
      currentItem: null,
      channel: null,
      comments: [],
      recommendations: allVideos.slice(0, 10),
    };
  }

  const [channels, comments] = await Promise.all([
    fetchWatchChannels(),
    currentItem.type === "video"
      ? fetchWatchComments(videoId)
      : Promise.resolve([]),
  ]);

  const channel =
    channels.find((item) => item.name === currentItem.author) ?? null;

  return {
    currentItem,
    channel,
    comments,
    recommendations: allVideos.slice(0, 12),
  };
}

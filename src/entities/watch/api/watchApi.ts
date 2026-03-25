import type { FeedItem, VideoItem } from "@/entities/video-cards";
import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";
import type { WatchChannel, WatchComment, WatchPageData } from "../model/types";

type UnknownObject = Record<string, unknown>;

function isFeedItem(item: UnknownObject): item is FeedItem {
  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.thumbnail === "string" &&
    typeof item.author === "string" &&
    (item.type === "video" || item.type === "playlist" || item.type === "stream")
  );
}

function isVideoItem(item: UnknownObject): item is VideoItem {
  return item.type === "video";
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return (await response.json()) as T;
}

async function fetchItemById(videoId: string): Promise<FeedItem | null> {
  try {
    const item = await fetchJson<UnknownObject>(
      `${API_BASE_URL}${API_ROUTES.videos}/${videoId}`,
    );

    return isFeedItem(item) ? item : null;
  } catch {
    return null;
  }
}

async function fetchAllVideos(): Promise<VideoItem[]> {
  try {
    const items = await fetchJson<UnknownObject[]>(
      `${API_BASE_URL}${API_ROUTES.videos}?type=video`,
    );

    return items.filter(isVideoItem) as VideoItem[];
  } catch {
    return [];
  }
}

async function fetchChannels(): Promise<WatchChannel[]> {
  try {
    return await fetchJson<WatchChannel[]>(`${API_BASE_URL}${API_ROUTES.channels}`);
  } catch {
    return [];
  }
}

async function fetchComments(videoId: string): Promise<WatchComment[]> {
  try {
    return await fetchJson<WatchComment[]>(
      `${API_BASE_URL}${API_ROUTES.comments}?videoId=${encodeURIComponent(videoId)}`,
    );
  } catch {
    return [];
  }
}

export async function fetchWatchPageData(videoId: string): Promise<WatchPageData> {
  const [currentItem, allVideos, channels, comments] = await Promise.all([
    fetchItemById(videoId),
    fetchAllVideos(),
    fetchChannels(),
    fetchComments(videoId),
  ]);

  if (!currentItem) {
    return {
      currentItem: null,
      channel: null,
      comments: [],
      recommendations: allVideos.slice(0, 10),
      previousVideoId: allVideos[0]?.id ?? null,
      nextVideoId: allVideos[1]?.id ?? null,
    };
  }

  const currentIndex = allVideos.findIndex((video) => video.id === currentItem.id);
  const hasVideos = allVideos.length > 0;
  const previousVideoId =
    hasVideos && currentIndex !== -1
      ? allVideos[(currentIndex - 1 + allVideos.length) % allVideos.length]?.id ?? null
      : null;
  const nextVideoId =
    hasVideos && currentIndex !== -1
      ? allVideos[(currentIndex + 1) % allVideos.length]?.id ?? null
      : null;

  const sameAuthor = allVideos.filter(
    (video) => video.id !== currentItem.id && video.author === currentItem.author,
  );
  const otherVideos = allVideos.filter(
    (video) => video.id !== currentItem.id && video.author !== currentItem.author,
  );

  const channel = channels.find((item) => item.name === currentItem.author) ?? null;
  const recommendations = [...sameAuthor, ...otherVideos].slice(0, 12);
  const sortedComments =
    currentItem.type === "video"
      ? [...comments].sort(
          (a, b) =>
            new Date(b.publishedAt).getTime() -
            new Date(a.publishedAt).getTime(),
        )
      : [];

  return {
    currentItem,
    channel,
    comments: sortedComments,
    recommendations,
    previousVideoId,
    nextVideoId,
  };
}

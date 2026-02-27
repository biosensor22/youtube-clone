import type { VideoItem } from "@/entities/video-cards";
import { API_BASE_URL, API_ROUTES } from "@/shared/api/config";
import type { WatchChannel, WatchComment, WatchPageData } from "../model/types";

type UnknownObject = Record<string, unknown>;

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

async function fetchVideoById(videoId: string): Promise<VideoItem | null> {
  try {
    const item = await fetchJson<UnknownObject>(
      `${API_BASE_URL}${API_ROUTES.videos}/${videoId}`,
    );

    return isVideoItem(item) ? (item as VideoItem) : null;
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
  const [currentVideo, allVideos, channels, comments] = await Promise.all([
    fetchVideoById(videoId),
    fetchAllVideos(),
    fetchChannels(),
    fetchComments(videoId),
  ]);

  if (!currentVideo) {
    return {
      currentVideo: null,
      channel: null,
      comments: [],
      recommendations: allVideos.slice(0, 10),
      previousVideoId: allVideos[0]?.id ?? null,
      nextVideoId: allVideos[1]?.id ?? null,
    };
  }

  const currentIndex = allVideos.findIndex((video) => video.id === currentVideo.id);
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
    (video) => video.id !== currentVideo.id && video.author === currentVideo.author,
  );
  const otherVideos = allVideos.filter(
    (video) => video.id !== currentVideo.id && video.author !== currentVideo.author,
  );

  const channel = channels.find((item) => item.name === currentVideo.author) ?? null;
  const recommendations = [...sameAuthor, ...otherVideos].slice(0, 12);
  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
  );

  return {
    currentVideo,
    channel,
    comments: sortedComments,
    recommendations,
    previousVideoId,
    nextVideoId,
  };
}

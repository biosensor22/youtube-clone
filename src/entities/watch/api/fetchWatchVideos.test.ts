import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  type Mock,
} from "vitest";
import { fetchWatchVideos, isVideoItem } from "./fetchWatchVideos";
import type { VideoItem } from "@/entities/video-cards";

global.fetch = vi.fn();

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.resetAllMocks();
});

const mockVideoItem: VideoItem[] = [
  {
    id: "id-1",
    title: "title test",
    thumbnail: "/thumbnail",
    author: "test-author",
    type: "video",
    duration: "2:25",
    views: 279,
    authorAvatar: "/authorAvatar",
    publishedAt: "20-05-2025",
    hashtags: ["#video, #testvideo, #test"],
  },
];

describe("fetchWatchVideos", () => {
  it("returns data on success", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => mockVideoItem,
    });

    const result = await fetchWatchVideos();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockVideoItem);
  });

  it("returns empty array if response isn't array", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ test: 123 }),
    });

    const result = await fetchWatchVideos();
    expect(result).toEqual([]);
  });

  it("returns empty arary if response not ok", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const result = await fetchWatchVideos();
    expect(result).toEqual([]);
  });

  it("returns empty array if JSON parsing fails", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: () => {
        throw new Error("Invalid JSON");
      },
    });

    const result = await fetchWatchVideos();
    expect(result).toEqual([]);
  });

  it("returns empty array on fetch error", async () => {
    (fetch as Mock).mockRejectedValue(new Error("Network error"));

    const result = await fetchWatchVideos();
    expect(result).toEqual([]);
  });
});

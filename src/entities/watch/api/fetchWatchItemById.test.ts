import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  type Mock,
} from "vitest";
import { isFeedItem, fetchWatchItemById } from "./fetchWatchItemById";
import type { FeedItem } from "@/entities/video-cards";

global.fetch = vi.fn();

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.resetAllMocks();
});

const mockWatchFeedItem: FeedItem = {
  id: "1",
  type: "video",
  duration: "12:02",
  title: "this is title",
  thumbnail: "/thumbnail",
  author: "author",
  authorAvatar: "/avatar",
  views: 1002,
  publishedAt: "03-02-2024",
};

describe("fetchWatchItemById", () => {
  it("returns false if types data isn't correct", () => {
    expect(isFeedItem({ ...mockWatchFeedItem, id: 123 })).toEqual(false);
  });

  it("returns false if type isn't video or playlist or stream", () => {
    expect(isFeedItem({ ...mockWatchFeedItem, type: "fake type" })).toEqual(
      false,
    );
  });

  it("returns data on success", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => mockWatchFeedItem,
    });

    const result = await fetchWatchItemById("id-1");
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockWatchFeedItem);
  });

  it("returns null is response not ok", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const result = await fetchWatchItemById("id-1");
    expect(result).toEqual(null);
  });

  it("returns null on fetch error", async () => {
    (fetch as Mock).mockRejectedValue(new Error("Network error"));

    const result = await fetchWatchItemById("id-1");
    expect(result).toEqual(null);
  });

  it("returns null if JSON parsing fails", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => {
        throw new Error("Invalid JSON");
      },
    });

    const result = await fetchWatchItemById("id-1");
    expect(result).toEqual(null);
  });

  it("returns null if isFeedItem equal false", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ ...mockWatchFeedItem, type: "fake type" }),
    });

    const result = await fetchWatchItemById("id-1");

    const isFalse = result === null ? false : true;

    expect(isFeedItem({ ...mockWatchFeedItem, type: "fake type" })).toEqual(
      isFalse,
    );
  });
});

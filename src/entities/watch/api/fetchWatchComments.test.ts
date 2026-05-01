import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  type Mock,
} from "vitest";
import { fetchWatchComments } from "./fetchWatchComments";
import type { WatchComment } from "../model/types";

global.fetch = vi.fn();

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.resetAllMocks();
});

const mockWatchComments: WatchComment[] = [
  {
    id: "1",
    videoId: "123",
    channelId: "12",
    author: "author",
    authorAvatar: "/authorAvatar.com",
    text: "text comment",
    likes: 1232,
    publishedAt: "04-01-2022",
    replies: [
      {
        id: "1",
        author: "author",
        authorAvatar: "/authorAvatar.com",
        text: "reply comment",
        likes: 34,
        publishedAt: "01-02-2026",
      },
    ],
  },
];

describe("fetchWatchComments", () => {
  it("returns data on success", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => mockWatchComments,
    });

    const result = await fetchWatchComments("id-1");
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockWatchComments);
  });

  it("returns empty array if response isn't array", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ test: 123 }),
    });

    const result = await fetchWatchComments("id-1");
    expect(result).toEqual([]);
    expect(console.warn).toHaveBeenCalledWith(
      "[Watch API] Unexpected comments data format:",
      { test: 123 },
    );
  });

  it("returns empty array if response isn't ok", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const result = await fetchWatchComments("id-1");
    expect(result).toEqual([]);

    expect(console.error).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining(
          "[Watch API] Failed to fetch comments:",
        ),
      }),
    );
  });

  it("returns empty array if JSON parsing fails", async () => {
    (fetch as Mock).mockRejectedValue({
      ok: true,
      json: () => {
        throw new Error("Invalid JSON");
      },
    });

    const result = await fetchWatchComments("id-1");
    expect(result).toEqual([]);
  });

  it("returns empty array on fetch error", async () => {
    (fetch as Mock).mockRejectedValue(new Error("Network error"));

    const result = await fetchWatchComments("id-1");
    expect(result).toEqual([]);
  });

  it("calls fetch with encoded videoId", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => [],
    });

    await fetchWatchComments("video 1/тест");

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("videoId=video%201%2F%D1%82%D0%B5%D1%81%D1%82"),
    );
  });
});

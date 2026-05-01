import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  type Mock,
} from "vitest";
import { fetchWatchChannels } from "./fetchWatchChannels";

global.fetch = vi.fn();

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.resetAllMocks();
});

const mockChannels = [
  {
    id: "1",
    name: "name",
    handle: "handle",
    avatar: "/avatar",
    subscribers: 123,
    verified: false,
    description: "channel description",
  },
];

describe("fetchWatchChannels", () => {
  it("returns data on success", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => mockChannels,
    });

    const result = await fetchWatchChannels();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockChannels);
  });

  it("returns empty array if response isn't array", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ test: 123 }),
    });

    const result = await fetchWatchChannels();
    expect(result).toEqual([]);

    expect(console.warn).toHaveBeenCalledWith(
      "[Watch API] Unexpected channels data format:",
      { test: 123 },
    );
  });

  it("returns empty array if response not ok", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const result = await fetchWatchChannels();
    expect(result).toEqual([]);

    expect(console.error).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining(
          "[Watch API] Failed to fetch channels:",
        ),
      }),
    );
  });

  it("returns empty array on fetch error", async () => {
    (fetch as Mock).mockRejectedValue(new Error("Network error"));

    const result = await fetchWatchChannels();
    expect(result).toEqual([]);
  });
});

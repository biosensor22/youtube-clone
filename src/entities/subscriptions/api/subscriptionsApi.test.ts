import { describe, it, expect, beforeEach, afterEach, vi, type Mock } from "vitest";
import { getPriority, fetchSubscriptions } from "./subscriptionsApi";
import type { SubscriptionsSideMenu } from "@/entities/subscriptions";

global.fetch = vi.fn();

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

const baseSub: SubscriptionsSideMenu[] = [
  {
    channelId: "1",
    title: "test",
    url: "/test",
    category: "test",
    subscribedAt: "2024-01-01",
    pfp: "test.com",
    live: false,
    newVideoChecked: false,
  },
];

describe("SubscriptionsApi", () => {
  it("getPriority", () => {
    expect(getPriority({ ...baseSub[0], live: true })).toBe(1);
    expect(getPriority({ ...baseSub[0], newVideoChecked: true })).toBe(2);
    expect(
      getPriority({ ...baseSub[0], newVideoChecked: false, live: false }),
    ).toBe(3);
  });

  it("returns data on success", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => baseSub,
    });

    const result = await fetchSubscriptions();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(baseSub);
  });

  it("returns empty array if response isn't array", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ test: 123 }),
    });

    const result = await fetchSubscriptions();
    expect(result).toEqual([]);
    expect(console.warn).toHaveBeenCalledWith(
      "[Subscriptions API] Unexpected data format:",
      { test: 123 },
    );
  });

  it("returns empty array if response not ok", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const result = await fetchSubscriptions();
    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining("[Subscriptions API] Failed:"),
      }),
    );
  });

  it("returns empty array on fetch error", async () => {
    (fetch as Mock).mockRejectedValue(new Error("Network error"));

    const result = await fetchSubscriptions();

    expect(result).toEqual([]);
  });
});

import { getPriority, fetchSubscriptions } from "./subscriptionsApi";
import type { SubscriptionsSideMenu } from "@/entities/subscriptions-side-menu";

const baseSub: SubscriptionsSideMenu = {
  channelId: "1",
  title: "test",
  url: "/test",
  category: "test",
  subscribedAt: "2024-01-01",
  pfp: "test.com",
  live: false,
  newVideoChecked: false,
};

describe("SubscriptionsApi", () => {
  it("getPriority", () => {
    expect(getPriority({ ...baseSub, live: true })).toBe(1);
    expect(getPriority({ ...baseSub, newVideoChecked: true })).toBe(2);
    expect(
      getPriority({ ...baseSub, newVideoChecked: false, live: false }),
    ).toBe(3);
  });

  it("returns data on success", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => baseSub,
    });

    const result = await fetchSubscriptions();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toBe(baseSub);
  });

  it("returns empty array if response isn't array", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ test: 123 }),
    });

    const result = await fetchSubscriptions();
    expect(result).toEqual([]);
  });
});

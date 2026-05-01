import { describe, it, expect, afterEach, vi, type Mock } from "vitest";
import { fetchCountNotif } from "./countNotifApi";
import type { Notifications } from "@/entities/notifications";

global.fetch = vi.fn();

afterEach(() => {
  vi.restoreAllMocks();
});

const mockValue: Notifications[] = [
  {
    id: "1",
    type: "liked",
    checked: true,
    icon: "/icon",
    thumbnail: "/thumbnail",
    date: "22-01-01",
    by: "author",
    message: "message",
  },
];

describe("countNotifApi", () => {
  it("returns count on success", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => mockValue,
    });

    const result = await fetchCountNotif();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockValue.length);
  });

  it("returns 0 if response not ok", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const result = await fetchCountNotif();
    expect(result).toEqual(0);
  });

  it("returns 0 on fetch error", async () => {
    (fetch as Mock).mockRejectedValue(new Error("Network error"));

    const result = await fetchCountNotif();
    expect(result).toEqual(0);
  });
});

import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  type Mock,
} from "vitest";
import { searchHistoryFetch } from "./searchHistoryFetch";

global.fetch = vi.fn();

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("searchHistory", () => {
  it("returns data on success", async () => {
    const mockData = [{ id: "1", text: "some text" }];
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await searchHistoryFetch();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockData);
  });

  it("returns empty array if response isn't ok", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const result = await searchHistoryFetch();
    expect(result).toEqual([]);
  });

  it("returns empty array on fetch error", async () => {
    (fetch as Mock).mockRejectedValue(new Error("Network error"));

    const result = await searchHistoryFetch();
    expect(result).toEqual([]);
  });

  it("returns empty array if data doesn't recieved", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => null,
    });

    const result = await searchHistoryFetch();
    expect(result).toEqual([]);
  });
});

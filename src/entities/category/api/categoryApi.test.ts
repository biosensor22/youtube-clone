import {
  describe,
  it,
  expect,
  beforeEach,
  afterEach,
  vi,
  type Mock,
} from "vitest";
import { fetchCategories } from "./categoryApi";
import type { Category } from "../model";

global.fetch = vi.fn();

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.resetAllMocks();
});

const mockCategory: Category[] = [
  {
    id: "id-1",
    label: "test category",
    type: "global",
  },
];

describe("categoryApi", () => {
  it("returns data on success", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => mockCategory,
    });

    const result = await fetchCategories();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockCategory);
  });

  it("returns empty array if response isn't array", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: async () => ({ test: 123 }),
    });

    const result = await fetchCategories();
    expect(result).toEqual([]);
  });

  it("returns empty array if response not ok", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const result = await fetchCategories();
    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(
      expect.objectContaining({
        message: expect.stringContaining("Fetch failed:"),
      }),
    );
  });

  it("returns empty array on JSON parse error", async () => {
    (fetch as Mock).mockResolvedValue({
      ok: true,
      json: () => {
        throw new Error("Network error");
      },
    });

    const result = await fetchCategories();
    expect(result).toEqual([]);
  });

  it("returns empty arary on fetch error", async () => {
    (fetch as Mock).mockRejectedValue(new Error("Network error"));

    const result = await fetchCategories();
    expect(result).toEqual([]);
    expect(console.error).toHaveBeenCalledWith(expect.any(Error));
  });
});

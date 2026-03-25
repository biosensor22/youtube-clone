import { getUserData } from "./getUserData";

global.fetch = jest.fn();

describe("getUserData", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns data on success", async () => {
    const mockData = [{ id: 1, name: "John" }];

    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockData,
    });

    const result = await getUserData();

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockData);
  });

  it("returns empty array if response not ok", async () => {
    (fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const result = await getUserData();

    expect(result).toEqual([]);
  });

  it("returns empty array on fetch error", async () => {
    (fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const result = await getUserData();

    expect(result).toEqual([]);
  });
});

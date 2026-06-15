import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from "vitest";

import { getApps, getGraph } from "../apps.api";

describe("apps.api", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  describe("getApps", () => {
    it("returns apps on success", async () => {
      const mockApps = [
        {
          id: "test",
          name: "Test",
          description: "desc",
        },
      ];

      vi.spyOn(
        globalThis,
        "fetch",
      ).mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve(mockApps),
      } as Response);

      const result = await getApps();

      expect(result).toEqual(mockApps);
      expect(fetch).toHaveBeenCalledWith(
        "/api/apps",
      );
    });

    it("throws on failure", async () => {
      vi.spyOn(
        globalThis,
        "fetch",
      ).mockResolvedValue({
        ok: false,
        status: 500,
      } as Response);

      await expect(
        getApps(),
      ).rejects.toThrow(
        "Failed to fetch apps",
      );
    });
  });

  describe("getGraph", () => {
    it("returns graph data on success", async () => {
      const mockGraph = {
        appId: "test",
        nodes: [],
        edges: [],
      };

      vi.spyOn(
        globalThis,
        "fetch",
      ).mockResolvedValue({
        ok: true,
        json: () =>
          Promise.resolve(mockGraph),
      } as Response);

      const result =
        await getGraph("test");

      expect(result).toEqual(mockGraph);
      expect(fetch).toHaveBeenCalledWith(
        "/api/apps/test/graph",
      );
    });

    it("throws on failure", async () => {
      vi.spyOn(
        globalThis,
        "fetch",
      ).mockResolvedValue({
        ok: false,
        status: 404,
      } as Response);

      await expect(
        getGraph("bad-id"),
      ).rejects.toThrow(
        "Failed to fetch graph",
      );
    });
  });
});

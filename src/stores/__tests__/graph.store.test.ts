import { describe, it, expect, beforeEach } from "vitest";

import { useGraphStore } from "../graph.store";

import type { AppGraphResponse } from "@/types/graph.types";

const mockGraph: AppGraphResponse = {
  appId: "test-app",
  nodes: [
    {
      id: "n1",
      type: "serviceNode",
      position: { x: 0, y: 0 },
      data: {
        id: "n1",
        name: "Service A",
        status: "healthy",
        kind: "service",
        cpu: 50,
        memory: 60,
        disk: 30,
        region: "us-east-1",
      },
    },
    {
      id: "n2",
      type: "serviceNode",
      position: { x: 100, y: 0 },
      data: {
        id: "n2",
        name: "Database B",
        status: "degraded",
        kind: "database",
        cpu: 80,
        memory: 90,
        disk: 70,
        region: "us-east-1",
      },
    },
  ],
  edges: [
    { id: "e1", source: "n1", target: "n2" },
  ],
};

function getDraft(appId: string) {
  const draft =
    useGraphStore.getState().drafts[appId];

  if (!draft) {
    throw new Error(
      `Draft not found for ${appId}`,
    );
  }

  return draft;
}

describe("useGraphStore", () => {
  beforeEach(() => {
    useGraphStore.setState({ drafts: {} });
  });

  it("hydrates a graph into drafts", () => {
    useGraphStore
      .getState()
      .hydrateGraph(mockGraph);

    const draft = getDraft("test-app");

    expect(draft.nodes).toHaveLength(2);
    expect(draft.edges).toHaveLength(1);
  });

  it("does not overwrite an existing draft on re-hydration", () => {
    const store = useGraphStore.getState();

    store.hydrateGraph(mockGraph);
    store.updateNodeData(
      "test-app",
      "n1",
      { name: "Modified" },
    );
    store.hydrateGraph(mockGraph);

    const draft = getDraft("test-app");

    expect(
      draft.nodes.find(
        (n) => n.id === "n1",
      )?.data.name,
    ).toBe("Modified");
  });

  it("deletes a node and its connected edges", () => {
    useGraphStore
      .getState()
      .hydrateGraph(mockGraph);

    useGraphStore
      .getState()
      .deleteNode("test-app", "n1");

    const draft = getDraft("test-app");

    expect(draft.nodes).toHaveLength(1);
    expect(draft.nodes[0]!.id).toBe("n2");
    expect(draft.edges).toHaveLength(0);
  });

  it("updates node data partially", () => {
    useGraphStore
      .getState()
      .hydrateGraph(mockGraph);

    useGraphStore
      .getState()
      .updateNodeData(
        "test-app",
        "n1",
        { cpu: 99, name: "Renamed" },
      );

    const node = getDraft(
      "test-app",
    ).nodes.find((n) => n.id === "n1");

    expect(node?.data.cpu).toBe(99);
    expect(node?.data.name).toBe("Renamed");
    expect(node?.data.memory).toBe(60);
  });

  it("updates nodes for an app", () => {
    useGraphStore
      .getState()
      .hydrateGraph(mockGraph);

    const firstNode = mockGraph.nodes[0]!;

    useGraphStore
      .getState()
      .updateNodes("test-app", [
        firstNode,
      ]);

    const draft = getDraft("test-app");

    expect(draft.nodes).toHaveLength(1);
    expect(draft.edges).toHaveLength(1);
  });

  it("is a no-op when deleting from a non-existent app", () => {
    useGraphStore
      .getState()
      .hydrateGraph(mockGraph);

    useGraphStore
      .getState()
      .deleteNode("non-existent", "n1");

    const draft = getDraft("test-app");

    expect(draft.nodes).toHaveLength(2);
  });
});

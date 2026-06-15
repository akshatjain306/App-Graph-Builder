import { create } from "zustand";

import type {
  AppId,
  NodeId,
} from "@/types/common.types";

import type {
  AppGraphResponse,
  ServiceGraphEdge,
  ServiceGraphNode,
} from "@/types/graph.types";


interface GraphDraft {
  nodes: ServiceGraphNode[];

  edges: ServiceGraphEdge[];
}

interface GraphState {
  drafts: Record<AppId, GraphDraft>;

  hydrateGraph: (
    graph: AppGraphResponse,
  ) => void;

  updateNodes: (
    appId: AppId,
    nodes: ServiceGraphNode[],
  ) => void;

  updateEdges: (
    appId: AppId,
    edges: ServiceGraphEdge[],
  ) => void;

  deleteNode: (
    appId: AppId,
    nodeId: NodeId,
  ) => void;

  updateNodeData: (
    appId: AppId,
    nodeId: NodeId,
    updates: Partial<ServiceGraphNode["data"]>,
  ) => void;
}

export const useGraphStore =
  create<GraphState>((set) => ({
    drafts: {},

    hydrateGraph: (graph) =>
      set((state) => {
        if (state.drafts[graph.appId]) {
          return state;
        }

        return {
          drafts: {
            ...state.drafts,

            [graph.appId]: {
              nodes: graph.nodes,

              edges: graph.edges,
            },
          },
        };
      }),

    updateNodes: (
      appId,
      nodes,
    ) =>
      set((state) => {
        const draft =
          state.drafts[appId];

        if (!draft) {
          return state;
        }

        return {
          drafts: {
            ...state.drafts,

            [appId]: {
              nodes,

              edges: draft.edges,
            },
          },
        };
      }),

    updateEdges: (
      appId,
      edges,
    ) =>
      set((state) => {
        const draft =
          state.drafts[appId];

        if (!draft) {
          return state;
        }

        return {
          drafts: {
            ...state.drafts,

            [appId]: {
              nodes: draft.nodes,

              edges,
            },
          },
        };
      }),

    deleteNode: (
      appId,
      nodeId,
    ) =>
      set((state) => {
        const draft =
          state.drafts[appId];

        if (!draft) {
          return state;
        }

        return {
          drafts: {
            ...state.drafts,

            [appId]: {
              nodes: draft.nodes.filter(
                (node) =>
                  node.id !== nodeId,
              ),

              edges: draft.edges.filter(
                (edge) =>
                  edge.source !== nodeId &&
                  edge.target !== nodeId,
              ),
            },
          },
        };
      }),

    updateNodeData: (
      appId,
      nodeId,
      updates,
    ) =>
      set((state) => {
        const draft =
          state.drafts[appId];

        if (!draft) {
          return state;
        }

        return {
          drafts: {
            ...state.drafts,

            [appId]: {
              ...draft,

              nodes: draft.nodes.map(
                (node) =>
                  node.id === nodeId
                    ? {
                        ...node,

                        data: {
                          ...node.data,

                          ...updates,
                        },
                      }
                    : node,
              ),
            },
          },
        };
      }),
  }));
import {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { useGraphQuery } from "@/features/apps/hooks/useGraphQuery";
import { useGraphHydration } from "@/features/graph/hooks/useGraphHydration";

import { useGraphStore } from "@/stores/graph.store";
import { useUiStore } from "@/stores/ui.store";

import { nodeTypes } from "../graph.constants";
import { useDeleteSelectedNode } from "../hooks/useDeleteSelectedNode";

export function GraphCanvas() {
  const selectedAppId = useUiStore(
    (state) => state.selectedAppId,
  );

  const setSelectedNode = useUiStore(
    (state) => state.setSelectedNode,
  );

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGraphQuery(selectedAppId);

  useGraphHydration(data);
  useDeleteSelectedNode();

  const draft = useGraphStore((state) =>
    selectedAppId
      ? state.drafts[selectedAppId]
      : undefined,
  );

  if (!selectedAppId) {
    return (
      <div className="flex h-full items-center justify-center text-zinc-400">
        Select an application
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4">
        <p className="text-red-400">
          Failed to load graph
        </p>

        <button
          onClick={() => {
            void refetch();
          }}
          className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading || !draft) {
    return (
      <div className="flex h-full items-center justify-center text-zinc-400">
        Loading graph...
      </div>
    );
  }

  return (
    <div className="h-full w-full">
      <ReactFlow
        fitView
        nodes={draft.nodes}
        edges={draft.edges}
        nodeTypes={nodeTypes}
        onNodeClick={(_, node) => {
          setSelectedNode(node.id);
        }}
      >
        <MiniMap zoomable pannable />

        <Controls />

        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
        />
      </ReactFlow>
    </div>
  );
}
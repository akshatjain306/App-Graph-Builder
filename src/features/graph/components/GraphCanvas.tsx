import {
  applyEdgeChanges,
  applyNodeChanges,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  ReactFlow,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { GitBranch } from "lucide-react";

import { useGraphQuery } from "@/features/apps/hooks/useGraphQuery";
import { useGraphHydration } from "@/features/graph/hooks/useGraphHydration";

import { useGraphStore } from "@/stores/graph.store";
import { useUiStore } from "@/stores/ui.store";

import { nodeTypes } from "../graph.constants";
import { useDeleteSelectedNode } from "../hooks/useDeleteSelectedNode";
import { useFitGraph } from "../hooks/useFitGraph";
import { GraphError } from "./GraphError";
import { GraphLoading } from "./GraphLoading";

const defaultEdgeOptions = {
  type: "smoothstep" as const,
  animated: true,
  style: {
    stroke: "#525252",
    strokeWidth: 1.5,
  },
};

export function GraphCanvas() {
  const selectedAppId = useUiStore(
    (state) => state.selectedAppId,
  );

  const setSelectedNode = useUiStore(
    (state) => state.setSelectedNode,
  );

  const theme = useUiStore(
    (state) => state.theme,
  );

  const updateNodes = useGraphStore(
    (state) => state.updateNodes,
  );

  const updateEdges = useGraphStore(
    (state) => state.updateEdges,
  );

  const {
    data,
    isLoading,
    isError,
    refetch,
  } = useGraphQuery(selectedAppId);

  useGraphHydration(data);
  useDeleteSelectedNode();
  useFitGraph();

  const draft = useGraphStore((state) =>
    selectedAppId
      ? state.drafts[selectedAppId]
      : undefined,
  );

  if (!selectedAppId) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3">
        <div className="rounded-2xl bg-scard p-5">
          <GitBranch
            size={40}
            className="text-faint"
          />
        </div>

        <p className="text-sm text-faint">
          Select an application to view its
          service graph
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <GraphError
        onRetry={() => {
          void refetch();
        }}
      />
    );
  }

  if (isLoading || !draft) {
    return <GraphLoading />;
  }

  return (
    <div className="h-full w-full">
      <ReactFlow
        fitView
        colorMode={theme}
        nodes={draft.nodes}
        edges={draft.edges}
        nodeTypes={nodeTypes}
        defaultEdgeOptions={
          defaultEdgeOptions
        }
        onNodesChange={(changes) => {
          updateNodes(
            selectedAppId,
            applyNodeChanges(
              changes,
              draft.nodes,
            ),
          );
        }}
        onEdgesChange={(changes) => {
          updateEdges(
            selectedAppId,
            applyEdgeChanges(
              changes,
              draft.edges,
            ),
          );
        }}
        onNodeClick={(_, node) => {
          setSelectedNode(node.id);
        }}
        onPaneClick={() => {
          setSelectedNode(null);
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
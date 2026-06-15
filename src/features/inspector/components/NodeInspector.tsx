import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { useGraphStore } from "@/stores/graph.store";
import { useUiStore } from "@/stores/ui.store";

export function NodeInspector() {
  const selectedAppId = useUiStore(
    (state) => state.selectedAppId,
  );

  const selectedNodeId = useUiStore(
    (state) => state.selectedNodeId,
  );

  const updateNodeData =
    useGraphStore(
      (state) => state.updateNodeData,
    );

  const draft = useGraphStore((state) =>
    selectedAppId
      ? state.drafts[selectedAppId]
      : undefined,
  );

  const node = draft?.nodes.find(
    (n) => n.id === selectedNodeId,
  );

  if (
    !node ||
    !selectedAppId
  ) {
    return (
      <div className="p-4 text-sm text-zinc-400">
        Select a node to inspect.
      </div>
    );
  }

  return (
    <div className="space-y-4 p-4">
      <div>
        <h3 className="text-lg font-semibold text-white">
          Service Node
        </h3>

        <p className="text-sm text-zinc-400">
          {node.data.name}
        </p>
      </div>

      <div>
        <span
          className={`rounded-full px-3 py-1 text-xs ${
            node.data.status === "healthy"
              ? "bg-green-500/20 text-green-400"
              : node.data.status === "degraded"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
          }`}
        >
          {node.data.status}
        </span>
      </div>

      <Tabs
        defaultValue="config"
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="config">
            Config
          </TabsTrigger>

          <TabsTrigger value="runtime">
            Runtime
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="config"
          className="space-y-4"
        >
          <div>
            <label className="mb-1 block text-sm text-zinc-400">
              Node Name
            </label>

            <input
              value={node.data.name}
              onChange={(e) =>
                updateNodeData(
                  selectedAppId,
                  node.id,
                  {
                    name: e.target.value,
                  },
                )
              }
              className="w-full rounded border border-zinc-700 bg-zinc-900 p-2 text-white"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm text-zinc-400">
              CPU Capacity
            </label>

            <input
              type="range"
              min="0"
              max="100"
              value={node.data.cpu}
              onChange={(e) =>
                updateNodeData(
                  selectedAppId,
                  node.id,
                  {
                    cpu: Number(
                      e.target.value,
                    ),
                  },
                )
              }
              className="w-full"
            />

            <input
              type="number"
              min="0"
              max="100"
              value={node.data.cpu}
              onChange={(e) =>
                updateNodeData(
                  selectedAppId,
                  node.id,
                  {
                    cpu: Number(
                      e.target.value,
                    ),
                  },
                )
              }
              className="mt-2 w-full rounded border border-zinc-700 bg-zinc-900 p-2 text-white"
            />
          </div>
        </TabsContent>

        <TabsContent
          value="runtime"
          className="space-y-3"
        >
          <div className="rounded border border-zinc-800 p-3">
            <p className="text-zinc-400">
              CPU
            </p>

            <p className="text-white">
              {node.data.cpu}%
            </p>
          </div>

          <div className="rounded border border-zinc-800 p-3">
            <p className="text-zinc-400">
              Memory
            </p>

            <p className="text-white">
              {node.data.memory}%
            </p>
          </div>

          <div className="rounded border border-zinc-800 p-3">
            <p className="text-zinc-400">
              Region
            </p>

            <p className="text-white">
              {node.data.region}
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
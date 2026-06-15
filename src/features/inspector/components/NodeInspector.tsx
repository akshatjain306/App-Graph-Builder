import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import { useGraphStore } from "@/stores/graph.store";
import { useUiStore } from "@/stores/ui.store";

import { ConfigTab } from "./ConfigTab";
import { InspectorHeader } from "./InspectorHeader";
import { RuntimeTab } from "./RuntimeTab";

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
      <InspectorHeader
        name={node.data.name}
        status={node.data.status}
      />

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

        <TabsContent value="config">
          <ConfigTab
            name={node.data.name}
            cpu={node.data.cpu}
            onNameChange={(name) =>
              updateNodeData(
                selectedAppId,
                node.id,
                { name },
              )
            }
            onCpuChange={(cpu) =>
              updateNodeData(
                selectedAppId,
                node.id,
                { cpu },
              )
            }
          />
        </TabsContent>

        <TabsContent value="runtime">
          <RuntimeTab
            cpu={node.data.cpu}
            memory={node.data.memory}
            disk={node.data.disk}
            region={node.data.region}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
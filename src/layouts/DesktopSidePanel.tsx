import { AppList } from "@/features/apps/components/AppList";
import { NodeInspector } from "@/features/inspector/components/NodeInspector";

export function DesktopSidePanel() {
  return (
    <aside className="flex h-full w-80 flex-col border-l border-zinc-800 bg-zinc-950">
      <div className="border-b border-zinc-800 p-4">
        <h2 className="font-semibold text-white">
          Applications
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AppList />
      </div>

      <div className="border-t border-zinc-800">
        <div className="border-b border-zinc-800 p-4">
          <h3 className="font-medium text-white">
            Inspector
          </h3>
        </div>

        <div className="overflow-y-auto p-2">
          <NodeInspector />
        </div>
      </div>
    </aside>
  );
}
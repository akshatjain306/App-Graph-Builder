import { AppList } from "@/features/apps/components/AppList";
import { NodeInspector } from "@/features/inspector/components/NodeInspector";

export function DesktopSidePanel() {
  return (
    <aside
      aria-label="Applications and Inspector"
      className="flex h-full w-80 flex-col border-l border-edge bg-panel"
    >
      <div className="border-b border-edge p-4">
        <h2 className="font-semibold text-fg">
          Applications
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto">
        <AppList />
      </div>

      <div className="border-t border-edge">
        <div className="border-b border-edge p-4">
          <h3 className="font-medium text-fg">
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
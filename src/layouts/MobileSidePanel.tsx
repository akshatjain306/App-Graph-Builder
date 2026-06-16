import { X } from "lucide-react";

import { AppList } from "@/features/apps/components/AppList";
import { NodeInspector } from "@/features/inspector/components/NodeInspector";

import { useUiStore } from "@/stores/ui.store";

export function MobileSidePanel() {
  const isOpen = useUiStore(
    (state) => state.isMobilePanelOpen,
  );

  const setOpen = useUiStore(
    (state) => state.setMobilePanelOpen,
  );

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/60 md:hidden"
        onClick={() => setOpen(false)}
        aria-hidden="true"
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Applications and Inspector"
        className="fixed right-0 top-0 z-50 flex h-screen w-full max-w-80 flex-col border-l border-edge bg-panel md:hidden"
      >
        <div className="flex items-center justify-between border-b border-edge p-4">
          <h2 className="font-semibold text-fg">
            Applications
          </h2>

          <button
            onClick={() => setOpen(false)}
            aria-label="Close panel"
            className="text-dim"
          >
            <X size={18} />
          </button>
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
    </>
  );
}
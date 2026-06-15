import {
  Maximize2,
  Menu,
  Moon,
  Share2,
} from "lucide-react";

import { useGraphControlsStore } from "@/stores/graph-controls.store";
import { useUiStore } from "@/stores/ui.store";

export function TopBar() {
  const triggerFitView =
    useGraphControlsStore(
      (state) => state.triggerFitView,
    );

  const setMobilePanelOpen =
    useUiStore(
      (state) => state.setMobilePanelOpen,
    );

  return (
    <header className="flex h-14 items-center justify-between border-b border-zinc-800 bg-black px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() =>
            setMobilePanelOpen(true)
          }
          className="rounded-lg border border-zinc-700 p-2 text-zinc-300 md:hidden"
        >
          <Menu size={16} />
        </button>

        <div className="h-8 w-8 rounded bg-white" />

        <h1 className="text-sm font-semibold text-white">
          App Graph Builder
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button className="rounded-lg border border-zinc-700 p-2 text-zinc-300 hover:bg-zinc-900">
          <Share2 size={16} />
        </button>

        <button className="rounded-lg border border-zinc-700 p-2 text-zinc-300 hover:bg-zinc-900">
          <Moon size={16} />
        </button>

        <button
          onClick={triggerFitView}
          className="rounded-lg border border-zinc-700 p-2 text-zinc-300 hover:bg-zinc-900"
        >
          <Maximize2 size={16} />
        </button>
      </div>
    </header>
  );
}
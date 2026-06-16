import {
  Maximize2,
  Menu,
  Moon,
  Share2,
  Sun,
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

  const theme = useUiStore(
    (state) => state.theme,
  );

  const toggleTheme = useUiStore(
    (state) => state.toggleTheme,
  );

  return (
    <header className="flex h-14 items-center justify-between border-b border-edge bg-app px-4">
      <div className="flex items-center gap-3">
        <button
          onClick={() =>
            setMobilePanelOpen(true)
          }
          aria-label="Open navigation panel"
          className="rounded-lg border border-edge p-2 text-dim md:hidden"
        >
          <Menu size={16} />
        </button>

        <div className="h-8 w-8 rounded bg-primary" />

        <h1 className="text-sm font-semibold text-fg">
          App Graph Builder
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          aria-label="Share"
          className="rounded-lg border border-edge p-2 text-dim hover:bg-scard"
        >
          <Share2 size={16} />
        </button>

        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="rounded-lg border border-edge p-2 text-dim hover:bg-scard"
        >
          {theme === "dark" ? (
            <Sun size={16} />
          ) : (
            <Moon size={16} />
          )}
        </button>

        <button
          onClick={triggerFitView}
          aria-label="Fit graph to view"
          className="rounded-lg border border-edge p-2 text-dim hover:bg-scard"
        >
          <Maximize2 size={16} />
        </button>
      </div>
    </header>
  );
}
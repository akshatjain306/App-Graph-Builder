import { create } from "zustand";
import type {
  AppId,
  InspectorTab,
  NodeId,
} from "@/types/common.types";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof window === "undefined")
    return "dark";
  return (
    (localStorage.getItem("theme") as Theme) ??
    "dark"
  );
}

interface UiState {
  selectedAppId: AppId | null;
  selectedNodeId: NodeId | null;

  isMobilePanelOpen: boolean;

  activeInspectorTab: InspectorTab;

  theme: Theme;

  setSelectedApp: (appId: AppId | null) => void;

  setSelectedNode: (nodeId: NodeId | null) => void;

  setMobilePanelOpen: (open: boolean) => void;

  setInspectorTab: (
    tab: InspectorTab,
  ) => void;

  toggleTheme: () => void;
}

export const useUiStore =
  create<UiState>((set) => ({
    selectedAppId: null,

    selectedNodeId: null,

    isMobilePanelOpen: false,

    activeInspectorTab: "config",

    theme: getInitialTheme(),

    setSelectedApp: (appId) =>
      set({
        selectedAppId: appId,
        selectedNodeId: null,
      }),

    setSelectedNode: (nodeId) =>
      set({
        selectedNodeId: nodeId,
      }),

    setMobilePanelOpen: (open) =>
      set({
        isMobilePanelOpen: open,
      }),

    setInspectorTab: (tab) =>
      set({
        activeInspectorTab: tab,
      }),

    toggleTheme: () =>
      set((state) => {
        const next =
          state.theme === "dark"
            ? "light"
            : "dark";

        localStorage.setItem(
          "theme",
          next,
        );

        return { theme: next };
      }),
  }));
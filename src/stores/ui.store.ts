import { create } from "zustand";
import type {
  AppId,
  InspectorTab,
  NodeId,
} from "@/types/common.types";

interface UiState {
  selectedAppId: AppId | null;
  selectedNodeId: NodeId | null;

  isMobilePanelOpen: boolean;

  activeInspectorTab: InspectorTab;

  setSelectedApp: (appId: AppId | null) => void;

  setSelectedNode: (nodeId: NodeId | null) => void;

  setMobilePanelOpen: (open: boolean) => void;

  setInspectorTab: (
    tab: InspectorTab,
  ) => void;
}

export const useUiStore =
  create<UiState>((set) => ({
    selectedAppId: null,

    selectedNodeId: null,

    isMobilePanelOpen: false,

    activeInspectorTab: "config",

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
  }));
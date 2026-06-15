import { create } from "zustand";

interface GraphControlsState {
  fitViewTrigger: number;

  triggerFitView: () => void;
}

export const useGraphControlsStore =
  create<GraphControlsState>((set) => ({
    fitViewTrigger: 0,

    triggerFitView: () =>
      set((state) => ({
        fitViewTrigger:
          state.fitViewTrigger + 1,
      })),
  }));
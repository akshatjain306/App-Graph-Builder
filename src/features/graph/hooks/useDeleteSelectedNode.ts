import { useEffect } from "react";

import { useGraphStore } from "@/stores/graph.store";
import { useUiStore } from "@/stores/ui.store";

export function useDeleteSelectedNode() {
  const selectedAppId = useUiStore(
    (state) => state.selectedAppId,
  );

  const selectedNodeId = useUiStore(
    (state) => state.selectedNodeId,
  );

  const setSelectedNode = useUiStore(
    (state) => state.setSelectedNode,
  );

  const deleteNode = useGraphStore(
    (state) => state.deleteNode,
  );

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent,
    ) => {
      const target =
        event.target as HTMLElement;

      const isInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA";

      if (isInput) {
        return;
      }

      if (
        (event.key === "Delete" ||
          event.key === "Backspace") &&
        selectedAppId &&
        selectedNodeId
      ) {
        deleteNode(
          selectedAppId,
          selectedNodeId,
        );

        setSelectedNode(null);
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () =>
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
  }, [
    deleteNode,
    selectedAppId,
    selectedNodeId,
    setSelectedNode,
  ]);
}
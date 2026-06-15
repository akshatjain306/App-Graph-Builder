import { useEffect } from "react";

import { useReactFlow } from "@xyflow/react";

import { useGraphControlsStore } from "@/stores/graph-controls.store";

export function useFitGraph() {
  const fitViewTrigger =
    useGraphControlsStore(
      (state) => state.fitViewTrigger,
    );

  const { fitView } = useReactFlow();

  useEffect(() => {
    if (fitViewTrigger > 0) {
      void fitView({ duration: 300 });
    }
  }, [fitViewTrigger, fitView]);
}

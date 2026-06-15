import { useEffect } from "react";

import { useGraphStore } from "@/stores/graph.store";

import type { AppGraphResponse } from "@/types/graph.types";

export function useGraphHydration(
  graph: AppGraphResponse | undefined,
) {
  const hydrateGraph =
    useGraphStore(
      (state) => state.hydrateGraph,
    );

  useEffect(() => {
    if (!graph) {
      return;
    }

    hydrateGraph(graph);
  }, [
    graph,
    hydrateGraph,
  ]);
}
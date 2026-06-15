import type {
  AppSummary,
} from "@/types/app.types";

import type {
  AppGraphResponse,
} from "@/types/graph.types";

import { apps } from "@/mocks/data/apps";
import { graphs } from "@/mocks/data/graphs";

export async function getApps() {
  if (!import.meta.env.DEV) {
    return apps;
  }

  const response = await fetch(
    "/api/apps",
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch apps",
    );
  }

  return response.json() as Promise<
    AppSummary[]
  >;
}

export async function getGraph(
  appId: string,
) {
  if (!import.meta.env.DEV) {
    const graph = graphs[appId];

    if (!graph) {
      throw new Error(
        "Graph not found",
      );
    }

    return graph;
  }

  const response = await fetch(
    `/api/apps/${appId}/graph`,
  );

  if (!response.ok) {
    throw new Error(
      "Failed to fetch graph",
    );
  }

  return response.json() as Promise<AppGraphResponse>;
}
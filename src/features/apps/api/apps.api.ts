import type {
  AppSummary,
} from "@/types/app.types";

import type {
  AppGraphResponse,
} from "@/types/graph.types";

export async function getApps() {
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
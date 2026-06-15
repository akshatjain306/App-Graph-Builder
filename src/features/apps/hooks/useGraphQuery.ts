import { useQuery } from "@tanstack/react-query";

import { getGraph } from "../api/apps.api";

export function useGraphQuery(
  appId: string | null,
) {
  return useQuery({
    queryKey: ["graph", appId],

    queryFn: () =>
      getGraph(appId!),

    enabled: !!appId,
  });
}
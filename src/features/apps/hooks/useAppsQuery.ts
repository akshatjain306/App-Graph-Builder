import { useQuery } from "@tanstack/react-query";

import { getApps } from "../api/apps.api";

export function useAppsQuery() {
  return useQuery({
    queryKey: ["apps"],

    queryFn: getApps,
  });
}
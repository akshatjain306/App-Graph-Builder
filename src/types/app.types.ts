import type { AppId } from "./common.types";

export interface AppSummary {
  id: AppId;
  name: string;
  description: string;
}

export interface AppsResponse {
  apps: AppSummary[];
}
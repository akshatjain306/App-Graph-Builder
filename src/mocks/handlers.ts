import { appsHandlers } from "./handlers/apps.handlers";
import { graphHandlers } from "./handlers/graphs.handlers";

export const handlers = [
  ...appsHandlers,
  ...graphHandlers,
];
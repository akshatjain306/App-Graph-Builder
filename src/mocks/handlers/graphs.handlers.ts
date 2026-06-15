import {
  http,
  HttpResponse,
} from "msw";

import { graphs } from "../data/graphs";
import { delay } from "../utils";

const ENABLE_RANDOM_FAILURE = true;

export const graphHandlers = [
  http.get(
    "/api/apps/:appId/graph",
    async ({ params }) => {
      await delay(800);

      if (
        ENABLE_RANDOM_FAILURE &&
        Math.random() < 0.2
      ) {
        return HttpResponse.json(
          {
            message:
              "Failed to fetch graph",
          },
          {
            status: 500,
          },
        );
      }

      const appId = String(
        params.appId,
      );

      const graph = graphs[appId];

      if (!graph) {
        return HttpResponse.json(
          {
            message:
              "Graph not found",
          },
          {
            status: 404,
          },
        );
      }

      return HttpResponse.json(
        graph,
      );
    },
  ),
];
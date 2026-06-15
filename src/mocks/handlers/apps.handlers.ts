import { http, HttpResponse } from "msw";

import { apps } from "../data/apps";
import { delay } from "../utils";

const ENABLE_RANDOM_FAILURE = true;

export const appsHandlers = [
  http.get("/api/apps", async () => {
    await delay(800);

    if (
      ENABLE_RANDOM_FAILURE &&
      Math.random() < 0.2
    ) {
      return HttpResponse.json(
        {
          message:
            "Failed to fetch apps",
        },
        {
          status: 500,
        },
      );
    }

    return HttpResponse.json(apps);
  }),
];
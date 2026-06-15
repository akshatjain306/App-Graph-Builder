import type { AppGraphResponse } from "@/types/graph.types";

export const graphs: Record<
  string,
  AppGraphResponse
> = {
  "supertokens-golang": {
    appId: "supertokens-golang",

    nodes: [
      {
        id: "1",
        type: "serviceNode",
        position: { x: 100, y: 100 },

        data: {
          id: "1",
          name: "API Gateway",
          status: "healthy",
          kind: "service",
          cpu: 40,
          memory: 55,
          disk: 30,
          region: "us-east-1",
        },
      },

      {
        id: "2",
        type: "serviceNode",
        position: { x: 400, y: 100 },

        data: {
          id: "2",
          name: "Auth Service",
          status: "healthy",
          kind: "service",
          cpu: 70,
          memory: 60,
          disk: 50,
          region: "us-east-1",
        },
      },

      {
        id: "3",
        type: "serviceNode",
        position: { x: 700, y: 100 },

        data: {
          id: "3",
          name: "Database",
          status: "degraded",
          kind: "database",
          cpu: 25,
          memory: 80,
          disk: 75,
          region: "us-east-1",
        },
      },
    ],

    edges: [
      {
        id: "e1",
        source: "1",
        target: "2",
      },

      {
        id: "e2",
        source: "2",
        target: "3",
      },
    ],
  },

  "supertokens-java": {
    appId: "supertokens-java",

    nodes: [
      {
        id: "1",
        type: "serviceNode",
        position: { x: 100, y: 100 },

        data: {
          id: "1",
          name: "Java Gateway",
          status: "healthy",
          kind: "service",
          cpu: 30,
          memory: 45,
          disk: 35,
          region: "eu-west-1",
        },
      },

      {
        id: "2",
        type: "serviceNode",
        position: { x: 450, y: 100 },

        data: {
          id: "2",
          name: "Java Auth",
          status: "healthy",
          kind: "service",
          cpu: 50,
          memory: 60,
          disk: 40,
          region: "eu-west-1",
        },
      },
    ],

    edges: [
      {
        id: "je1",
        source: "1",
        target: "2",
      },
    ],
  },

  "supertokens-python": {
    appId: "supertokens-python",

    nodes: [
      {
        id: "1",
        type: "serviceNode",
        position: { x: 100, y: 100 },

        data: {
          id: "1",
          name: "Python API",
          status: "healthy",
          kind: "service",
          cpu: 65,
          memory: 50,
          disk: 40,
          region: "ap-south-1",
        },
      },

      {
        id: "2",
        type: "serviceNode",
        position: { x: 400, y: 100 },

        data: {
          id: "2",
          name: "Python Worker",
          status: "degraded",
          kind: "service",
          cpu: 85,
          memory: 70,
          disk: 60,
          region: "ap-south-1",
        },
      },
    ],

    edges: [
      {
        id: "pe1",
        source: "1",
        target: "2",
      },
    ],
  },

  "supertokens-ruby": {
    appId: "supertokens-ruby",

    nodes: [
      {
        id: "1",
        type: "serviceNode",
        position: { x: 100, y: 100 },

        data: {
          id: "1",
          name: "Ruby API",
          status: "healthy",
          kind: "service",
          cpu: 35,
          memory: 40,
          disk: 30,
          region: "us-west-2",
        },
      },

      {
        id: "2",
        type: "serviceNode",
        position: { x: 400, y: 100 },

        data: {
          id: "2",
          name: "Ruby Cache",
          status: "healthy",
          kind: "database",
          cpu: 25,
          memory: 55,
          disk: 20,
          region: "us-west-2",
        },
      },
    ],

    edges: [
      {
        id: "re1",
        source: "1",
        target: "2",
      },
    ],
  },

  "supertokens-node": {
    appId: "supertokens-node",

    nodes: [
      {
        id: "1",
        type: "serviceNode",
        position: { x: 100, y: 100 },

        data: {
          id: "1",
          name: "Node API",
          status: "healthy",
          kind: "service",
          cpu: 55,
          memory: 45,
          disk: 25,
          region: "ap-southeast-1",
        },
      },

      {
        id: "2",
        type: "serviceNode",
        position: { x: 450, y: 100 },

        data: {
          id: "2",
          name: "Node Database",
          status: "down",
          kind: "database",
          cpu: 95,
          memory: 90,
          disk: 85,
          region: "ap-southeast-1",
        },
      },
    ],

    edges: [
      {
        id: "ne1",
        source: "1",
        target: "2",
      },
    ],
  },
};
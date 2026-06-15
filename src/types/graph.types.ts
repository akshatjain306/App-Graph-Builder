import type { Edge, Node } from "@xyflow/react";

import type {
  AppId,
  EdgeId,
  NodeId,
  ServiceNodeKind,
  ServiceStatus,
} from "./common.types";

export interface ServiceNodeData
  extends Record<string, unknown> {
  id: NodeId;

  name: string;

  description?: string;

  status: ServiceStatus;

  kind: ServiceNodeKind;

  cpu: number;

  memory: number;

  disk: number;

  region: string;
}

export type ServiceGraphNode =
  Node<ServiceNodeData, "serviceNode">;

export type ServiceGraphEdge = Edge & {
  id: EdgeId;
};

export interface AppGraphResponse {
  appId: AppId;

  nodes: ServiceGraphNode[];

  edges: ServiceGraphEdge[];
}
import { memo } from "react";

import { Handle } from "@xyflow/react";

import type { ServiceNodeData } from "@/types/graph.types";

import { Position } from "@xyflow/react";

interface Props {
  data: ServiceNodeData;
}

function ServiceNodeComponent({
  data,
}: Props) {
  return (
    <div className="min-w-45 rounded-xl border border-zinc-700 bg-zinc-900 p-4 shadow-lg">
      <div className="mb-2 flex items-center justify-between">
        <span className="font-medium text-white">
          {data.name}
        </span>

        <span
          className={`rounded-full px-2 py-1 text-xs ${
            data.status === "healthy"
              ? "bg-green-500/20 text-green-400"
              : data.status === "degraded"
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-red-500/20 text-red-400"
          }`}
        >
          {data.status}
        </span>
      </div>

      <div className="text-sm text-zinc-400">
        CPU: {data.cpu}%
      </div>

      <Handle
        type="target"
        position={Position.Left}
      />

      <Handle
        type="source"
        position={Position.Right}
      />
    </div>
  );
}

export const ServiceNode = memo(
  ServiceNodeComponent,
);
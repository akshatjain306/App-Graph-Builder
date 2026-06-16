import type { ServiceNodeData } from "@/types/graph.types";

import { StatusBadge } from "./StatusBadge";

interface Props {
  name: string;
  status: ServiceNodeData["status"];
}

export function InspectorHeader({
  name,
  status,
}: Props) {
  return (
    <>
      <div>
        <h3 className="text-lg font-semibold text-fg">
          Service Node
        </h3>

        <p className="text-sm text-dim">
          {name}
        </p>
      </div>

      <div>
        <StatusBadge status={status} />
      </div>
    </>
  );
}

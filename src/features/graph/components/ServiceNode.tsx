import {
  memo,
  useState,
} from "react";

import {
  Handle,
  Position,
} from "@xyflow/react";

import {
  Database,
  Server,
  Settings,
} from "lucide-react";

import type { ServiceNodeData } from "@/types/graph.types";

import { StatusBadge } from "@/features/inspector/components/StatusBadge";

interface Props {
  data: ServiceNodeData;
  selected?: boolean;
}

type MetricTab =
  | "cpu"
  | "memory"
  | "disk"
  | "region";

function GradientBar({
  value,
}: {
  value: number;
}) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-inset">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${Math.min(value, 100)}%`,
            background:
              "linear-gradient(90deg, #3b82f6 0%, #22c55e 35%, #eab308 65%, #ef4444 100%)",
          }}
        />
      </div>

      <span className="min-w-10 text-right text-xs tabular-nums text-dim">
        {value}%
      </span>
    </div>
  );
}

function ServiceNodeComponent({
  data,
  selected,
}: Props) {
  const [activeTab, setActiveTab] =
    useState<MetricTab>("cpu");

  const KindIcon =
    data.kind === "database"
      ? Database
      : Server;

  const metricValue =
    activeTab === "cpu"
      ? data.cpu
      : activeTab === "memory"
        ? data.memory
        : data.disk;

  return (
    <div
      className={`min-w-60 rounded-xl border bg-scard/95 p-4 shadow-xl backdrop-blur transition-all ${
        selected
          ? "border-blue-500 shadow-blue-500/20 ring-1 ring-blue-500/40"
          : "border-edge hover:border-shover"
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/15">
          <KindIcon
            size={14}
            className="text-blue-400"
          />
        </div>

        <span className="flex-1 truncate text-sm font-semibold text-fg">
          {data.name}
        </span>

        <Settings
          size={14}
          className="shrink-0 text-faint"
        />
      </div>

      <div className="mb-3 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-md bg-inset/60 px-2 py-1">
          <span className="tabular-nums text-fg">
            {data.cpu}%
          </span>

          <span className="ml-1 text-faint">
            CPU
          </span>
        </div>

        <div className="rounded-md bg-inset/60 px-2 py-1">
          <span className="tabular-nums text-fg">
            {data.memory}%
          </span>

          <span className="ml-1 text-faint">
            Mem
          </span>
        </div>

        <div className="rounded-md bg-inset/60 px-2 py-1">
          <span className="tabular-nums text-fg">
            {data.disk}%
          </span>

          <span className="ml-1 text-faint">
            Disk
          </span>
        </div>
      </div>

      <div className="nodrag mb-3 flex gap-0.5 rounded-lg bg-inset/80 p-0.5">
        {(
          [
            "cpu",
            "memory",
            "disk",
            "region",
          ] as MetricTab[]
        ).map((tab) => (
          <button
            key={tab}
            onClick={() =>
              setActiveTab(tab)
            }
            className={`flex-1 rounded-md px-1.5 py-1 text-[11px] font-medium capitalize transition-colors ${
              activeTab === tab
                ? "bg-shover text-fg shadow-sm"
                : "text-faint hover:text-dim"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "region" ? (
        <div className="flex h-7 items-center rounded-md bg-inset/40 px-3 text-xs text-dim">
          🌍 {data.region}
        </div>
      ) : (
        <GradientBar value={metricValue} />
      )}

      <div className="mt-3 flex items-center justify-between">
        <StatusBadge
          status={data.status}
        />

        <span className="text-[10px] text-faint">
          {data.region}
        </span>
      </div>

      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: "#60a5fa",
          width: 8,
          height: 8,
        }}
      />

      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: "#60a5fa",
          width: 8,
          height: 8,
        }}
      />
    </div>
  );
}

export const ServiceNode = memo(
  ServiceNodeComponent,
);
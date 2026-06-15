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
      <div className="h-2 flex-1 overflow-hidden rounded-full bg-zinc-800">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${Math.min(value, 100)}%`,
            background:
              "linear-gradient(90deg, #3b82f6 0%, #22c55e 35%, #eab308 65%, #ef4444 100%)",
          }}
        />
      </div>

      <span className="min-w-10 text-right text-xs tabular-nums text-zinc-300">
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
      className={`min-w-60 rounded-xl border bg-zinc-900/95 p-4 shadow-xl backdrop-blur transition-all ${
        selected
          ? "border-blue-500 shadow-blue-500/20 ring-1 ring-blue-500/40"
          : "border-zinc-700/80 hover:border-zinc-600"
      }`}
    >
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-500/15">
          <KindIcon
            size={14}
            className="text-blue-400"
          />
        </div>

        <span className="flex-1 truncate text-sm font-semibold text-white">
          {data.name}
        </span>

        <Settings
          size={14}
          className="shrink-0 text-zinc-600"
        />
      </div>

      <div className="mb-3 grid grid-cols-3 gap-2 text-center text-xs">
        <div className="rounded-md bg-zinc-800/60 px-2 py-1">
          <span className="tabular-nums text-white">
            {data.cpu}%
          </span>

          <span className="ml-1 text-zinc-500">
            CPU
          </span>
        </div>

        <div className="rounded-md bg-zinc-800/60 px-2 py-1">
          <span className="tabular-nums text-white">
            {data.memory}%
          </span>

          <span className="ml-1 text-zinc-500">
            Mem
          </span>
        </div>

        <div className="rounded-md bg-zinc-800/60 px-2 py-1">
          <span className="tabular-nums text-white">
            {data.disk}%
          </span>

          <span className="ml-1 text-zinc-500">
            Disk
          </span>
        </div>
      </div>

      <div className="nodrag mb-3 flex gap-0.5 rounded-lg bg-zinc-800/80 p-0.5">
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
                ? "bg-zinc-700 text-white shadow-sm"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "region" ? (
        <div className="flex h-7 items-center rounded-md bg-zinc-800/40 px-3 text-xs text-zinc-300">
          🌍 {data.region}
        </div>
      ) : (
        <GradientBar value={metricValue} />
      )}

      <div className="mt-3 flex items-center justify-between">
        <StatusBadge
          status={data.status}
        />

        <span className="text-[10px] text-zinc-600">
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
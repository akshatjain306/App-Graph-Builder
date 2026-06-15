import { ChevronRight } from "lucide-react";

import type { AppSummary } from "@/types/app.types";

function getAppColor(id: string): string {
  if (id.includes("golang"))
    return "bg-cyan-500";
  if (id.includes("java"))
    return "bg-orange-500";
  if (id.includes("python"))
    return "bg-yellow-500";
  if (id.includes("ruby"))
    return "bg-red-500";
  if (id.includes("node"))
    return "bg-green-500";
  return "bg-blue-500";
}

interface Props {
  app: AppSummary;
  isSelected: boolean;
  onSelect: (appId: string) => void;
}

export function AppListItem({
  app,
  isSelected,
  onSelect,
}: Props) {
  return (
    <button
      onClick={() => onSelect(app.id)}
      className={`flex w-full items-center gap-3 rounded-lg border p-3 text-left transition-all ${
        isSelected
          ? "border-blue-500 bg-blue-500/10"
          : "border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
      }`}
    >
      <div
        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold text-white ${getAppColor(app.id)}`}
      >
        {app.name.charAt(0)}
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-sm font-medium text-white">
          {app.name}
        </div>

        <div className="truncate text-xs text-zinc-500">
          {app.description}
        </div>
      </div>

      <ChevronRight
        size={16}
        className={`shrink-0 ${
          isSelected
            ? "text-blue-400"
            : "text-zinc-600"
        }`}
      />
    </button>
  );
}

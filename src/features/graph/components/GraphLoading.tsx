import { Loader2 } from "lucide-react";

export function GraphLoading() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 text-zinc-400">
      <Loader2
        className="animate-spin"
        size={28}
      />

      <p className="text-sm">
        Loading graph...
      </p>
    </div>
  );
}

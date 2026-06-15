import { AlertTriangle } from "lucide-react";

interface Props {
  onRetry: () => void;
}

export function GraphError({
  onRetry,
}: Props) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4">
      <AlertTriangle
        className="text-red-400"
        size={28}
      />

      <p className="text-red-400">
        Failed to load graph
      </p>

      <button
        onClick={onRetry}
        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
      >
        Retry
      </button>
    </div>
  );
}

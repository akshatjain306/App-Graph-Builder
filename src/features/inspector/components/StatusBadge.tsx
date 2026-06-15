import type { ServiceStatus } from "@/types/common.types";

const statusStyles: Record<ServiceStatus, string> = {
  healthy:
    "bg-green-500/20 text-green-400",
  degraded:
    "bg-yellow-500/20 text-yellow-400",
  down: "bg-red-500/20 text-red-400",
};

interface Props {
  status: ServiceStatus;
}

export function StatusBadge({
  status,
}: Props) {
  return (
    <span
      className={`rounded-full px-3 py-1 text-xs ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}

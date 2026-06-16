import type { ServiceStatus } from "@/types/common.types";

const statusStyles: Record<ServiceStatus, string> = {
  healthy:
    "bg-status-healthy-bg text-status-healthy",
  degraded:
    "bg-status-degraded-bg text-status-degraded",
  down: "bg-status-down-bg text-status-down",
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

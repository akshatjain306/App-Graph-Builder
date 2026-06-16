interface Props {
  cpu: number;
  memory: number;
  disk: number;
  region: string;
}

export function RuntimeTab({
  cpu,
  memory,
  disk,
  region,
}: Props) {
  return (
    <div className="space-y-3">
      <div className="rounded border border-edge p-3">
        <p className="text-dim">CPU</p>

        <p className="text-fg">{cpu}%</p>
      </div>

      <div className="rounded border border-edge p-3">
        <p className="text-dim">
          Memory
        </p>

        <p className="text-fg">
          {memory}%
        </p>
      </div>

      <div className="rounded border border-edge p-3">
        <p className="text-dim">Disk</p>

        <p className="text-fg">{disk}%</p>
      </div>

      <div className="rounded border border-edge p-3">
        <p className="text-dim">
          Region
        </p>

        <p className="text-fg">{region}</p>
      </div>
    </div>
  );
}

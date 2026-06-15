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
      <div className="rounded border border-zinc-800 p-3">
        <p className="text-zinc-400">CPU</p>

        <p className="text-white">{cpu}%</p>
      </div>

      <div className="rounded border border-zinc-800 p-3">
        <p className="text-zinc-400">
          Memory
        </p>

        <p className="text-white">
          {memory}%
        </p>
      </div>

      <div className="rounded border border-zinc-800 p-3">
        <p className="text-zinc-400">Disk</p>

        <p className="text-white">{disk}%</p>
      </div>

      <div className="rounded border border-zinc-800 p-3">
        <p className="text-zinc-400">
          Region
        </p>

        <p className="text-white">{region}</p>
      </div>
    </div>
  );
}

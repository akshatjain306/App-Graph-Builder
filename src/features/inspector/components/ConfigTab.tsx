interface Props {
  name: string;
  cpu: number;
  onNameChange: (name: string) => void;
  onCpuChange: (cpu: number) => void;
}

export function ConfigTab({
  name,
  cpu,
  onNameChange,
  onCpuChange,
}: Props) {
  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="node-name"
          className="mb-1 block text-sm text-zinc-400"
        >
          Node Name
        </label>

        <input
          id="node-name"
          value={name}
          onChange={(e) =>
            onNameChange(e.target.value)
          }
          className="w-full rounded border border-zinc-700 bg-zinc-900 p-2 text-white"
        />
      </div>

      <div>
        <label
          htmlFor="cpu-capacity"
          className="mb-2 block text-sm text-zinc-400"
        >
          CPU Capacity
        </label>

        <input
          id="cpu-capacity"
          type="range"
          min="0"
          max="100"
          value={cpu}
          onChange={(e) =>
            onCpuChange(
              Number(e.target.value),
            )
          }
          className="w-full"
        />

        <input
          type="number"
          min="0"
          max="100"
          value={cpu}
          aria-label="CPU capacity value"
          onChange={(e) =>
            onCpuChange(
              Number(e.target.value),
            )
          }
          className="mt-2 w-full rounded border border-zinc-700 bg-zinc-900 p-2 text-white"
        />
      </div>
    </div>
  );
}

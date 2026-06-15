import {
  Boxes,
  Database,
  Github,
  Server,
} from "lucide-react";

export function LeftRail() {
  return (
    <aside className="flex w-16 flex-col items-center gap-4 border-r border-zinc-800 bg-black py-4">
      <Github className="text-zinc-400" />

      <Server className="text-zinc-400" />

      <Database className="text-zinc-400" />

      <Boxes className="text-zinc-400" />
    </aside>
  );
}
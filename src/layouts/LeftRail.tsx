import {
  Boxes,
  Database,
  Github,
  Server,
} from "lucide-react";

export function LeftRail() {
  return (
    <aside
      aria-label="Quick links"
      className="flex w-16 flex-col items-center gap-4 border-r border-zinc-800 bg-black py-4"
    >
      <Github
        className="text-zinc-400"
        aria-hidden="true"
      />

      <Server
        className="text-zinc-400"
        aria-hidden="true"
      />

      <Database
        className="text-zinc-400"
        aria-hidden="true"
      />

      <Boxes
        className="text-zinc-400"
        aria-hidden="true"
      />
    </aside>
  );
}
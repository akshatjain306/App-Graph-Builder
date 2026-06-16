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
      className="hidden w-16 flex-col items-center gap-4 border-r border-edge bg-app py-4 md:flex"
    >
      <Github
        className="text-dim"
        aria-hidden="true"
      />

      <Server
        className="text-dim"
        aria-hidden="true"
      />

      <Database
        className="text-dim"
        aria-hidden="true"
      />

      <Boxes
        className="text-dim"
        aria-hidden="true"
      />
    </aside>
  );
}
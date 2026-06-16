import { DesktopSidePanel } from "./DesktopSidePanel";
import { MobileSidePanel } from "./MobileSidePanel";
import { LeftRail } from "./LeftRail";
import { TopBar } from "./TopBar";

interface Props {
  children: React.ReactNode;
}

export function WorkspaceLayout({
  children,
}: Props) {
  return (
    <div className="h-dvh bg-app">
      <TopBar />

      <div className="flex h-[calc(100dvh-56px)]">
        <LeftRail />

        <main className="min-w-0 flex-1">
          {children}
        </main>

        <div className="hidden md:flex">
          <DesktopSidePanel />
        </div>

        <MobileSidePanel />
      </div>
    </div>
  );
}
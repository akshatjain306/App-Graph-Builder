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
    <div className="h-screen bg-black">
      <TopBar />

      <div className="flex h-[calc(100vh-56px)]">
        <LeftRail />

        <main className="flex-1">
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
import { ReactFlowProvider } from "@xyflow/react";

import { ErrorBoundary } from "@/components/ErrorBoundary";

import { GraphCanvas } from "@/features/graph/components/GraphCanvas";

import { WorkspaceLayout } from "@/layouts/WorkspaceLayout";

export default function App() {
  return (
    <ErrorBoundary>
      <ReactFlowProvider>
        <WorkspaceLayout>
          <GraphCanvas />
        </WorkspaceLayout>
      </ReactFlowProvider>
    </ErrorBoundary>
  );
}
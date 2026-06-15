import { useAppsQuery } from "../hooks/useAppsQuery";

import { useUiStore } from "@/stores/ui.store";

export function AppList() {
  const {
    data,
    isLoading,
    isError,
  } = useAppsQuery();

  const selectedAppId =
    useUiStore(
      (state) => state.selectedAppId,
    );

  const setSelectedApp =
    useUiStore(
      (state) => state.setSelectedApp,
    );

  if (isLoading) {
    return (
      <div className="p-4 text-sm text-zinc-400">
        Loading apps...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-sm text-red-400">
        Failed to load apps
      </div>
    );
  }

  return (
    <div className="space-y-2 p-3">
      {data?.map((app) => (
        <button
          key={app.id}
          onClick={() =>
            setSelectedApp(app.id)
          }
          className={`w-full rounded-lg border p-3 text-left transition ${
            selectedAppId === app.id
              ? "border-blue-500 bg-blue-500/10"
              : "border-zinc-800 bg-zinc-900 hover:bg-zinc-800"
          }`}
        >
          <div className="font-medium text-white">
            {app.name}
          </div>

          <div className="mt-1 text-xs text-zinc-400">
            {app.description}
          </div>
        </button>
      ))}
    </div>
  );
}
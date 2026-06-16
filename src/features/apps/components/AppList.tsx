import { useState } from "react";

import { Search } from "lucide-react";

import { useAppsQuery } from "../hooks/useAppsQuery";

import { useUiStore } from "@/stores/ui.store";

import { AppListItem } from "./AppListItem";

export function AppList() {
  const [search, setSearch] = useState("");

  const {
    data,
    isLoading,
    isError,
    refetch,
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
      <div className="space-y-2 p-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="h-16 animate-pulse rounded-lg bg-inset"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col gap-2 p-4">
        <p className="text-sm text-red-400">
          Failed to load apps
        </p>

        <button
          onClick={() => {
            void refetch();
          }}
          className="w-full rounded-lg bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  const filtered = data?.filter((app) =>
    app.name
      .toLowerCase()
      .includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-2 p-3">
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-faint"
        />

        <input
          type="text"
          placeholder="Search apps..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          aria-label="Search applications"
          className="w-full rounded-lg border border-edge bg-scard py-2 pl-9 pr-3 text-sm text-fg placeholder-faint focus:border-blue-500 focus:outline-none"
        />
      </div>

      {filtered?.map((app) => (
        <AppListItem
          key={app.id}
          app={app}
          isSelected={
            selectedAppId === app.id
          }
          onSelect={setSelectedApp}
        />
      ))}

      {filtered?.length === 0 && (
        <p className="py-4 text-center text-sm text-faint">
          No apps match your search
        </p>
      )}
    </div>
  );
}
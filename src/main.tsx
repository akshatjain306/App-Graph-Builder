import React from "react";
import ReactDOM from "react-dom/client";

import "@/styles/globals.css";

import App from "@/app/App";
import { AppProviders } from "@/app/AppProviders";

async function enableMocking() {
  const { worker } = await import(
    "@/mocks/browser"
  );

  await worker.start({
    onUnhandledRequest: "bypass",
  });
}

void enableMocking().then(() => {
  ReactDOM.createRoot(
    document.getElementById("root")!,
  ).render(
    <React.StrictMode>
      <AppProviders>
        <App />
      </AppProviders>
    </React.StrictMode>,
  );
});
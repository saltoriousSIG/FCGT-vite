import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { WagmiProvider } from "wagmi";
import { FrameSDKProvider } from "./providers/FrameProvider";
import { BrowserRouter } from 'react-router-dom';
import { ShowsProvider } from "./providers/EventsProvider";
import { AuthProvider } from "./providers/AuthProvider";

import App from "./App";
import { config } from "./wagmi";

import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <FrameSDKProvider>
            <AuthProvider>
              <ShowsProvider>
                <App />
              </ShowsProvider>
            </AuthProvider>
          </FrameSDKProvider>
        </BrowserRouter>
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>,
);

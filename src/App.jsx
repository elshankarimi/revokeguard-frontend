// src/App.jsx
import React from "react";

// Wagmi v2
import { WagmiProvider, createConfig, http } from "wagmi";
import { mainnet, polygon, arbitrum, optimism, base } from "wagmi/chains";

// React Query
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// AppKit (Web3Modal جدید)
import {
  createAppKit,
  AppKitProvider,
} from "@reown/appkit/react";

// کانفیگ WalletConnect
const projectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID;

// ساخت QueryClient
const queryClient = new QueryClient();

// ساخت Wagmi Config
const wagmiConfig = createConfig({
  chains: [mainnet, polygon, arbitrum, optimism, base],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
});

// اجرای createAppKit
createAppKit({
  projectId,
  wagmiConfig,
  features: {
    connectWallet: true,
  },
});

export default function App() {
  return (
    <React.StrictMode>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <AppKitProvider>
            {/* --- محتوای اصلی برنامه --- */}
            <div style={{ padding: 24 }}>
              <h1>RevokeGuard</h1>
              <p>Wallet Connection Ready</p>
            </div>
          </AppKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </React.StrictMode>
  );
} 

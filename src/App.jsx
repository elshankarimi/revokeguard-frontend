// src/App.jsx
import React from "react";
import { WagmiConfig, createClient, configureChains, chain } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { walletConnectors } from "./lib/wallet";
import ConnectWallet from "./components/ConnectWallet";
import CastGate from "./components/CastGate";

// تنظیم شبکه و کلاینت
const { chains, provider } = configureChains(
  [chain.mainnet, chain.goerli],
  [publicProvider()]
);

const wagmiClient = createClient({
  autoConnect: true,
  connectors: walletConnectors,
  provider,
});

function AppContent() {
  return (
    <CastGate>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>سلام! مینی اپ Revokeguard آماده استفاده است 🎉</h1>
        <p>حالا که Cast کردی، می‌توانی تمام امکانات را ببینی.</p>
      </div>
    </CastGate>
  );
}

export default function App() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div>
          <ConnectWallet />
          <AppContent />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

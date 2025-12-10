import React from 'react';
import ReactDOM from 'react-dom/client';
import { WagmiConfig, createClient, configureChains, mainnet } from 'wagmi';
import { publicProvider } from "wagmi/providers/public";
import { Web3Modal } from '@web3modal/react';
import App from './App';
import './index.css';

// 1️⃣ پیکربندی شبکه‌ها و provider ها
const { chains, provider } = configureChains([mainnet], [publicProvider()]);

// 2️⃣ ساخت کلاینت Wagmi
const wagmiClient = createClient({
  autoConnect: true,
  provider,
});

// 3️⃣ رندر برنامه
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <App />
      {/* Web3Modal کامپوننت */}
      <Web3Modal projectId="REPLACE_WITH_YOUR_PROJECT_ID" ethereumClient={wagmiClient} />
    </WagmiConfig>
  </React.StrictMode>
);

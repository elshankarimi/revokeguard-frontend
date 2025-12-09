import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// وارد کردن تنظیمات Wagmi و Web3Modal
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createWeb3Modal } from '@web3modal/wagmi';
import { config } from './wagmi.config.js';

// Project ID جدید WalletConnect شما
const projectId = 'Ac634d78fb9387e384997db507c695b3';

const queryClient = new QueryClient();

// راه‌اندازی Web3Modal برای نمایش پنجره اتصال کیف پول
createWeb3Modal({ 
    wagmiConfig: config, 
    projectId, 
    enableAnalytics: true, 
    enableOnramp: true 
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiProvider>
  </React.StrictMode>
);

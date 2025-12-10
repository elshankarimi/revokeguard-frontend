import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '.[/App](https://farcaster.xyz/~/channel/App).jsx';
import '.[/index](https://farcaster.xyz/~/channel/index).css';

// برای Web3 integration این بخش‌ها را فعال کن:
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '[@tanstack](https://farcaster.xyz/tanstack)/react-query';
import { createWeb3Modal } from '[@web3modal](https://farcaster.xyz/web3modal)/wagmi';
import { config } from '.[/wagmi](https://farcaster.xyz/~/channel/wagmi).config.js';

const projectId = 'ac634d78fb9387e384997db507c695b3'; // projectId واقعی خودت رو بذار

const queryClient = new QueryClient();

createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,
  enableOnramp: true,
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <WagmiProvider config={config}>
        <App />
      <[/WagmiProvider](https://farcaster.xyz/~/channel/WagmiProvider)>
    <[/QueryClientProvider](https://farcaster.xyz/~/channel/QueryClientProvider)>
  <[/React](https://farcaster.xyz/~/channel/React).StrictMode>
);

import { createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum, optimism, base } from 'wagmi/chains';
import { walletConnect, injected } from 'wagmi/connectors';

// TODO: Replace with your authentic WalletConnect Project ID
const projectId = 'ac634d78fb9387e384997db507c695b3';

const metadata = {
  name: 'RevokeGuard',
  description: 'Your DeFi Approval Manager',
  url: 'https://revokeguard-frontend.pages.dev', // Final deployed domain
  icons: ['https://avatars.githubusercontent.com/u/37784886'],
};

export const config = createConfig({
  chains: [mainnet, polygon, arbitrum, optimism, base],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
  connectors: [
    walletConnect({ projectId, metadata, showQrModal: false }),
    injected({ shimDisconnect: true }),
  ],
});

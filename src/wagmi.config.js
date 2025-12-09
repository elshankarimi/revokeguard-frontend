import { createConfig, http } from 'wagmi';
import { mainnet, polygon, arbitrum, optimism, base } from 'wagmi/chains';
import { walletConnect, injected } from 'wagmi/connectors';

// 🔴 اقدام ضروری: آیدی پروژه خود را از سایت WalletConnect بگیرید و جایگزین کنید.
const projectId = 'ac634d78fb9387e384997db507c695b3'; 

// متادیتای نمایش داده شده در پنجره Web3Modal
const metadata = {
  name: 'RevokeGuard',
  description: 'Your DeFi Approval Manager',
  url: 'https://revokeguard-frontend.pages.dev', // آدرس دامین نهایی شما
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

export const config = createConfig({
  // پشتیبانی از شبکه‌های اصلی EVM
  chains: [mainnet, polygon, arbitrum, optimism, base],
  transports: {
    [mainnet.id]: http(),
    [polygon.id]: http(),
    [arbitrum.id]: http(),
    [optimism.id]: http(),
    [base.id]: http(),
  },
  connectors: [
    // WalletConnect: برای کیف پول‌های موبایل و دسکتاپ (Rainbow, Trust, Farcaster, Rabby, etc.)
    walletConnect({ projectId, metadata, showQrModal: false }),
    // Injected: برای کیف پول‌های نصب شده در مرورگر (MetaMask, Rabby Extension, etc.)
    injected({ shimDisconnect: true }), 
  ],
});

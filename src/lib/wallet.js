import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import {
  RainbowKitProvider,
  connectorsForWallets
} from '@rainbow-me/rainbowkit';

import {
  rainbowWallet,
  metaMaskWallet,
  coinbaseWallet,
  walletConnectWallet,
  rabbyWallet
} from '@rainbow-me/rainbowkit/wallets';

import {
  mainnet,
  polygon,
  arbitrum,
  optimism,
  base
} from 'wagmi/chains';

import { injected } from '@wagmi/connectors';

const projectId = "ac634d78fb9387e384997db507c695b3"; // walletConnect Project ID

export const config = getDefaultConfig({
  appName: "RevokeGuard",
  projectId,
  chains: [mainnet, polygon, arbitrum, optimism, base],
  wallets: [
    {
      groupName: "Popular Wallets",
      wallets: [
        metaMaskWallet,
        rainbowWallet,
        rabbyWallet,
        coinbaseWallet,
        walletConnectWallet
      ]
    }
  ]
}); 

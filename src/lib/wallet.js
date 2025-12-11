// src/lib/wallet.js

import { configureChains, createClient, chain } from 'wagmi'
import { publicProvider } from '@wagmi/core/providers/public'
import {
  injectedWallet,
  metaMaskWallet,
  rainbowWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets'

// ------------------------
// 1. Configure chains
// ------------------------
export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.arbitrum, chain.optimism, chain.base],
  [publicProvider()]
)

// ------------------------
// 2. Set up wallet connectors
// ------------------------
export const connectors = [
  injectedWallet({ chains }),
  metaMaskWallet({ chains }),
  rainbowWallet({ chains }),
  walletConnectWallet({ chains })
]

// ------------------------
// 3. Create Wagmi client
// ------------------------
export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
}) 

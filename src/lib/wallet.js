import { configureChains, createClient } from 'wagmi'
import { mainnet, polygon, arbitrum, optimism, base } from 'wagmi/chains'
import { publicProvider } from 'wagmi/providers/public'
import { walletConnect, injected } from 'wagmi/connectors'

const projectId = 'ac634d78fb9387e384997db507c695b3'

const { chains, provider } = configureChains(
  [mainnet, polygon, arbitrum, optimism, base],
  [publicProvider()]
)

export const wagmiClient = createClient({
  autoConnect: true,
  connectors: [
    walletConnect({ projectId, chains }),
    injected({ chains })
  ],
  provider
})

export { chains }

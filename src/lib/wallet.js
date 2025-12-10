// src/lib/wallet.js
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { injectedWallet } from "@rainbow-me/rainbowkit/wallets";
import { metaMaskWallet } from "@rainbow-me/rainbowkit/wallets";

export const walletConnectors = connectorsForWallets([
  {
    groupName: "Supported Wallets",
    wallets: [
      metaMaskWallet(),
      injectedWallet({ chains: [] }), // برای Rabby و Farcaster Wallet
      // اضافه کردن کیف‌های دیگر مثل Base Wallet یا Rabby Wallet نیاز به config مخصوص دارد
    ],
  },
]);

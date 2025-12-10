import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: [
        '@rainbow-me/rainbowkit',
        '@rainbow-me/rainbowkit/wallets'
      ]
    }
  }
}) 

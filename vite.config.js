export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['@rainbow-me/rainbowkit', '@rainbow-me/rainbowkit/wallets']
    }
  }
}) 

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// اگر نیاز به alias داری (مثلاً برای src یا node_modules)، اینجا اضافه کن
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // حالا می‌تونی به جای ../../ از "@/..." استفاده کنی
    },
  },
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
  },
})

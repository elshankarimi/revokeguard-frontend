import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // 💡 این خط حیاتی است: مطمئن می‌شویم که تمام مسیرهای منابع از Root بارگذاری شوند.
  base: '/', 
  
  build: {
    // پوشه خروجی را مشخص می‌کند که با تنظیمات Cloudflare Pages شما مطابقت دارد
    outDir: 'dist', 
  },
});

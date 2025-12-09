import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // برای Cloudflare Pages معمولاً base: '/' بهترین گزینه است
  base: '/', 
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true, // برای دیباگ بهتر
  },
});
 

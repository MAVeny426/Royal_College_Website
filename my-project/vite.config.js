import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000, // frontend runs on port 5000
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // backend runs on port 3000
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
      }
    }
  },
})

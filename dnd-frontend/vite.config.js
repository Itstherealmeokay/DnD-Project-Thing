import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, // bind to 0.0.0.0 so the dev server is reachable from outside the container
    port: 5173,
    proxy: {
      '/api': {
        // when running inside Docker on Windows/macOS this resolves to the host machine
        target: 'http://host.docker.internal:5000',
        changeOrigin: true,
      },
    },
  },
})

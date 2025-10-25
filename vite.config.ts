import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { weatherApiPlugin } from './server/weatherRoutes'

export default defineConfig({
  plugins: [react(), weatherApiPlugin()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'chart-vendor': ['recharts'],
          'map-vendor': ['leaflet', 'react-leaflet']
        }
      }
    },
    chunkSizeWarningLimit: 1000
  }
})

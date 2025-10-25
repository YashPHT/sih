import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { weatherApiPlugin } from './server/weatherRoutes'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), weatherApiPlugin()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
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
  },
  server: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '3000')
  },
  preview: {
    host: '0.0.0.0',
    port: parseInt(process.env.PORT || '3000')
  }
})

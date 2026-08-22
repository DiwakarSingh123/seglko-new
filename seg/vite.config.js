import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    cssMinify: false
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    }
  },
  define: {
    // makes VITE_API_BASE available — fallback to '' so local proxy still works
    __API_BASE__: JSON.stringify(process.env.VITE_API_BASE || ''),
  }
})

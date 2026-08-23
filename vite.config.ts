import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/sicklesense/',
  plugins: [react(), tailwindcss()],
  build: {
    rolldownOptions: {
      input: {
        main: path.resolve(import.meta.dirname, 'index.html'),
        webportal: path.resolve(import.meta.dirname, 'webportal/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})

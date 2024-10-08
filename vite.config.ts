/// <reference types="vitest" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      $: path.resolve(__dirname, './src')
    }
  },
  plugins: [TanStackRouterVite(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts']
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  server: {
    host: true,
    port: 5173
  },
  preview: {
    port: 8080,
    host: true
  }
})

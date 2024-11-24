/// <reference types="vitest" />

import { coverageConfigDefaults, defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react-swc'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

export default defineConfig(() => {
  const port = process.env.PORT ? parseInt(process.env.PORT) : 80

  return {
    resolve: {
      alias: {
        $: path.resolve(__dirname, './src')
      }
    },
    plugins: [TanStackRouterVite(), react()],
    test: {
      environment: 'jsdom',
      setupFiles: ['./vitest.setup.ts'],
      browser: {
        name: 'firefox',
        headless: false,
        viewport: {
          height: 1080,
          width: 1920
        }
      },
      coverage: {
        exclude: [
          '**/main.tsx',
          '**/router.tsx',
          '**/routeTree.gen.ts',
          '**/__root.tsx',
          '**/App.tsx',
          '**/router.ts',
          '**/types/**',
          ...coverageConfigDefaults.exclude
        ]
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler'
        }
      }
    },
    server: {
      host: true
    },
    preview: {
      port,
      host: true
    }
  }
})

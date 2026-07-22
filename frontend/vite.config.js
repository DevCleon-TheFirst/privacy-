import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'PrivacyVault',
        short_name: 'PrivacyVault',
        description: 'Privacy-Enhanced Blockchain Transactions',
        theme_color: '#0a0a0b',
        background_color: '#0a0a0b',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/app/',
        start_url: '/app/',
        icons: [
          {
            src: '/app/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/app/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
        navigateFallback: '/app/index.html',
        navigateFallbackDenylist: [/^\/api/],
      },
    }),
  ],
  base: '/app/',
  build: {
    outDir: path.resolve(__dirname, '../public/app'),
    emptyOutDir: true,
  },
})





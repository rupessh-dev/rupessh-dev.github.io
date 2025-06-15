import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import { compression } from "vite-plugin-compression2";
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,vue,txt,woff2,webp}'],
        cleanupOutdatedCaches: true,
        sourcemap: true
      },
      includeAssets: ['favicon.svg', 'icons/*.{png,svg, webp}'],
      manifest: {
        name: 'R Labs',
        short_name: 'R Labs',
        description: 'R Labs Portfolio and Tools',
        theme_color: '#317EFB',
        background_color: '#000000',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/#/labs',
        icons: [
          {
            src: '/logo-192.webp',
            sizes: '192x192',
            type: 'image/webp',
            purpose: 'any maskable'
          },
          {
            src: '/logo-512.webp',
            sizes: '512x512',
            type: 'image/webp',
            purpose: 'any maskable'
          }
        ],
        screenshots: [],
        shortcuts: [],
        id: '/',
        scope: '/'
      },
      strategies: 'generateSW',
    }),
    compression({
      algorithm: "brotliCompress",
      deleteOriginFile: false,
    }),
  ],
  css: {
    modules: {
      generateScopedName: "[hash:base64:8]",
    },
    postcss: {
      plugins: [autoprefixer(), cssnano({ preset: "default" })],
    },
  },
  base: "/",
  build: {
    rollupOptions: {
      treeshake: true,
    },
    reportCompressedSize: true,
    sourcemap: "hidden",
    cssCodeSplit: true,
  },
});

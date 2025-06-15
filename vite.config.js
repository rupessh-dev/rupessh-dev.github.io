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
      base: './',
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt', 'icons/icon-192x192.png', 'icons/icon-512x512.png'],
      manifest: {
        name: 'R Labs',
        short_name: 'R Labs',
        start_url: './',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#317EFB',
        orientation: 'portrait',
        icons: [
          {
            src: 'icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: 'icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
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
      // output: {
      //   manualChunks: {
      //     vendor: ["react", "react-dom"],
      //   },
      // },
      treeshake: true,
    },
    reportCompressedSize: true,
    sourcemap: "hidden",
    cssCodeSplit: true,
  },
});

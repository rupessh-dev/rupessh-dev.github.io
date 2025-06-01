import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import autoprefixer from "autoprefixer";
import cssnano from "cssnano";
import { compression } from "vite-plugin-compression2";
import tailwindcss from '@tailwindcss/vite'
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
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

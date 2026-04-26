import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
  ],

  build: {
    // Chunk bo'linishi — har lazy import alohida fayl bo'ladi
    rollupOptions: {
      output: {
        manualChunks: {
          // React core — bitta chunk
          'react-vendor': ['react', 'react-dom'],
        },
      },
    },

    // CSS code splitting yoqilgan (default true, lekin aniq ko'rsatamiz)
    cssCodeSplit: true,

    // Source map production da kerak emas
    sourcemap: false,

    // Kichik fayllarni inline qilmaslik (< 4kb = inline, > 4kb = alohida fayl)
    assetsInlineLimit: 4096,
  },

  // Development server optimizatsiyasi
  server: {
    // HMR tezligi uchun
    hmr: { overlay: true },
  },

  // Pre-bundling optimizatsiyasi
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
})
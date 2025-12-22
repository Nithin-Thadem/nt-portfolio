import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],

  // Build optimizations
  build: {
    // Code splitting for better caching
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate Three.js core libraries
          'three-core': ['three', '@react-three/fiber'],
          // Separate Three.js utilities
          'three-utils': ['@react-three/drei', '@react-three/postprocessing'],
          // Separate animation libraries
          'animations': ['gsap', '@gsap/react'],
          // Separate React core
          'vendor': ['react', 'react-dom'],
        },
        // Better asset naming for caching
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.glb')) {
            return 'models/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        },
        chunkFileNames: 'js/[name]-[hash].js',
        entryFileNames: 'js/[name]-[hash].js',
      },
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 1000,
    // Enable source maps for debugging (disable in production if needed)
    sourcemap: false,
    // Target modern browsers for smaller bundles
    target: 'esnext',
    // Minification
    minify: 'esbuild',
  },

  // Development optimizations
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'three',
      '@react-three/fiber',
      '@react-three/drei',
      'gsap',
    ],
  },

  // Server configuration
  server: {
    // Enable HTTP/2 for faster asset loading
    cors: true,
    // Pre-bundle dependencies
    warmup: {
      clientFiles: [
        './src/App.jsx',
        './src/components/models/hero_models/HeroExperience.jsx',
      ],
    },
  },

  // Preview configuration (for production preview)
  preview: {
    port: 4173,
    strictPort: true,
  },
});

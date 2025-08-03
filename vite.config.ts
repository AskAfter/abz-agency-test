import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
    // Optimize bundle splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor libraries
          vendor: ['react', 'react-dom'],
          // UI components library
          ui: ['@radix-ui/react-toast', '@radix-ui/react-tooltip'],
          // API and data fetching
          api: ['@tanstack/react-query'],
          // Router
          router: ['react-router-dom'],
        },
      },
    },
    // Enable code splitting for better caching
    sourcemap: false, // Disable in production for smaller bundles
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true, // Remove console.logs in production
        drop_debugger: true,
      },
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
  },
  // Development optimizations
  server: {
    hmr: {
      overlay: false,
    },
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      '@tanstack/react-query',
    ],
    exclude: ['@radix-ui/react-toast', '@radix-ui/react-tooltip'],
  },
});

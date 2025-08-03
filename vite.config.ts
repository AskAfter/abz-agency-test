import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { analyzer } from "vite-bundle-analyzer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    process.env.ANALYZE && analyzer()
  ].filter(Boolean),
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
          // Router
          router: ['react-router-dom'],
        },
        // Optimize asset naming for better caching
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'assets/[name]-[hash][extname]';
          }
          return 'assets/[name]-[hash][extname]';
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
        pure_funcs: ['console.log', 'console.info'], // Remove specific console methods
        passes: 2, // Run compression twice for better results
      },
      mangle: {
        safari10: true, // Handle Safari 10 bug
      },
      format: {
        comments: false, // Remove all comments
      },
    },
    // Target modern browsers for smaller bundle
    target: 'es2020',
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Report compressed size
    reportCompressedSize: true,
  },
  // Development optimizations
  server: {
    hmr: {
      overlay: false,
    },
  },
  // CSS optimizations
  css: {
    devSourcemap: true,
    // CSS modules configuration
    modules: {
      localsConvention: 'camelCase',
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
    ],
  },
});

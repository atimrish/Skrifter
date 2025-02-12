import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'
import viteTsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      react(),
      viteTsconfigPaths()
  ],
  server: {
    host: true,
    port: 3000
  },
  resolve: {
    alias: [
      {
        find: '@pages',
        replacement: fileURLToPath(new URL('./src/components/pages', import.meta.url))
      },
      {
        find: '@components',
        replacement: fileURLToPath(new URL('./src/components', import.meta.url))
      },
      {
        find: '@assets',
        replacement: fileURLToPath(new URL('./src/assets', import.meta.url))
      },
      {
        find: '@config',
        replacement: fileURLToPath(new URL('./src/config', import.meta.url))
      },
    ]
  }
})

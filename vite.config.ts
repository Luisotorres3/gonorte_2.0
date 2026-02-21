import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  return {
    base: '/',
    plugins: [react()],
    build: {
      chunkSizeWarningLimit: 900,
      rollupOptions: {
        output: {
          // Split frequently used vendor groups to keep each chunk under the warning threshold.
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined

            if (id.includes('framer-motion')) return 'motion'
            if (id.includes('react-router-dom')) return 'router'
            if (id.includes('react-i18next') || id.includes('i18next')) return 'i18n'
            if (id.includes('react-icons')) return 'icons'
            return 'vendor'
          },
        },
      },
    },
  }
})

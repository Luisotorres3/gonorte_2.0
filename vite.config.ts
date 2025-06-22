import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // TODO: Replace 'web-template' with your actual repository name if deploying to GitHub Pages.
  // For example, if your repository is 'my-awesome-app', the base should be '/my-awesome-app/'.
  // If deploying to a custom domain or root, this can be removed or set to '/'.
  base: '/gonorte_2.0/',
  plugins: [react()],
})

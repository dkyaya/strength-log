import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// NOTE: `base` must match your GitHub repo name.
// Repo "strength-log" -> served at https://<user>.github.io/strength-log/
// If you rename the repo, change this to '/<new-name>/'.
export default defineConfig({
  plugins: [react()],
  base: '/strength-log/',
})

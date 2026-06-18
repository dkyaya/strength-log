import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Mode-aware config so the SAME source tree builds two completely
// separate static apps: the default ("fos") and a second profile
// ("her"), each with its own base path, its own public/ folder (so each
// gets its own favicon/icons/manifest), and its own accent color theme.
//
// Run with: vite build --mode fos   (default, also what `vite dev` uses)
//           vite build --mode her --outDir dist/her
//
// NOTE: `base` must match your GitHub repo name + the her-build's
// subfolder. Repo "strength-log" -> fos served at
// https://<user>.github.io/strength-log/ and her served at
// https://<user>.github.io/strength-log/her/. If you rename the repo,
// update both base values below.
export default defineConfig(({ mode }) => {
  const isHer = mode === 'her'
  return {
    plugins: [react()],
    base: isHer ? '/strength-log/her/' : '/strength-log/',
    publicDir: isHer ? 'public-her' : 'public',
    resolve: {
      alias: {
        '@theme': path.resolve(__dirname, isHer ? 'src/theme-her.css' : 'src/theme-fos.css'),
      },
    },
  }
})

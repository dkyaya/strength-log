import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// Mode-aware config so the SAME source tree builds three completely
// separate static apps: the default ("fos"), and two more profiles
// ("her", "zay"), each with its own base path, its own public/ folder
// (so each gets its own favicon/icons/manifest), and its own accent
// color theme.
//
// Run with: vite build --mode fos   (default, also what `vite dev` uses)
//           vite build --mode her --outDir dist/her
//           vite build --mode zay --outDir dist/zay
//
// NOTE: `base` must match your GitHub repo name + each profile's
// subfolder. Repo "strength-log" -> fos served at
// https://<user>.github.io/strength-log/, her at .../strength-log/her/,
// zay at .../strength-log/zay/. If you rename the repo, update every
// base value below.
//
// publicDir for zay is "public-zay" — that folder already exists with
// all the icon assets already in it. Do not rename it.
const PROFILE_PATHS = {
  her: { base: '/strength-log/her/', publicDir: 'public-her', theme: 'src/theme-her.css' },
  zay: { base: '/strength-log/zay/', publicDir: 'public-zay', theme: 'src/theme-zay.css' },
}

export default defineConfig(({ mode }) => {
  const p = PROFILE_PATHS[mode] || { base: '/strength-log/', publicDir: 'public', theme: 'src/theme-fos.css' }
  return {
    plugins: [react()],
    base: p.base,
    publicDir: p.publicDir,
    resolve: {
      alias: {
        '@theme': path.resolve(__dirname, p.theme),
      },
    },
  }
})

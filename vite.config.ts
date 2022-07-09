import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/coscup2022-survey/',
  plugins: [
    vue({
      include: [/\.vue$/]
    })
  ],
  resolve: {
    alias: {
      '@': './'
    }
  }
})

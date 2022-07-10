import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/2022-survey/',
  plugins: [
    vue({
      include: [/\.vue$/]
    })
  ],
  resolve: {
    alias: {
      '@': './'
    }
  },
  build: {
    target: ['chrome58', 'ios11', 'es2015']
  }
})

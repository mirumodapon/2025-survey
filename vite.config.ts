import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/2023-survey/',
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
    target: ['chrome58', 'ios11', 'es2015'],
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        report: resolve(__dirname, 'report/index.html')
      }
    }
  }
})

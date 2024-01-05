import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '~fonts': fileURLToPath(new URL('src/assets/fonts', import.meta.url)),
      '@src': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@screens': path.resolve(__dirname, './src/screens'),
      '@partials': path.resolve(__dirname, './src/components/partials'),
      '@modules': path.resolve(__dirname, './src/components/modules'),
      '@libs': path.resolve(__dirname, './src/libs'),
      '@plugins': path.resolve(__dirname, './src/plugins'),
      '@apps': path.resolve(__dirname, './src/apps'),
      '@store': path.resolve(__dirname, './src/store'),
      '@mixins': path.resolve(__dirname, './src/mixins'),
      '@classes': path.resolve(__dirname, './src/classes'),
      '@interfaces': path.resolve(__dirname, './src/interfaces'),
      '@data': path.resolve(__dirname, './src/data'),
      '@models': path.resolve(__dirname, './src/models'),
      '@mock': path.resolve(__dirname, './test/mock'),
      '@worker': path.resolve(__dirname, './src/worker'),
    }
  }
})

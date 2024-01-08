import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  build: {
    cssCodeSplit: true
  },
  css: {
    preprocessorOptions: {
      less: {
        globalVars: {
          globalVariables: 'true; @import "./projects/company/project/src/assets/less/variables.less";',
          globalMixins   : 'true; @import "./projects/company/project/src/assets/less/mixins.less";',
          globalFonts    : 'true; @import "./projects/company/project/src/assets/less/fonts.less";',
        },
      }
    }
  },
  resolve: {
    alias: {
      '~fonts': fileURLToPath(new URL('src/assets/fonts', import.meta.url)),
      '@'     : path.resolve(__dirname, '../../../src/'),
    }
  }
});
import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tsconfigPaths()
  ],
  build: {
    cssCodeSplit: true
  },
  css: {
    preprocessorOptions: {
      less: {
        globalVars: {
          globalVariables: 'true; @import "./projects/company/project/src/assets/less/variables.less";',
          globalMixins: 'true; @import "./projects/company/project/src/assets/less/mixins.less";',
          globalFonts: 'true; @import "./projects/company/project/src/assets/less/fonts.less";',
        },
      }
    }
  },
  resolve: {
    alias: {
      '@/*': fileURLToPath(new URL('./src', import.meta.url)),
      '~fonts': fileURLToPath(new URL('src/assets/fonts', import.meta.url)),
    }
  }
});
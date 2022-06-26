// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
    projects: [
      {
        root: './',
        // **optional** default: `[]`
        // Register globally Vue component glob.
        // If you set it, you can get completion by that components.
        // It is relative to root property.
        // Notice: It won't actually do it. You need to use `require.context` or `Vue.component`
        globalComponents: [
          {name: 'lila-button-partial', path: './src/partials/button.partial.vue'},
          {name: 'lila-link-partial', path: './src/partials/link.partial.vue'},
          {name: 'lila-accordion-partial', path: './src/partials/accordion.partial.vue'},
          {name: 'lila-picture-partial', path: './src/partials/picture.partial.vue'},
          {name: 'lila-textblock-partial', path: './src/partials/textblock.partial.vue'},
        ],
        tsconfig: "./tsconfig.json"
      }
    ]
  }
  
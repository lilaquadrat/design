import vue from 'vue';
export default class loadComponents {

  static lazy(requireModules: __WebpackModuleApi.RequireContext, folder: string) {

    requireModules.keys().forEach((filename: string) => {

      const matches = filename.match(/([a-z-]+)\.(module|partial).(vue|ts)$/i);
      const componentName = `${matches[1]}-${matches[2]}`;

      /**
         * check if file is inside of his own folder
        */
      const inFolder = filename.indexOf(`./${matches[1]}/`) === 0;
      const importPath = inFolder ? `${matches[1]}/${matches[0]}` : matches[0];

      if (folder === 'modules') {

        vue.component(
          componentName,
          () => import(/* webpackChunkName: "design-module-" */`../modules/${importPath}`),
        );

      }

      if (folder === 'partials') {

        vue.component(
          componentName,
          () => import(/* webpackChunkName: "design-partial-" */`../partials/${importPath}`),
        );

      }

    });

  }

  static sync(requireModules: __WebpackModuleApi.RequireContext, folder: string) {

    requireModules.keys().forEach((filename: string) => {

      const matches = filename.match(/([a-z-]+)\.(module|partial).(vue|ts)$/i);
      const componentName = `${matches[1]}-${matches[2]}`;

      if (folder === 'modules') {

        vue.component(
          componentName,
          requireModules(filename).default,
        );

      }

      if (folder === 'partials') {

        vue.component(
          componentName,
          requireModules(filename).default,
        );

      }

    });

  }

}

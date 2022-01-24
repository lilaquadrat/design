import log from 'loglevel';
import Vue from 'vue';
import { Route } from 'vue-router';
import Attributes from 'src/mixins/attributes';

export default (settings: any) => {

  settings.router.onReady(() => {

    log.info('%c[DESIGN]%cROUTER READY', 'background: #3f2d56; color: #CCC;', 'padding: 10px');

    let matched: any = settings.router.getMatchedComponents()[0];

    settings.router.beforeResolve((to: Route, from: Route, next: () => void) => {

      /**
         * check if the last matched component has asyncData function
        */
      const allMatched = settings.router.getMatchedComponents(to);

      matched = settings.router.getMatchedComponents(to)[allMatched.length - 1];

      try {

        if (matched.options.methods.asyncData !== 'undefined') {

          matched.options.methods.asyncData(to.params, settings.store)
            .then(() => {

              next();

            })
            .catch((error: any) => {

              log.error(error);
              next();

            });

        } else {

          next();

        }

      } catch (error) {

        next();

      }

    });

    window.dispatchEvent(new Event('hydrated'));

  });

  const APP = new Vue(settings);

  APP.$mount('#app');

  Attributes();

  log.info('%c[DESIGN]%cMOUNTED', 'background: #3f2d56; color: #CCC;', 'padding: 10px');

};

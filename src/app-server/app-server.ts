import Vue from 'vue';

import APPComponent from '@partials/appcomponent.partial.vue';
import store from 'src/store/main.store';

import 'src/mixins/leadingZero';
import 'src/mixins/toFixed';
import 'src/mixins/moment';
import 'src/mixins/formatBytes';

import translation from 'src/mixins/translation';

import loadComponents from 'src/mixins/loadComponents';
import VueRouter from 'vue-router';
import { Store } from 'vuex';
import MainStoreState from '@store/mainStoreState.interface';
import { routes } from '../routes';

translation.select('de');

Vue.use(VueRouter);

export default function createApp(): {app: Vue, router: VueRouter, store: Store<MainStoreState>} {

  const router = new VueRouter({
    routes,
    mode: 'history',
  });
  const app = new Vue({
    router,
    store,
    render: (h) => h(APPComponent),
  });

  /**
   * let webpack preload modules and partials
  */
  loadComponents.sync(require.context('../partials', true, /[a-z]\w+\.partial\.(ts|vue)$/, 'sync'), 'partials', 'lila');
  loadComponents.sync(require.context('../modules', true, /[a-z]\w+\.module\.(ts|vue)$/, 'sync'), 'modules', 'lila');

  Vue.prototype.$enviroment = 'browser';

  return { app, router, store };

}

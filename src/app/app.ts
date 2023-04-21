import Vue from 'vue';
import VueRouter from 'vue-router';
import PortalVue from 'portal-vue';

import Resize from 'src/libs/lila-resize';
import loadComponents from 'src/mixins/loadComponents';

import 'src/mixins/leadingZero';
import 'src/mixins/toFixed';
import 'src/mixins/moment';
import 'src/mixins/formatBytes';

import InitialScroll from 'src/mixins/scroll';
import translation from 'src/mixins/translation';

import APPComponent from '@partials/appcomponent.partial.vue';

import store from 'src/store/main.store';
import log from 'loglevel';
import mount from 'src/mixins/mount';
import router from 'src/mixins/router';
import ssr from 'src/mixins/ssr';
import { routes, editorRoutes } from '../routes';

/**
 *  defines the css that will be used
 */
import '../../base/lilaquadrat/base/source/less/base.less';

translation.select('de');

// eslint-disable-next-line prefer-destructuring
const currentScript: any = document.currentScript;

if (currentScript) {

  const url = new URL(currentScript.src);
  const widgetLink = url.href.substring(0, url.href.lastIndexOf('/') + 1);

  // eslint-disable-next-line camelcase
  __webpack_public_path__ = widgetLink;

}

const ENVIRONMENT = window.location.toString().match(/(editor|dist|:9001|:9000)(\/(index\.html))?/i) ? 'editor' : 'live';
const usedRoutes = ENVIRONMENT === 'editor' ? editorRoutes : routes;

// eslint-disable-next-line no-unused-expressions
ENVIRONMENT === 'editor'
  ? log.enableAll()
  : log.setLevel('warn');

Vue.use(VueRouter);
Vue.use(PortalVue);

/** APP Object for vuejs initialization */
const appObject: any = {

  render: (h: any) => h(APPComponent),

  created: () => {

    log.info('%c[DESIGN]%cCREATED', 'background: #3f2d56; color: #CCC;', 'padding: 10px');
    document.body.classList.remove('loading');

  },

  mounted: InitialScroll,
  router: router(usedRoutes),
  store,

};

/** listen to media changed after resize */
window.addEventListener('media', () => {

  store.commit('setMedia', Resize.media);

});

store.commit('setMedia', Resize.media);
/**
 * let webpack preload modules and partials
*/
loadComponents.lazy(require.context('../partials', true, /[a-z]\w+\.partial\.(ts|vue)$/, 'lazy'), 'partials', 'lila');
loadComponents.lazy(require.context('../modules', true, /[a-z]\w+\.module\.(ts|vue)$/, 'lazy'), 'modules', 'lila');

log.info(`%c[DESIGN]%cRUNNING IN ${ENVIRONMENT} MODE`, 'background: #3f2d56; color: #CCC;', 'padding: 10px');

/**
 * if we are in a editor, post settings and listen for the anwser message
 */
if (ENVIRONMENT === 'editor') {

  window.parent.postMessage('settings', '*');

  window.addEventListener(
    'message',
    (message) => {

      if (message.data.type === 'settings') {

        store.commit('setSettings', message.data.data);
        mount(appObject);

      }

    },
    false,
  );

}

/** if we are in live mode, load the ssr state and mount the app */
if (ENVIRONMENT === 'live') {

  ssr(store);
  mount(appObject);

}

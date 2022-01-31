import '/base/lilaquadrat/base/source/less/base.less';

import Vue from 'vue';
import Vuex from 'vuex';
import store from '@store/main.store';
import loadComponents from '@mixins/loadComponents';

import Resize from '@libs/lila-resize';
import Inview from '@libs/lila-inview';


import Attributes from '@mixins/attributes';
import '@mixins/leadingZero';
import translation from '@mixins/translation';
translation.select('de');

window.addEventListener('media', () => {

  store.commit('setMedia', Resize.media);

});

store.commit('setMedia', Resize.media);

Vue.use(Vuex);
Vue.prototype.$store = store;

Vue.component(
  'router-link',
  () => import(`/src/source/storybook/router-link.partial`),
);

/**
 * let webpack preload modules and partials
*/
loadComponents.lazy(require.context('/src/partials', true, /[a-z]\w+\.partial\.(ts|vue)$/, 'lazy'), 'partials');
loadComponents.lazy(require.context('/src/modules', true, /[a-z]\w+\.module\.(ts|vue)$/, 'lazy'), 'modules');

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'fullscreen'
}


Attributes();
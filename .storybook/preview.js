import '/base/lilaquadrat/base/source/less/base.less';

import Vue from 'vue';
import Vuex from 'vuex';
import PortalVue from 'portal-vue';
import store from '@store/main.store';
import loadComponents from '@mixins/loadComponents';

import Resize from '@libs/lila-resize';
import Inview from '@libs/lila-inview';

import '@libs/Models.class';
import '../base/lilaquadrat/base/models';

import Attributes from '@mixins/attributes';
import '@mixins/leadingZero';
import translation from '@mixins/translation';
import DE from '../base/lilaquadrat/base/translations/de';
translation.select('de');
translation.add(DE, 'de');


window.addEventListener('media', () => {

  console.log('MEDIA');
  store.commit('setMedia', Resize.media);

});

store.commit('setMedia', Resize.media);

Vue.use(Vuex);
Vue.use(PortalVue);
Vue.prototype.$store = store;

Vue.component(
  'router-link',
  () => import(`/src/source/storybook/router-link.partial`),
);

/**
 * let webpack preload modules and partials
*/
loadComponents.lazy(require.context('/src/partials', true, /[a-z]\w+\.partial\.(ts|vue)$/, 'lazy'), 'partials', 'lila');
loadComponents.lazy(require.context('/src/modules', true, /[a-z]\w+\.module\.(ts|vue)$/, 'lazy'), 'modules', 'lila');

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  layout: 'fullscreen'
}


Attributes();

export const decorators = [
  (story) => ({
    components: { story: story() },
    template: `
      <div>
        <story />
        <portal-target name="overlay" multiple />
      </div>
    `,
  }),
];
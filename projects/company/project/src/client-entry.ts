import { createApp, type Component } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import routes from './routes';
import createRouter from '@/mixins/createRouter';
import loadComponents from '@/mixins/loadComponents';
import translations from '@/plugins/translations';
import de from '@/translations/de';
import HelpersPlugin from '@/plugins/filters';

const globalModules: Record<string, Record<'default', Component>> = import.meta.glob('../../../../src/components/modules/*', {eager: true});
const globalPartials: Record<string, Record<'default', Component>> = import.meta.glob('../../../../src/components/partials/*', {eager: true});
const localComponents: Record<string, Record<'default', Component>> = import.meta.glob('./components/modules/*', {eager: true});
const app = createApp(App);

loadComponents(localComponents, 'lila', app);
loadComponents(globalModules, 'lila', app);
loadComponents(globalPartials, 'lila', app);

app.use(createPinia());
app.use(createRouter(routes));

app.use(translations);
app.use(HelpersPlugin);

app.config.globalProperties.$translations.add(de, 'de');
app.config.globalProperties.$translations.select('de');


app.mount('#app');
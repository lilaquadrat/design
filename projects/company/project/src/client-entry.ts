import { createApp, type Component } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import routes from '@/routes';
import createRouter from '@/mixins/createRouter';
import loadComponents from '@/mixins/loadComponents';

const globalModules: Record<string, Record<'default',Component>> = import.meta.glob('../../../../src/components/modules/*', {eager: true});
const globalPartials: Record<string, Record<'default',Component>> = import.meta.glob('../../../../src/components/partials/*', {eager: true});
const localComponents: Record<string, Record<'default',Component>> = import.meta.glob('./components/modules/*', {eager: true});
const app = createApp(App);

loadComponents(localComponents, 'lila', app);
loadComponents(globalModules, 'lila', app);
loadComponents(globalPartials, 'lila', app);

app.use(createPinia());
app.use(createRouter(routes));

app.config.globalProperties.$filters = {
    leadingZero(value: string, minLength: number) {
        return value.toString().padStart(minLength, '0');
    }
    
  };

app.mount('#app');
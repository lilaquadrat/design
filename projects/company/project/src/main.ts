import { createSSRApp } from 'vue';
import App from './App.vue';
import createRouter from '@/mixins/createRouter';
import routes from '@/routes';
import { createPinia } from 'pinia';
import translations from '@/plugins/translations'
import de from '@/translations/de';

// SSR requires a fresh app instance per request, therefore we export a function
// that creates a fresh app instance. If using Vuex, we'd also be creating a
// fresh store here.
export function createApp () {

  const app = createSSRApp(App);
  const router = createRouter(routes);

  app.use(router);
  app.use(createPinia());
  
  return { app, router };
}

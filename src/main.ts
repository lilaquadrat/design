import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue';
import routes from './routes';

import createRouter from './mixins/createRouter';
import loadComponents from './mixins/loadComponents';

const components = import.meta.glob('./components/modules/*', {eager: true});

console.log(components);

const app = createApp(App);

loadComponents(components, undefined, app);

app.use(createPinia());
app.use(createRouter(routes));

app.mount('#app');


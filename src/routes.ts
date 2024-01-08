import type { RouteRecordRaw } from 'vue-router';
import ContentView from './views/content.view.vue';

const routes: readonly RouteRecordRaw[] = [
  {
    path     : '/:pathMatch(.*)*',
    name     : 'editor',
    component: ContentView
  },
];

export default routes;

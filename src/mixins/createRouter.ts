import { createMemoryHistory, createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';


export default (routes: readonly RouteRecordRaw[]) => {

  const router = createRouter({
    history: import.meta.env.SSR
    ? createMemoryHistory('/')
    : createWebHistory('/'),
    routes
  });

  
  return router;

};
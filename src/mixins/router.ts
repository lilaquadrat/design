import VueRouter from 'vue-router';

export default (routes) => new VueRouter({
  routes,
  mode: 'history',
});

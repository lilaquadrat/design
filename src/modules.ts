import Vue from 'vue';

Vue.component(
  'blog-intro-module',
  () => import(/* webpackChunkName: "blog-intro-module-custom" */'./modules/blog-intro.module.vue'),
);

export default {
  'blog-intro-module': {
    variants: [],
  },
};

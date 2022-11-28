import ModuleScreen from '@screens/module.screen.vue';
import EditorChildScreen from '@screens/editor-child.screen.vue';

const editorRoutes = [
  {
    name: 'editor',
    path: '*',
    component: EditorChildScreen,
  },
];
const routes = [
  {
    name: 'modules',
    path: '*',
    component: ModuleScreen,
  },
];
const previewRoutes = [];

export {
  previewRoutes,
  editorRoutes,
  routes,
};

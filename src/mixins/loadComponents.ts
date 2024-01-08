import type { App, Component } from 'vue';

export default (components: Record<string, Record<'default', Component>>, namespace: string | undefined, app: App<Element>) => {

  Object.entries(components).forEach(([filename, definition]) => {

    // Get name of component, based on filename
    // "./components/Fruits.vue" will become "Fruits"
    const matches = filename.match(/([a-z-]+)\.(module|partial).(vue|ts)$/i);

    if (matches) {

      const componentName = namespace ? `${namespace}-${matches[1]}-${matches[2]}` : `${matches[1]}-${matches[2]}`;

      // Register component on this Vue instance
      app.component(componentName, definition.default);
    }
  });

};
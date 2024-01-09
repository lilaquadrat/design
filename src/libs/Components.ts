import Vue from 'vue';


class Components {

  static add (components: any, type: 'module' | 'partial', namespace?: string) {

    components.forEach((single: any) => {

      Components.single(single, type, namespace);

    });


  }

  static single (component: any, type: 'module' | 'partial', namespace?: string) {

    Vue.component(
      Components.getName(component.name, type, namespace),
      component.component,
    );

  }

  /**
   * returns the name for the components, based upon name, type and namespace
   * e.g. text, module without namespace ``text-module``
   * e.g. text, module with lila namespace ``lila-text-module``
   */
  static getName (name: string, type: 'module' | 'partial', namespace?: string) {

    return namespace ? `${namespace}-${name}-${type}` : `${name}-${type}`;

  }

  static getAvailableModules (modules: any[]) {

    return modules.map((single) => ({
      name    : `${single.name}-module`,
      variants: single.variants || [],
      editor  : single.editor || {}
    }));

  }

}

export default Components;

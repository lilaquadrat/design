import Vue from 'vue';

export default (): void => {

  Vue.directive('attributes', (el: Element, attributes: any) => {

    attributes?.value?.forEach((attribute: string) => {

      el.setAttribute(attribute, '');

    });

  });

};

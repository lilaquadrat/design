import useTranslationsStore from '@/stores/translations.store';
import type { App } from 'vue';

class TranslationPlugin {

  translations: {[key: string]: Record<string, string>} = {};

  current: string = 'en';

  store;

  constructor () {

    this.store = useTranslationsStore()

  }

  translateV2 (value: string, values?: (string|number)[]) {

    
    let returnValue: string;
    const translation = this.store.translations[this.current];

    
    if (!translation) return value;
    
    
    returnValue = translation[value]
      ? translation[value]
      : value;
    
    if (values) {

      returnValue = values.reduce((p, c) => p.replace(/%s/, c), returnValue);

    }


    return returnValue;

  }

  translateWithDiff (textToTranslate: string, value: number) {

    console.log(textToTranslate, value);

    const translation = this.store.translations[this.current];
    const type = value === 1
      ? 'singular'
      : 'plural';
    const useKey = `${textToTranslate}_${type}`;

    if (!translation) return useKey;

    const returnValue = translation[useKey]
      ? translation[useKey]
      : useKey;

    return returnValue.replace(/%s/, value.toString());

  }

  isset (key: string) {

    const translation = this.translations[this.current];

    if (!translation) return false;

    return !!translation[key];

  }

  add (translations: Record<string, string>, key: string) {
    
    this.store.add(key, translations);

  }

  extend (translations: Record<string, string>, key: string) {

    this.store.add(key, translations);

  }

  exists (key: string) {

    return !!this.translations[key];

  }

  select (key: string) {

    this.current = key;

  }

}

const plugin = {
  install: (vue: App): void => {

    const translationPlugin = new TranslationPlugin();

    vue.config.globalProperties.$translations = translationPlugin;
    vue.config.globalProperties.$translate = (value: string, values?: string[]) => translationPlugin.translateV2(value, values);
    vue.config.globalProperties.$translateWithDiff = (key: string, value: number) => translationPlugin.translateWithDiff(key, value);

    console.log('translate plugin installed');
  },
};

export default plugin;
export {
  TranslationPlugin
};

import { VueConstructor } from 'vue/types/umd';
import { Store } from 'vuex';
import MainStoreState from '@store/mainStoreState.interface';

class TranslationPlugin {

  translations: {[key: string]: Record<string, string>} = {};

  current: string = 'en';

  store: Store<MainStoreState>;

  constructor(options: { store: Store<MainStoreState> }) {

    this.store = options?.store;

  }

  translate(value: string, key?:string, hint?: string, values?: (string|number)[]) {

    let returnValue: string;
    const translation = key && this.exists(key)
      ? this.translations[key]
      : this.translations[this.current];

    if (!translation) return value;

    if (hint) {

      if (translation[hint]) {

        returnValue = translation[hint][value]
          ? translation[hint][value]
          : value;

      } else {

        returnValue = value;

      }

    } else {

      returnValue = translation[value]
        ? translation[value]
        : value;

    }

    if (values) {

      returnValue = values.reduce((p, c) => p.replace(/%s/, c), returnValue);

    }


    return returnValue;

  }

  translateV2(value: string, values?: (string|number)[]) {


    let returnValue: string;
    const translation = this.store.state.Translations.translations[this.current];


    if (!translation) return value;


    returnValue = translation[value]
      ? translation[value]
      : value;

    if (values) {

      returnValue = values.reduce((p, c) => p.replace(/%s/, c), returnValue);

    }


    return returnValue;

  }

  translateWithDiff(textToTranslate: string, value: number) {

    console.log(textToTranslate, value);

    const translation = this.store.state.Translations.translations[this.current];
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

  isset(key: string) {

    const translation = this.translations[this.current];

    if (!translation) return false;

    return !!translation[key];

  }

  add(translations: Record<string, string>, key: string) {

    this.store.commit('Translations/add', { key, translations });

  }

  extend(translations: Record<string, string>, key: string) {

    this.store.commit('Translations/extend', { key, translations });

  }

  exists(key: string) {

    return !!this.translations[key];

  }

  select(key: string) {

    this.current = key;

  }

}

const plugin = {
  install: (vue: VueConstructor, options: { store: Store<MainStoreState> }): void => {

    const translationPlugin = new TranslationPlugin(options);

    vue.prototype.$translations = translationPlugin;
    vue.prototype.$translate = (value: string, values?: string[]) => translationPlugin.translateV2(value, values);
    vue.prototype.$translateWithDiff = (key: string, value: number) => translationPlugin.translateWithDiff(key, value);

  },
};

export default plugin;
export {
  TranslationPlugin,
};

import GenericStore from '@interfaces/GenericStore.interface';
import hardCopy from '@mixins/hardCopy';
import TranslationsStoreState from './TranslationsStoreState.interface';

const TranslationsStore: GenericStore<TranslationsStoreState> = {


  namespaced: true,
  strict: true,

  state: {
    translations: {},
  },

  mutations: {

    add(state, data: {key: string, translations: Record<string, string>}) {

      const base = hardCopy(state.translations);

      state.translations = base;
      base[data.key] = { ...base[data.key], ...data.translations };

      state.translations = base;

    },

    extend(state, data: {key: string, translations: Record<string, string>}) {

      const base = hardCopy(state.translations);

      state.translations = base;
      base[data.key] = { ...base[data.key], ...data.translations };

      state.translations = base;

    },

  },

  actions: {},

};

export default TranslationsStore;

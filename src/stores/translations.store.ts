// import GenericStore from '@interfaces/GenericStore.interface';
// import hardCopy from '@mixins/hardCopy';
// import TranslationsStoreState from './TranslationsStoreState.interface';

// const ProjectStore: GenericStore<TranslationsStoreState> = {


//   namespaced: true,
//   strict: true,

//   state: {
//     translations: {}
//   },

//   mutations: {

//     add(state, data: {key: string, translations: Record<string, string>}) {

//       const base = hardCopy(state.translations);

//       console.log('EXTEND', data.key, data.translations);

//       state.translations = base;
//       base[data.key] = { ...base[data.key], ...data.translations };

//       state.translations = base;

//     },

//     extend(state, data: {key: string, translations: Record<string, string>}) {

//       const base = hardCopy(state.translations);

//       console.log('EXTEND', data.key, data.translations);

//       state.translations = base;
//       base[data.key] = { ...base[data.key], ...data.translations };

//       state.translations = base;

//     }

//   },

//   actions: {},

// };

// export default ProjectStore;

import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTranslationsStore = defineStore('translations', () => {

  const translations = ref<Record<string, Record<string, string>>>({});

  function add (key: string, value: Record<string, string>) {

    translations.value[key] = {...translations.value[key], ...value};

  }

  return { 
    add,
    translations
  }

})


export default useTranslationsStore;
import { TranslationPlugin } from 'src/plugins/translations';

declare module 'vue/types/vue' {
    interface Vue {
      $translate: TranslationPlugin['translate']
      $translateWithDiff: TranslationPlugin['translateWithDiff']
    }
  }

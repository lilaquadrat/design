import { TranslationPlugin } from '@plugins/translations';

declare module 'vue/types/vue' {
    interface Vue {
      $translate: TranslationPlugin['translateV2']
      $translateWithDiff: TranslationPlugin['translateWithDiff']
    }
  }

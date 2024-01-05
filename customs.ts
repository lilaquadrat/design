import type { HelpersPlugin } from '@/plugins/filters'
import type { TranslationPlugin } from '@/plugins/translations'

// Works correctly
export {}

declare module 'vue' {
  interface ComponentCustomProperties {
    $translations: TranslationPlugin
    $translate: TranslationPlugin['translateV2']
    $translateWithDiff: TranslationPlugin['translateWithDiff']
    $helpers: typeof HelpersPlugin
  }
}
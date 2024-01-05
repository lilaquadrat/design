import useTranslationsStore from '@/stores/translations.store';
import type { App } from 'vue';

const HelpersPlugin = {

  leadingZero (value: string, minLength: number) {
    return value.toString().padStart(minLength, '0');
  }

}
const plugin = {
  install: (vue: App): void => {

    vue.config.globalProperties.$helpers = HelpersPlugin;
    console.log('helpers plugin installed');
  },
};

export default plugin;
export {
  HelpersPlugin
};

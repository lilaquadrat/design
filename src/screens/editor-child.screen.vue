<template>
  <article class="editor-screen screen">

    <content-module :data="contentMerged"></content-module>

    <transition mode="out-in" name="overlay">
      <overlay-partial v-if="$store.state.overlay.active"></overlay-partial>
    </transition>

  </article>

</template>
<script lang="ts">
import { ExtComponent, Component, vue } from '@libs/lila-component';
import { Editor, ModuleGeneric } from '@lila2/studio/lib/interfaces';
import log from 'loglevel';

@Component
export default class EditorChildScreen extends ExtComponent {

  modules: {
    [key: string]: any;
  } = {};

  editor: ModuleGeneric[] = [];

  siteSettings: Editor['settings'] = {};

  created: boolean = false;

  live: boolean = false;

  parentUrl: string;

  constructor() {

    super();

    this.parentUrl = `${window.location.protocol}//${window.location.host}/editor`;

    if (window.origin === 'null') {

      this.live = true;

    }

  }

  mounted() {

    if (this.live) return;

    const messageHandler = (message: any) => {

      if (message.data.type === 'studio-content') this.editor = message.data.data || [];

      if (message.data.type === 'studio-editor-settings') this.siteSettings = message.data.data;

      if (message.data.type === 'studio-settings') this.$store.commit('setSettings', message.data.data);

      if (message.data.type === 'studio-active') {

        this.active = message.data.data;

        if (this.active.uuid) {

          this.scrollToModule(this.active);

        }

      }

    };

    window.removeEventListener(
      'message',
      messageHandler,
      false,
    );

    window.addEventListener(
      'message',
      messageHandler,
      false,
    );

    window.parent.postMessage('studio-design-ready', '*');

  }

  get active(): {uuid?: string, position?: string} {

    return this.$store.state.editor.active;

  }

  set active(active: {uuid?: string, position?: string}) {

    this.$store.commit('setEditorActive', active);

  }

  get content() {

    return this.editor.filter((single) => !single.position || single.position === 'content');

  }

  get top() {

    return this.editor.filter((single) => single.position === 'top');

  }

  get bottom() {

    return this.editor.filter((single) => single.position === 'bottom');

  }

  get contentMerged() {

    return {
      settings: this.siteSettings.settings || {},
      top: this.editor.filter((single) => single.position === 'top'),
      content: this.editor.filter((single) => !single.position || single.position === 'content'),
      bottom: this.editor.filter((single) => single.position === 'bottom'),
    };

  }

  get tags() {

    return this.siteSettings.tags;

  }

  get mode() {

    return this.siteSettings?.settings?.mode;

  }

  /**
   * scroll to the module in the content-container with the given index
   *
   * @param {number} index
   * @memberof EditorEditScreen
   */
  // eslint-disable-next-line class-methods-use-this
  scrollToModule(active: {uuid?: string, position?: string}): void {

    vue.nextTick().then(() => {

      const containerSelector = active.position === 'content' ? '.content-module .container:nth-child(2)' : `.content-module .container.${active.position}`;
      const contentPosition = active.position === 'content' ? this.content : this[active.position];
      const index = contentPosition.findIndex((single) => single.uuid === active.uuid);
      const module = document.querySelector(
        // eslint-disable-next-line max-len
        `${containerSelector} .module:nth-child(${index + 1}), ${containerSelector} .partial-container:nth-child(${index + 1})`,
      );

      if (!module) return;

      module.scrollIntoView({
        behavior: 'smooth',
      });

    });

  }

}
</script>

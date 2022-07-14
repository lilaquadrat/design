<template>
  <article class="editor-screen screen">

    <lila-content-module :content="content"></lila-content-module>

  </article>

</template>
<script lang="ts">
import { ExtComponent, Component, vue } from '@libs/lila-component';
import { Editor, EditorActiveModule, StudioIframeMessage } from '@lilaquadrat/studio/lib/interfaces';
import { prepareContent } from '@lilaquadrat/studio/lib/frontend';
import ContentPrepared from '@lilaquadrat/studio/lib/src/interfaces/ContentWithPositions.interface';

@Component
export default class EditorChildScreen extends ExtComponent {

  content: ContentPrepared = {
    settings: {}, top: [], content: [], bottom: [],
  };

  siteSettings: Editor['settings'] = {};

  live: boolean = false;

  parentUrl: string;

  contentCache: Editor['modules'] = [];

  settingsCache: Editor['settings'] = {};

  constructor() {

    super();

    this.parentUrl = `${window.location.protocol}//${window.location.host}/editor`;

    if (window.origin === 'null') {

      this.live = true;

    }

  }

  mounted() {

    if (this.live) return;

    const messageHandler = (message: StudioIframeMessage<Editor['modules']|Editor['settings']|EditorActiveModule>) => {

      if (message.data.type === 'studio-content') {

        this.contentCache = message.data.data as Editor['modules'];
        this.updateContent();

      }

      if (message.data.type === 'studio-editor-settings') {

        this.settingsCache = message.data.data as Editor['settings'];
        this.updateContent();

      }

      if (message.data.type === 'studio-settings') this.$store.commit('setSettings', message.data.data);

      if (message.data.type === 'studio-active') {

        this.active = message.data.data as EditorActiveModule;

        console.log(this.active);

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

    window.parent.postMessage({ type: 'studio-design-modules', data: this.$store.state.availableModules }, '*');
    window.parent.postMessage('studio-design-ready', '*');

  }

  get active(): EditorActiveModule {

    return this.$store.state.editor.active;

  }

  set active(active: EditorActiveModule) {

    this.$store.commit('setEditorActive', active);

  }

  updateContent() {

    this.content = prepareContent({ modules: this.contentCache, ...this.settingsCache });


  }

  /**
   * scroll to the module in the content-container with the given index
   */
  // eslint-disable-next-line class-methods-use-this
  scrollToModule(active: EditorActiveModule): void {

    vue.nextTick().then(() => {

      const baseModule = this.contentCache.find((single) => single.uuid === this.active.uuid);
      const containerSelector = baseModule.position === 'content' || !baseModule.position ? '.lila-content-module .container:not(.top, .bottom)' : `.lila-content-module .container.${baseModule.position}`;
      const contentPosition: Editor['modules'] = baseModule.position === 'content' || !baseModule.position ? this.content.content : this.content[baseModule.position];
      const index = contentPosition?.findIndex((single) => single.uuid === active.uuid);

      if (!index && index !== 0) return;

      const module = document.querySelector(
        // eslint-disable-next-line max-len
        `${containerSelector} .lila-module:nth-child(${index + 1}), ${containerSelector} .partial-container:nth-child(${index + 1})`,
      );

      if (!module) return;

      module.scrollIntoView({
        behavior: 'smooth',
      });

    });

  }

}
</script>

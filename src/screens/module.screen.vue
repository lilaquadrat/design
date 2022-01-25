<template>
    <article class="module-screen screen">

    <content-module :data="contentMerged"></content-module>

    <transition mode="out-in" name="overlay">
        <overlay-partial v-if="$store.state.overlay.active"></overlay-partial>
    </transition>

</article>
</template>
<script lang="ts">
import {
  ExtComponent, Component, Watch,
} from '@libs/lila-component';
import { filterMergeModules } from '@lilaquadrat/studio/lib/src/frontend/main';

@Component
export default class ModuleScreen extends ExtComponent {

  link: string = '';

  @Watch('$route')
  onRouteChange() {

    this.changeContent();

  }

  created() {

    this.changeContent();

  }

  get modules() {

    if (this.$store.state.data.status === 404) {

      this.$router.push({ name: 'notfound' });
      return {};

    }

    return this.$store.state.data.modules;

  }

  get content() {

    return filterMergeModules(this.$store.state.data.modules, 'content', this.$store.state.layout?.modules, 'layout');

  }

  get contentTop() {

    return filterMergeModules(this.$store.state.data.modules, 'top', this.$store.state.layout?.modules, 'layout');

  }

  get contentBottom() {

    return filterMergeModules(this.$store.state.data.modules, 'bottom', this.$store.state.layout?.modules, 'layout');

  }

  get contentMerged() {

    return {
      settings: this.$store.state.data.settings,
      top: filterMergeModules(this.$store.state.data.modules, 'top', this.$store.state.layout?.modules, 'layout'),
      content: filterMergeModules(this.$store.state.data.modules, 'content', this.$store.state.layout?.modules, 'layout'),
      bottom: filterMergeModules(this.$store.state.data.modules, 'bottom', this.$store.state.layout?.modules, 'layout'),
    };

  }

  get tags() {

    return this.$store.state.data.settings.tags;

  }

  get mode() {

    return this.$store.state.data.settings?.mode;

  }

  changeContent() {

    if (!this.isNode) {

      if (!this.$store.state.inited) {

        this.asyncData(this.$route.params, this.$store)
          .then(() => {
          // this.data = this.$store.state.data;
          });

      } else {
        // this.data = this.$store.state.data;
      }

      // this.DOM.title = this.$store.state.data.title;

    } else {

      // console.log(this.$store.state.data);

      // if (this.$store.state.data) this.data = this.$store.state.data;
      // this.link = this.$route.params.link;

    }

  }

  asyncData(params: any, store?: any): Promise<any> {

    let realParams: {[key: string]: string} = {};

    realParams = !params.link
      ? { link: 'home' }
      : params;

    return store.dispatch('getContent', realParams, store);

  }

}

</script>

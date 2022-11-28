<template>
    <article class="module-screen screen">

    <lila-content-module :content="contentMerged" />

    <transition mode="out-in" name="overlay">
        <lila-overlay-partial v-if="$store.state.overlay.active" />
    </transition>

</article>
</template>
<script lang="ts">
import {
  ExtComponent, Component, Watch,
} from '@libs/lila-component';
import { prepareContent } from '@lilaquadrat/studio/lib/frontend';
import MainStoreState from '@store/mainStoreState.interface';
import { Route } from 'vue-router';
import { Store } from 'vuex';

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

  get contentMerged() {

    return prepareContent(this.$store.state.data);

  }

  get tags() {

    return this.$store.state.data.settings.tags;

  }

  get mode() {

    return this.$store.state.data.settings?.mode;

  }

  changeContent() {

    if (typeof window !== 'undefined') {

      if (!this.$store.state.inited) {

        this.asyncData(this.$route.params, this.$store)
          .then(() => true);

      }

    }


  }

  asyncData(params: Route['params'], store?: Store<MainStoreState>): Promise<unknown> {

    if (this.link === params.link) return Promise.resolve();

    let realParams: Route['params'] = {};

    realParams = !params.link
      ? { link: 'home' }
      : params;

    this.link = realParams.link;

    return store.dispatch('getContent', realParams);

  }

}

</script>

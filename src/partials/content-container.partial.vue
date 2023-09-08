<template>
  <component :is="overlay ? 'portal' : 'section'" to="overlay">
    <transition>
      <section class="content-container" ref="container" @keyup="closeOutside" @click="closeOutside"
        v-if="visible || !overlay" :class="{ overlay: overlay, visible: visible }">
        <slot v-if="!id" />

        <section v-if="!error" class="content-position-container">
          <content-head-partial v-if="(id || latest) && content" @close="close">{{ content.settings.title
          }}</content-head-partial>
          <lila-content-module v-if="(id || latest) && content" :content="content" :inline="overlay ? false : true" />
        </section>

        <section v-if="error" class="content-position-container">
          <content-head-partial @close="close">{{ $translate('CONTENT_NOT_FOUND') }}</content-head-partial>
          <lila-content-module :content="errorContent" :inline="overlay ? false : true" />
        </section>

      </section>
    </transition>

  </component>
</template>
<script lang="ts">
import { ExtPartial, Prop } from '@libs/lila-partial';
import Component from 'vue-class-component';
import { ExtComponent, Watch } from '@libs/lila-component';
import translate from '@mixins/translation';
import { prepareContent } from '@lilaquadrat/studio/lib/frontend';
import ContentPrepared from '@lilaquadrat/studio/lib/src/interfaces/ContentPrepared.interface';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Component
export default class contentContainerPartial extends ExtPartial {

  @Prop(Boolean) overlay: boolean;

  @Prop(Boolean) visible: boolean;

  @Prop(String) id: string;

  @Prop(String) type: string;

  @Prop(Array) category: string[];

  @Prop(Boolean) latest: boolean;

  content: ContentPrepared = null;

  error: boolean = null;

  errorContent = {
    settings: {},
    top: [],
    content: [
      {
        type: 'lila-text-module',
        variant: ['center'],
        headline: translate.translate('Something went wrong'),
        intro: translate.translate('The content is missing'),
      },
    ],
    bottom: [],
  };

  @Watch('visible')
  watchVisible(visible: boolean) {

    if (visible) this.getContent();

  }

  get getSlotTrigger() {

    return !!this.$slots.default && !!this.id;

  }

  mounted() {

    console.log(this.getSlotTrigger);

    if (this.id && !this.getSlotTrigger) {

      this.getContent();

    }

  }

  getContent() {

    this.error = null;

    const query: Record<string, string | string[] | boolean> = {};

    if (this.id) query.id = this.id;
    if (this.category) query.category = this.category;
    if (this.latest) query.latest = true;
    if (this.type) query.type = this.type;

    this.$store.dispatch('Content/get', query)
      .then((data) => {

        console.log(data);

        this.content = prepareContent(data);

      })
      .catch(() => {

        this.content = null;
        this.error = true;

      });

  }

  closeOutside(event) {

    if (event.target === this.$refs.container) this.close();

  }

  close() {

    this.$emit('closed');

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.content-container {

  width: 100%;

  &.overlay {

    opacity: 1;
    transition: opacity .2s @aType;

    &.v-leave-active,
    &.v-enter-active {
      opacity: 0;

      &.overlay::v-deep {
        .content-position-container {
          transform: scale(.95);
        }
      }

    }
  }

  &.overlay::v-deep {

    background-color: rgba(0, 0, 0, 0.5);

    position: absolute;
    width: 100%;
    height: 100%;
    display: grid;

    .index(11);

    top: 0;
    left: 0;

    padding: 0;

    .content-position-container {
      transform: scale(1);
      transition: transform .2s @aType;
      height: 100%;
      width: 100%;
      overflow: hidden;
      display: grid;
      grid-template-rows: 35px calc(100vh - 35px);
      .index(12);

      @media @desktop {
        max-width: @moduleWidth_S;
        height: 80%;
      }

      @media @wide {
        max-width: @moduleWidth_M;
        height: 80%;
      }

      margin: auto;
      background-color: @white;

    }

    .content-module {
      height: 100%;
      width: 100%;
      overflow-y: scroll;
      background-color: @white;

    }
  }

}
</style>

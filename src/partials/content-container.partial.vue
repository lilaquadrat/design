<template>
  <section class="content-container-full" :class="{ overlay: overlay, inline: !overlay, full: full, visible: visible }">
    <button v-if="overlay" class="preview-text" type="button" @click="open"> <slot /> </button>

    <component :is="overlay ? 'portal' : 'section'" to="overlay">
      <transition>
        <section class="content-container" ref="container" v-if="visible || !overlay" :class="{ overlay: overlay, visible: visible }">

          <button v-if="overlay" class="closeOutside" type="button" @keyup="close" @click="close" />

          <section class="content-position-container">
            <lila-content-head-partial @close="close" :hideButton="!overlay">
              <template v-if="content && loading > 100">{{ content.settings.title }}</template>
              <template v-if="loading > 400">CONTENT_NOT_FOUND</template>
              <template v-if="loading === 100">CONTENT_LOADING</template>
            </lila-content-head-partial>
            <section class="scroll-container">
              <lila-indicator-partial v-if="loading === 100">LOADING</lila-indicator-partial>
              <lila-content-module v-if="loading > 100 && (error || content)" :content="error ? errorContent : content" :inline="!overlay" />
            </section>
          </section>

        </section>
      </transition>

    </component>
  </section>
</template>
<script lang="ts">
import { ExtPartial, Prop } from '@libs/lila-partial';
import Component from 'vue-class-component';
import { Watch } from '@libs/lila-component';
import translate from '@mixins/translation';
import ContentPrepared from '@lilaquadrat/studio/lib/src/interfaces/ContentPrepared.interface';
import StudioSDK, { SDKResponse } from '@libs/StudioSDK';
import { prepareContent } from '@lilaquadrat/studio/lib/frontend';
import { Editor } from '@lilaquadrat/studio/lib/interfaces';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
@Component
export default class contentContainerPartial extends ExtPartial {

  @Prop(Boolean) overlay: boolean;

  @Prop(String) id: string;

  @Prop(String) type: string;

  @Prop(Array) category: string[];

  @Prop(Boolean) latest: boolean;

  @Prop(Boolean) predefined: boolean;

  @Prop(Boolean) full: boolean;

  content: ContentPrepared = null;

  error: boolean = true;

  visible: boolean = false;

  loading: number = 0;

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

    if (this.id || this.latest) {

      this.getContent();

    }

  }

  async getContent() {

    this.error = null;
    this.content = null;
    this.loading = 100;

    let data: SDKResponse<Editor> = null;
    const sdk = new StudioSDK(
      'design',
      {
        customEndpoints: { api: 'http://localhost:9090', media: '' },
        company: 'lilaquadrat',
        project: 'homepage',
      },
    );

    console.log(this.predefined, this.latest, this.category);


    try {

      if (this.predefined && !this.latest) {

        data = await sdk.public.content.predefined(this.id);

      } else if (this.predefined && this.latest) {

        data = await sdk.public.content.predefinedLatest(this.category);

      } else {

        data = await sdk.public.content.getByInternalId(this.id);

      }

    } catch (error) {

      this.content = null;
      this.error = true;
      this.loading = 404;

    }


    if (data) this.content = prepareContent(data.data);
    this.loading = 200;


  }

  closeOutside(event) {

    if (event.target === this.$refs.container) this.close();

  }

  open() {

    this.$emit('open');
    this.visible = true;

  }

  close() {

    this.$emit('closed');
    this.visible = false;

  }

}
</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.content-container-full {
  display: inline;

  &.inline {
    width: 100%;
  }

  .preview-text {
    margin: 0;
    padding: 0;
    border: none;

    background: none;
    color: inherit;
    outline: none;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    text-align: inherit;
    text-decoration: underline;
    cursor: pointer;

  }

}

.content-container {

  width: 100%;

  .closeOutside {
    position: fixed;
    width: 100%;
    height: 100%;

    margin: 0;
    padding: 0;
    border: 0;
    border: none;

    background: none;
    color: inherit;
    outline: none;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    text-align: inherit;
    cursor: pointer;
  }

  .content-position-container {
    display: grid;
    grid-template-rows: min-content 1fr;
    min-height: 250px;
    background-color: @white;

    .scroll-container {
      display: grid;
      overflow-y: scroll;
      max-height: 35vh;

      .loading-indicator {
        position: absolute;
        display: grid;
        align-self: center;
        justify-self: center;
      }
    }
  }

  &.overlay::v-deep {

    position: fixed;

    top: 0;
    left: 0;
    display: grid;
    width: 100%;
    height: 100%;

    padding: 0;

    background-color: rgba(0, 0, 0, .5);

    .index(11);

    .content-position-container {
      .index(12);
      display: grid;
      grid-template-rows: 35px 1fr;
      overflow: hidden;
      width: 100%;
      height: 100%;

      margin: auto;
      background-color: @white;
      transition: transform .2s @aType;
      transform: scale(1);

      @media @desktop {
        max-width: @moduleWidth_S;
        height: 80%;
      }

      @media @wide {
        max-width: @moduleWidth_M;
        height: 80%;
      }

      .scroll-container {
        overflow-y: scroll;
        max-height: 100%;
      }

    }

  }

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

}
</style>

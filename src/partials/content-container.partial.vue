<template>
  <section class="content-container-full">

    <button class="preview-text" type="button" @click="open"> <slot /> </button>
    1{{ id }}1
    2{{ error }}2
    3{{ predefined }}3

    <portal to="overlay">
      <transition>
        <section class="content-container" ref="container" v-if="visible || !overlay" :class="{ overlay: overlay, visible: visible }">

          <button class="closeOutside" type="button" @keyup="close" @click="close" />


            <section v-if="!error" class="content-position-container">
              <lila-content-head-partial v-if="(id || latest) && content" @close="close">{{ content.settings.title }}</lila-content-head-partial>
              <lila-content-module v-if="(id || latest) && content" :content="content" :inline="overlay ? false : true" />
            </section>

            <section v-if="error" class="content-position-container">
              <lila-content-head-partial @close="close">CONTENT_NOT_FOUND</lila-content-head-partial>
              <!-- <lila-content-head-partial @close="close">{{ $translate('CONTENT_NOT_FOUND') }}</lila-content-head-partial> -->
              <lila-content-module :content="errorContent" :inline="overlay ? false : true" />
            </section>

        </section>
      </transition>

    </portal>
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

  content: ContentPrepared = null;

  error: boolean = true;

  visible: boolean = false;

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

  async getContent() {

    this.error = null;

    let data: SDKResponse<Editor> = null;
    const query: Record<string, string | string[] | boolean> = {};

    if (this.id) query.id = this.id;
    if (this.category) query.category = this.category;
    if (this.latest) query.latest = true;
    if (this.type) query.type = this.type;

    const sdk = new StudioSDK(
      'design',
      {
        customEndpoints: { api: 'http://localhost:9090', media: '' },
        company: 'lilaquadrat',
        project: 'homepage',
      },
    );


    try {

      if (this.predefined) {

        data = await sdk.public.content.predefined(this.id);

      } else {

        data = await sdk.public.content.getByInternalId(this.id);

      }

    } catch (error) {

      this.content = null;
      this.error = true;

    }


    console.log(data);

    this.content = prepareContent(data.data);


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
    cursor: pointer;
    text-decoration: underline;

  }

}

.content-container {

  width: 100%;

  .closeOutside {
    position: absolute;
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

    position: absolute;

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
      grid-template-rows: 35px calc(100vh - 35px);
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

    }

    .content-module {
      overflow-y: scroll;
      width: 100%;
      height: 100%;
      background-color: @white;

    }
  }

}
</style>

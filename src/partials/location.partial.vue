<template>
  <section class="lila-location-partial" :class="[variant, loadIframe]">
    <div class="iframe-container">
      <div class="iframe" v-if="loadIframe">
        <iframe ref="iframeElement" title="iframe" :src="src" :width="width" :height="height"> </iframe>
      </div>
      <div v-if="!loadIframe" class="confirmIframe">
        <lila-textblock-partial v-bind="textblock" />
      <lila-button-group-partial center>
        <lila-button-partial  colorScheme="colorScheme1" @confirmed="loadIframeElement">
          {{ showMaps }}
        </lila-button-partial>
      </lila-button-group-partial>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Textblock from '@interfaces/textblock.interface';
import { Component, Prop } from '@libs/lila-component';
import { ExtPartial } from '@libs/lila-partial';


@Component
export default class LocationPartial extends ExtPartial {

  $refs: {
    iframeElement: HTMLIFrameElement;
  };

  @Prop(Object) textblock: Textblock;

  @Prop(String) showMaps: string;

  @Prop(String) src: string;

  @Prop(String) height?: string;

  @Prop(String) width?: string;

  loadIframe: boolean = false;

  loadIframeElement(): void {

    this.loadIframe = true;

  }

  get iframeItem() {

    return this.$refs.iframeElement as HTMLIFrameElement;

  }

  get mapType() {

    return this.src?.match('^https://(www.)?google.com/maps') ? 'google.com/maps' : 'basic';

  }

  get mapId() {

    if (this.mapType !== 'google.com/maps') return false;

    return this.src;

  }

  mapSettings() {

    if (this.mapType !== 'google.com/maps') return false;

    return {
      src: this.src,
      height: '100%',
      width: '100%',

    };

  }

}
</script>

<style lang="less">
@import (reference) "@{projectPath}/source/less/shared.less";

.lila-location-partial {
  position: relative;

  .confirmIframe {
    display: grid;
    align-content: center;
    justify-content: center;
    justify-self: center;
    .multi(padding,20);
    text-align: center;
    background: @color2;
    gap:20px;

  }

  .iframe {
    padding-top: 75%;

    iframe {
      display: block;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      border: 0;

    }

  }

  &.square {
    .iframe {
      padding-top: 100%;
    }

  }
}
</style>

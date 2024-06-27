<template>
  <section class="lila-location-partial" :class="[variant, loadIframe]">
    <div class="iframe" v-if="loadIframe">
      <iframe ref="iframeElement" title="iframe" :src="src"></iframe>
    </div>

    <section v-if="!loadIframe" class="confirm-container">
      <lila-button-partial class="activate-map-button" colorScheme="colorScheme1" @confirmed="loadIframeElement">
        {{ $translate('location_module_show_map') }}
      </lila-button-partial>
    </section>
  </section>
</template>

<script lang="ts">
import { Component, Prop } from '@libs/lila-component';
import { ExtPartial } from '@libs/lila-partial';

@Component
export default class LocationPartial extends ExtPartial {

  $refs: {
    iframeElement: HTMLIFrameElement;
  };

  @Prop(String) src: string;

  loadIframe: boolean = false;

  loadIframeElement(): void {

    this.loadIframe = true;

  }

  get iframeItem() {

    return this.$refs.iframeElement as HTMLIFrameElement;

  }

  get mapType() {

    return this.src?.match('^https://(www.)?google.com/maps')
      ? 'google.com/maps'
      : 'basic';

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

  .confirm-container {
    position: relative;
    display: grid;
    align-content: end;

    justify-content: center;
    background: @grey2;
    text-align: center;
    aspect-ratio: 5/4;

    .activate-map-button {
      position: absolute;
      align-self: center;
      justify-self: center;
    }
  }

  .iframe {
    position: relative;
    display: block;
    aspect-ratio: 5/4;
    width: 100%;

    iframe {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      display: block;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }

}
</style>

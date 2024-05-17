<template>
  <section class="lila-location-partial" :class="[variant, loadIframe]">
    <div class="iframe">
      <iframe ref="iframeElement" v-if="loadIframe" title="iframe" :src="src" :width="width" :height="height"> </iframe>
    </div>
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

  @Prop(String) height?: string;

  @Prop(String) width?: string;

  loadIframe: boolean = false;


  constructor() {

    super();


    if (this.$store?.state) {

      this.loadIframe = true;

    }

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

  .iframe {
    position: relative;
    width: 100%;
    max-width: 100%;
    height: auto;
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
      position: relative;
      min-width: 500px;
      max-width: 100%;
      padding-top: 100%;
    }
  }
}
</style>

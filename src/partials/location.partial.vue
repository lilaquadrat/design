<template>
  <section class="lila-location-partial" :class="[variant, loadIframe]">
    <div class="iframe" v-if="loadIframe">
      <iframe ref="iframeElement" title="iframe" :src="src" :width="width" :height="height">
      </iframe>
    </div>

    <section v-if="!loadIframe" class="confirm-container">
      <div class="text-container">
        <lila-textblock-partial v-bind="textblock" />
        <lila-button-group-partial center class="buttongroup">
          <lila-button-partial colorScheme="colorScheme1" @confirmed="loadIframeElement">
            {{ showMaps }}
          </lila-button-partial>
        </lila-button-group-partial>
      </div>
    </section>
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
  min-width: 500px;

  .confirm-container {
    text-align: center;
    align-content: end;
    justify-content: center;
    height: 0;

    padding-top: 56.25%;
    /* Aspect Ratio 16:9 */
    position: relative;
    // background: @color2;backgroundbackground => unser Grauton unterscheidet sich vom GoogelMaps Original Grauton
    background: #e2e3dd; // Google Maps original Grauton

    .text-container {
      position: absolute;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);

      .buttongroup {
        .multi(padding-top, 4);
      }
    }
  }

  .iframe {
    padding-top: 56.25%;
    position: relative;
    display: block;

    iframe {
      display: block;
      border: 0;
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 100%;
    }
  }

  &.square {
    .confirm-container {
      padding-top: 100%;

    //   .text-container {
    //   top: 45%;
    // }
    }

    .iframe {
      padding-top: 100%;
    }
  }
}
</style>

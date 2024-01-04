<template>
  <section ref="el" :id="id" @click="trigger" @keypress="trigger" :class="[variant, view, { started, controls }]"
    class="lila-video-module lila-module">

    <section class="video-container">

      <lila-video-partial :trigger="clickEvent" v-bind="video" @playing="toggle" @ended="ended" />

      <section class="position-container" :class="{ visible: !playing }">
        <lila-textblock-partial v-if="textblock" v-bind="textblock" :variant="variant" />
      </section>

      <lila-picture-partial class="posterExt" v-if="hasPoster" :class="{ visible: !playing }" v-bind="poster" />

    </section>

  </section>
</template>
<script setup lang="ts">
import checkInview from '../../mixins/checkin';
import type Picture from '@interfaces/picture.interface';
import type Textblock from '@interfaces/textblock.interface';
import type Video from '@interfaces/video.interface';
import { computed, onMounted, ref } from 'vue';

const props = defineProps<{
  poster: Picture;

  textblock: Textblock;

  video: Video;

  js: boolean;
  id?:string;
  view?: string;
  variant: string[];
}>();
let clickEvent: boolean = false;
let playing: boolean = false;
let started: boolean = false;
let el = ref(null);

onMounted((): void =>{

  checkInview(el);

});


function trigger(): void {

  clickEvent = !clickEvent;

}

function toggle(event: boolean): void {

  started = true;
  playing = event;

}

function ended(): void {

  started = false;

}

  const hasPoster=computed(()=>{

  return !!props.poster?.src;

});
  const controls=computed((): boolean|undefined =>{

  return props.video?.attributes?.includes('controls');

});


</script>
<style lang="less" scoped>

.lila-video-module {
  .module;
  max-width: @moduleWidth_M;
  margin: auto;

  .modulePadding('none');

  &.bright {

    .video-container {

      h1,
      h2 {
        color: @white;
      }
    }
  }

  &.controls {

    &.started {

      .posterExt,
      .position-container {
        display: none;
      }
    }
  }

  &.small {

    max-width: @moduleWidth_S;

    .textblock {
      .modulePadding('full');
    }

  }

  &.fullscreen {
    width: 100%;
    max-width: 100%;
    height: 100vh;

    padding: 0;

    .video-container {

      position: relative;

      grid-area: unset;
      overflow: hidden;
      width: 100%;
      height: 100vh;

      video,
      iframe {
        position: absolute;
        top: 0;
        left: 0;

        z-index: 0;
        object-fit: cover;
        overflow: hidden;
        min-width: 100%;
        min-height: 100%;

      }

    }
  }

  video {
    cursor: pointer;
  }

  .video-container {
    position: relative;

    display: grid;

    video {
      width: 100%;
      max-width: 100%;
    }

    .posterExt {
      position: absolute;
      z-index: 3;
    }

    .position-container {
      position: absolute;
      z-index: 4;
      align-self: center;
      justify-self: center;
      text-align: center;

      &.visible {
        .basicHover();
      }
    }

    h1,
    h2 {
      cursor: pointer;
    }

    h2 {
      .font-normal;
      text-align: center;
      text-transform: uppercase;
    }

    .posterExt,
    .position-container {
      opacity: 0;

      cursor: pointer;
      pointer-events: none;

      &.visible {
        opacity: 1;
        pointer-events: all;
      }

      .trans(opacity);
    }

    .posterExt::v-deep {

      align-self: auto;
      justify-self: auto;
      width: 100%;
      height: 100%;

      cursor: pointer;

      img {

        object-fit: cover;

        width: 100%;
        height: 100%;
      }
    }

  }
}</style>

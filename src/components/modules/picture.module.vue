<template>
  <section :id="id" ref="el" :class="[variant, view, { fullscreenOverlay, fullscreenOverlayEnabled }]"
    class="lila-picture-module lila-module">
    <lila-picture-partial v-bind="picture" />

    <div v-if="showText" class="position-container">
      <lila-textblock-partial v-bind="textblock" />
    </div>

    <section v-if="fullscreenOverlayEnabled" class="controls-container">
      <lila-button-partial colorScheme="colorScheme2" :icon="true" @click="toggleFullscreenOverlay">
        <lila-icons-partial colorScheme="colorScheme1" :type="fullscreenOverlay ? 'zoom-out' : 'zoom-in'" />
      </lila-button-partial>
    </section>

  </section>
</template>
<script setup lang="ts">
import checkInview from '../../mixins/checkin';
import type Picture from '@interfaces/picture.interface';
import type Textblock from '@interfaces/textblock.interface';
import { computed, onMounted, ref } from 'vue';

defineOptions({ inheritAttrs: false });

const props = defineProps<{
  picture: Picture;

  textblock: Textblock;
  id?:string;
  view?: string;
  variant: string[];
}>();
let fullscreenOverlay: boolean = false;
let el = ref(null);

onMounted((): void => {

  checkInview(el);

});

let emit = defineEmits<{
    (e: string, i:boolean): void
}>();
const showText = computed((): boolean => {

  if (!props.textblock) return false;

  return Object.keys(props.textblock).some((single) => props.textblock[single].length);

});
const fullscreenOverlayEnabled = computed(() => {

  return props.variant.includes('fullscreenOverlayEnabled');

});


function toggleFullscreenOverlay() {

  fullscreenOverlay = !fullscreenOverlay;
  emit('fullscreen', fullscreenOverlay);

}


</script>
<style lang="less" scoped>


.lila-picture-module {
  .module;
  max-width: @moduleWidth_L;
  .modulePadding('none');

  picture {

    img {
      display: block;
      min-width: 100%;
      max-width: 100%;
    }

  }

  &.small {
    max-width: @moduleWidth_S;
  }

  &.middle {
    max-width: @moduleWidth_M;
  }

  .controls-container {

    position: absolute;
    display: grid;
    .multi(margin, 4);
    align-self: start;
    justify-self: end;

  }

  .position-container {

    width: 100%;
    background-color: rgba(255, 255, 255, .9);

    .lila-textblock::v-deep {
      .multi(padding, 4, 8);

      h3 {
        color: @textColor;
      }

    }

  }

  &.fullscreen {
    width: 100%;
    max-width: 100%;

    .position-container {

      position: absolute;
      align-self: end;

    }

  }

  &.fullscreenOverlay.fullscreenOverlayEnabled {

    .multi(padding, 8);

    .index(9);

    position: fixed;
    top: 0;
    left: 0;

    display: grid;
    overflow: hidden;
    width: 100vw;
    max-width: 100vw;
    height: 100vh;
    max-height: 100vh;

    background-color: @white;
    justify-content: center;
    align-content: center;

    &:first-child {
      margin: 0;
    }

    .lila-figure::v-deep {
      overflow: hidden;

      picture {
        object-fit: contain;
        width: 100%;
        height: 100%;
        overflow: hidden;

        .multi(padding, 2);

        img {
          align-self: center;
          justify-self: center;
          box-shadow: 0 0 7px @grey;
          border: solid 1px @grey;
        }

      }

    }

    .position-container {

      position: relative;

      .lila-textblock::v-deep {
        .multi(padding, 4);
        text-align: center;
      }

    }
  }

  &.variant1 {

    position: relative;

    .position-container {

      @media @tablet,
      @desktop {

        position: absolute;
        top: 0;
        right: 0;
        max-width: 50%;
        height: 100%;
        background-color: rgba(255, 255, 255, .9);

      }

      @media @desktop {
        max-width: 30%;
      }

    }

  }

  &.textPictureVertical,
  &.pictureTextVertical {

    gap: 60px;
    text-align: center;

    .position-container {
      justify-self: center;
      max-width: @desktopWidthExt;
      background: transparent;
    }

    .lila-textblock::v-deep {
      .multi(padding, 0, 8);
    }

  }

  &.textPictureVertical {

    grid-template-rows: min-content 1fr;

    .position-container {
      grid-row-start: 1;
    }

    figure {
      grid-row-start: 2;
    }

  }

  &.pictureTextVertical {

    grid-template-rows: 1fr min-content;

  }

}
</style>

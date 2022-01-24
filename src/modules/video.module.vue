<template>
  <section @click="trigger" @keypress="trigger"
  :class="[variant, view, {started: started, controls: controls}]" class="module video-module">

    <section class="video-container">

      <video-partial :trigger="clickEvent" :js="js" v-bind="video" @playing="toggle" @ended="ended" />

      <section class="position-container" :class="{visible: !playing}">
        <textblock-partial v-if="textblock" v-bind="textblock" />
      </section>

      <picture-partial class="posterExt" v-if="hasPoster" :class="{visible: !playing}" v-bind="poster" />

    </section>

  </section>
</template>
<script lang="ts">
import Picture from '@interfaces/picture.interface';
import Textblock from '@interfaces/textblock.interface';
import Video from '@interfaces/video.interface';
import { ExtComponent, Component, Prop } from '@libs/lila-component';

@Component
export default class VideoModule extends ExtComponent {

  @Prop(Object) poster: Picture;

  @Prop(Object) textblock: Textblock;

  @Prop(Object) video: Video;

  @Prop(Boolean) js: boolean;

  clickEvent: boolean = false;

  playing: boolean = false;

  started: boolean = false;

  mounted(): void {

    this.checkInview();

  }

  trigger(): void {

    this.clickEvent = !this.clickEvent;

  }

  toggle(event: boolean): void {

    this.started = true;
    this.playing = event;

  }

  ended(): void {

    this.started = false;

  }

  get hasPoster() {

    return !!this.poster?.src;

  }

  get controls(): boolean {

    return this.video?.attributes?.includes('controls');

  }

}

</script>
<style lang="less" scoped>
@import (reference) "@{projectPath}/source/less/shared.less";

.module.video-module {
  .module;
    max-width: @desktopWidthExt;
    margin: auto;

    .modulePadding('none');

    &.bright {
        .video-container {
            h1, h2 {
                color: @white;
            }
        }
    }

    &.controls {
        &.started {
            .posterExt, .position-container {
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

    &.middle {
      max-width: @moduleWidth_M;
    }

    &.fullscreen {
        height: 100vh;
        width: 100%;
        max-width: 100%;

        padding: 0;

        .video-container {
            height: 100vh;
            width: 100%;

            position: relative;
            overflow: hidden;

            grid-area: unset;

            video {

              z-index: 0;
              position: absolute;
              top: 0;
              left: 0;
              min-width: 100%;
              min-height: 100%;
              overflow: hidden;
              object-fit: cover;

            }

        }
    }

    video {
        cursor: pointer;
    }

    .video-container {

        display: grid;
        position: relative;

        video {
            max-width: 100%;
            width: 100%;
        }

        .posterExt {
            z-index: 3;
            position: absolute;
        }

        .position-container {
            z-index: 4;
            align-self: center;
            justify-self: center;
            position: absolute;
            text-align: center;

            &.visible {
                .basicHover();
            }
        }

        h1, h2 {
            cursor: pointer;
        }

        h2 {
            .font-normal;
            text-transform: uppercase;
            text-align: center;
        }

        .posterExt, .position-container {
            opacity: 0;
            pointer-events: none;

            cursor: pointer;

            &.visible {
                pointer-events: all;
                opacity: 1;
            }

            .trans(opacity);
        }

        .posterExt::v-deep {

            cursor: pointer;
            width: 100%;
            height: 100%;

            align-self:auto;
            justify-self: auto;

            img {

                width: 100%;
                height: 100%;

                object-fit: cover;
            }
        }

    }
}
</style>
